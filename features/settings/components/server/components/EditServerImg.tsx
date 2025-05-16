import { H3, H4 } from "@/components/typography";
import {
  UpdateServerDocument,
  UpdateServerInput,
  UpdateServerMutation,
  UpdateServerMutationVariables,
  Server,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/errors";
import { queryKeys } from "@/helpers/queryKeys";
import { useCloudStorage } from "@/hooks/useCloudStorage";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const EditServerImg = ({ server }: { server?: Server | null }) => {
  const [file, setFile] = useState<File | null>(null);

  const { isLoading, error, uploadedImage } = useCloudStorage({
    file,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const updateServerMutation = useMutation({
    mutationFn: async (data: UpdateServerInput) => {
      const modifiedData: UpdateServerMutationVariables = {
        server: data,
      };
      const res = await requestWithAuth<UpdateServerMutation>(
        UpdateServerDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Server icon updated!");
      queryClient.refetchQueries({
        queryKey: [queryKeys.getServerById, server?.id],
      });
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      toast(err.response.errors[0].message);
    },
  });

  useEffect(() => {
    if (uploadedImage && server?.id) {
      updateServerMutation.mutateAsync({
        id: server.id,
        serverImg: uploadedImage,
      });
    }
  }, [uploadedImage, server?.id]);

  const renderIcon = () => {
    if (server?.serverImg) {
      return (
        <Image
          alt="server icon"
          width={200}
          height={200}
          src={server.serverImg}
        />
      );
    } else {
      if (server?.name) return <H4>{server?.name.slice(0, 2)}</H4>;
    }
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);
        }}
      />
      <div className="flex flex-row gap-md items-center">
        <div
          onClick={handleClick}
          className="w-40 h-40 rounded-full overflow-hidden bg-sidebar-accent flex items-center justify-center cursor-pointer"
        >
          {updateServerMutation.isPending ? (
            <LoaderIcon className="w-10 h-10 animate-spin" />
          ) : (
            renderIcon()
          )}
        </div>
        <H3>{server?.name}</H3>
      </div>
    </div>
  );
};

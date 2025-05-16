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

export const EditServerBanner = ({ server }: { server?: Server | null }) => {
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
      toast("Server banner updated!");
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
        banner: uploadedImage,
      });
    }
  }, [uploadedImage, server?.id]);

  const renderBanner = () => {
    if (server?.banner) {
      return (
        <Image
          alt="server icon"
          fill
          style={{ objectFit: "cover" }}
          src={server.banner}
        />
      );
    } else {
      if (server?.name) return <H4>No banner Click to add one</H4>;
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
      <div className="flex flex-col gap-md items-center relative">
        <div
          onClick={handleClick}
          className="w-full h-40 rounded-md overflow-hidden bg-sidebar-accent flex items-center justify-center cursor-pointer"
        >
          {updateServerMutation.isPending ? (
            <LoaderIcon className="w-10 h-10 animate-spin" />
          ) : (
            renderBanner()
          )}
        </div>
      </div>
    </div>
  );
};

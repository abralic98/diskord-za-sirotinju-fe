import { useEffect, useRef, useState } from "react";
import { useCloudStorage } from "@/hooks/useCloudStorage";
import { useMutation } from "@tanstack/react-query";
import {
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { toast } from "sonner";
import { useAuthenticator } from "@/hooks/useAuthenticator";
import { Button } from "@/components/ui/button";
import { handleGraphqlError } from "@/helpers/handleGQLError";

export const EditAvatar = () => {
  const [file, setFile] = useState<File | null>(null);
  const { refreshUserInfo } = useAuthenticator();
  const { isLoading, error, uploadedImage } = useCloudStorage({
    file,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const modifiedData: UpdateUserMutationVariables = {
        user: data,
      };
      const res = await requestWithAuth<UpdateUserMutation>(
        UpdateUserDocument,
        modifiedData,
      );
      return res;
    },
    onSuccess: () => {
      toast("Avatar updated!");
      refreshUserInfo();
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  useEffect(() => {
    if (uploadedImage) {
      updateUserMutation.mutateAsync({ avatar: uploadedImage });
    }
  }, [uploadedImage]);

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
      <Button type="button" onClick={handleButtonClick}>
        Change Avatar
      </Button>
      {isLoading && <p>Uploading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

import { useEffect, useState } from "react";
import { ID } from "appwrite";
import { storageClient } from "@/lib/appwrite/client";

interface UseCloudStorageProps {
  file: File | null;
}

interface UploadResult {
  isLoading: boolean;
  error: Error | null;
  uploadedImage: string | undefined;
}

export const useCloudStorage = ({
  file,
}: UseCloudStorageProps): UploadResult => {
  const bucketId = "6822fe5600188749a318";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>();

  const saveToBackend = () => {
    //
  };

  useEffect(() => {
    const upload = async () => {
      if (!file) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await storageClient.createFile(
          bucketId,
          ID.unique(),
          file,
        );
        if (response.$id) {
          const result = storageClient.getFileDownload(bucketId, response.$id);
          saveToBackend();
          setUploadedImage(result);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    upload();
  }, [file, bucketId]);

  return { isLoading, error, uploadedImage };
};

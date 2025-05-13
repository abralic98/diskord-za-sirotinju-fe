import { useState } from "react";
import { useCloudStorage } from "@/hooks/useCloudStorage";

export const UploadUserAvatar = () => {
  const [file, setFile] = useState<File | null>(null);
  const { isLoading, error } = useCloudStorage({
    file,
  });

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);
        }}
      />
      {isLoading && <p>Uploading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

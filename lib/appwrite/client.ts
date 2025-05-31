import { Client, Storage } from "appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL ?? "error")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "error");

const storageClient = new Storage(appwriteClient);
export { storageClient, appwriteClient };

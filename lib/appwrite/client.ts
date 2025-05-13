import { Client, Storage } from "appwrite";

const appwriteClient = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6822fd28002cf328e22d");

const storageClient = new Storage(appwriteClient);
export { storageClient, appwriteClient };


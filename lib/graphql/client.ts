import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:8080/graphql";

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Create the client with dynamic headers
export const client = new GraphQLClient(endpoint, {
  headers: () => ({
    Authorization: `Bearer ${getToken() || ""}`,
  }),
});

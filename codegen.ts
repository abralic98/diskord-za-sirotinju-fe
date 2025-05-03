import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql", // Your GraphQL schema URL
  documents: "./graphql/**/*.graphql", // Path to your GraphQL queries and mutations
  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript", // Generate TypeScript types
        "typescript-operations", // Generate types for GraphQL queries/mutations
        "typescript-react-query", // Generate React Query hooks
      ],
    },
  },
};

export default config;

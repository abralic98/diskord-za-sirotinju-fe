import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql", 
  documents: "./graphql/**/*.graphql", 
  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript", 
        "typescript-operations", 
        "typescript-react-query",
      ],
    },
  },
};

export default config;


export interface GraphqlCatchError<T = any> {
  response: GraphQLErrorResponse<T>;
}

export interface GraphQLErrorLocation {
  line: number;
  column: number;
}

export interface GraphQLErrorExtensions {
  classification: string;
}

export interface GraphQLErrorItem {
  message: string;
  locations?: GraphQLErrorLocation[];
  path?: (string | number)[];
  extensions?: GraphQLErrorExtensions;
}

export interface GraphQLErrorResponse<T = any> {
  errors: GraphQLErrorItem[];
  data?: T | null;
}

//@ts-nocheck
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMessageInput = {
  roomId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  type: MessageType;
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  serverId: Scalars['ID']['input'];
  type: RoomType;
};

export type CreateServerInput = {
  name: Scalars['String']['input'];
  publicServer: Scalars['Boolean']['input'];
};

export type CreateSessionInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  author?: Maybe<User>;
  id?: Maybe<Scalars['ID']['output']>;
  imgPath?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MessageType>;
};

export enum MessageType {
  Attachment = 'ATTACHMENT',
  Text = 'TEXT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createMessage?: Maybe<Message>;
  createRoom?: Maybe<Room>;
  createServer?: Maybe<Server>;
  createSession?: Maybe<UserWithToken>;
  createUser?: Maybe<User>;
  deactivateUser?: Maybe<User>;
};


export type MutationCreateMessageArgs = {
  message?: InputMaybe<CreateMessageInput>;
};


export type MutationCreateRoomArgs = {
  room?: InputMaybe<CreateRoomInput>;
};


export type MutationCreateServerArgs = {
  server?: InputMaybe<CreateServerInput>;
};


export type MutationCreateSessionArgs = {
  credentials?: InputMaybe<CreateSessionInput>;
};


export type MutationCreateUserArgs = {
  user?: InputMaybe<CreateUserInput>;
};


export type MutationDeactivateUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllServers?: Maybe<Array<Maybe<Server>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getMessagesByRoomId?: Maybe<Array<Maybe<Message>>>;
  getRoomById?: Maybe<Room>;
  getRoomsByServerId?: Maybe<Array<Maybe<Room>>>;
  getUserById?: Maybe<User>;
  getUsersByServerId?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetMessagesByRoomIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRoomByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRoomsByServerIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUsersByServerIdArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  createdBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  maxLimit?: Maybe<Scalars['Int']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  name: Scalars['String']['output'];
  server?: Maybe<Server>;
  type?: Maybe<RoomType>;
};

export enum RoomType {
  Text = 'TEXT',
  Voice = 'VOICE'
}

/**
 * #####################################
 * ### SERVERS & ROOMS #################
 */
export type Server = {
  __typename?: 'Server';
  createdBy?: Maybe<User>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publicServer?: Maybe<Scalars['Boolean']['output']>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

/**  USERS ############################## */
export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CreateSessionMutationVariables = Exact<{
  credentials: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession?: { __typename?: 'UserWithToken', token?: string | null, user?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: string | null } | null };

export type GetAllServersSidebarQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllServersSidebarQuery = { __typename?: 'Query', getAllServers?: Array<{ __typename?: 'Server', id?: string | null, name?: string | null } | null> | null };

export type CreateServerMutationVariables = Exact<{
  server?: InputMaybe<CreateServerInput>;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer?: { __typename?: 'Server', id?: string | null } | null };

export type GetRoomsByServerIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomsByServerIdQuery = { __typename?: 'Query', getRoomsByServerId?: Array<{ __typename?: 'Room', id: string, name: string, maxLimit?: number | null, type?: RoomType | null, messages?: Array<{ __typename?: 'Message', text?: string | null, imgPath?: string | null, author?: { __typename?: 'User', username?: string | null, id?: string | null } | null } | null> | null, createdBy?: { __typename?: 'User', id?: string | null, username?: string | null } | null } | null> | null };

export type CreateRoomMutationVariables = Exact<{
  room?: InputMaybe<CreateRoomInput>;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'Room', id: string } | null };

export type GetMessagesByRoomIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMessagesByRoomIdQuery = { __typename?: 'Query', getMessagesByRoomId?: Array<{ __typename?: 'Message', id?: string | null, text?: string | null, imgPath?: string | null, type?: MessageType | null, author?: { __typename?: 'User', id?: string | null, username?: string | null } | null } | null> | null };

export type GetRoomByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomByIdQuery = { __typename?: 'Query', getRoomById?: { __typename?: 'Room', id: string, name: string, type?: RoomType | null } | null };

export type GetUsersByServerIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUsersByServerIdQuery = { __typename?: 'Query', getUsersByServerId?: Array<{ __typename?: 'User', id?: string | null, username?: string | null } | null> | null };

export type CreateMessageMutationVariables = Exact<{
  message?: InputMaybe<CreateMessageInput>;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id?: string | null } | null };



export const CreateSessionDocument = `
    mutation CreateSession($credentials: CreateSessionInput!) {
  createSession(credentials: $credentials) {
    token
    user {
      id
      username
      email
    }
  }
}
    `;

export const useCreateSessionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>(
      ['CreateSession'],
      (variables?: CreateSessionMutationVariables) => fetcher<CreateSessionMutation, CreateSessionMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateSessionDocument, variables)(),
      options
    )};

export const CreateUserDocument = `
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
  }
}
    `;

export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserDocument, variables)(),
      options
    )};

export const GetAllServersSidebarDocument = `
    query getAllServersSidebar {
  getAllServers {
    id
    name
  }
}
    `;

export const useGetAllServersSidebarQuery = <
      TData = GetAllServersSidebarQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllServersSidebarQueryVariables,
      options?: UseQueryOptions<GetAllServersSidebarQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllServersSidebarQuery, TError, TData>(
      variables === undefined ? ['getAllServersSidebar'] : ['getAllServersSidebar', variables],
      fetcher<GetAllServersSidebarQuery, GetAllServersSidebarQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllServersSidebarDocument, variables),
      options
    )};

export const CreateServerDocument = `
    mutation createServer($server: CreateServerInput) {
  createServer(server: $server) {
    id
  }
}
    `;

export const useCreateServerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateServerMutation, TError, CreateServerMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateServerMutation, TError, CreateServerMutationVariables, TContext>(
      ['createServer'],
      (variables?: CreateServerMutationVariables) => fetcher<CreateServerMutation, CreateServerMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateServerDocument, variables)(),
      options
    )};

export const GetRoomsByServerIdDocument = `
    query getRoomsByServerId($id: ID!) {
  getRoomsByServerId(id: $id) {
    id
    name
    maxLimit
    type
    messages {
      author {
        username
        id
      }
      text
      imgPath
    }
    createdBy {
      id
      username
    }
  }
}
    `;

export const useGetRoomsByServerIdQuery = <
      TData = GetRoomsByServerIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetRoomsByServerIdQueryVariables,
      options?: UseQueryOptions<GetRoomsByServerIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetRoomsByServerIdQuery, TError, TData>(
      ['getRoomsByServerId', variables],
      fetcher<GetRoomsByServerIdQuery, GetRoomsByServerIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetRoomsByServerIdDocument, variables),
      options
    )};

export const CreateRoomDocument = `
    mutation createRoom($room: CreateRoomInput) {
  createRoom(room: $room) {
    id
  }
}
    `;

export const useCreateRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>(
      ['createRoom'],
      (variables?: CreateRoomMutationVariables) => fetcher<CreateRoomMutation, CreateRoomMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateRoomDocument, variables)(),
      options
    )};

export const GetMessagesByRoomIdDocument = `
    query getMessagesByRoomId($id: ID!) {
  getMessagesByRoomId(id: $id) {
    id
    author {
      id
      username
    }
    text
    imgPath
    type
  }
}
    `;

export const useGetMessagesByRoomIdQuery = <
      TData = GetMessagesByRoomIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetMessagesByRoomIdQueryVariables,
      options?: UseQueryOptions<GetMessagesByRoomIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetMessagesByRoomIdQuery, TError, TData>(
      ['getMessagesByRoomId', variables],
      fetcher<GetMessagesByRoomIdQuery, GetMessagesByRoomIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMessagesByRoomIdDocument, variables),
      options
    )};

export const GetRoomByIdDocument = `
    query getRoomById($id: ID!) {
  getRoomById(id: $id) {
    id
    name
    type
  }
}
    `;

export const useGetRoomByIdQuery = <
      TData = GetRoomByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetRoomByIdQueryVariables,
      options?: UseQueryOptions<GetRoomByIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetRoomByIdQuery, TError, TData>(
      ['getRoomById', variables],
      fetcher<GetRoomByIdQuery, GetRoomByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetRoomByIdDocument, variables),
      options
    )};

export const GetUsersByServerIdDocument = `
    query getUsersByServerId($id: ID!) {
  getUsersByServerId(id: $id) {
    id
    username
  }
}
    `;

export const useGetUsersByServerIdQuery = <
      TData = GetUsersByServerIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUsersByServerIdQueryVariables,
      options?: UseQueryOptions<GetUsersByServerIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetUsersByServerIdQuery, TError, TData>(
      ['getUsersByServerId', variables],
      fetcher<GetUsersByServerIdQuery, GetUsersByServerIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersByServerIdDocument, variables),
      options
    )};

export const CreateMessageDocument = `
    mutation createMessage($message: CreateMessageInput) {
  createMessage(message: $message) {
    id
  }
}
    `;

export const useCreateMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateMessageMutation, TError, CreateMessageMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateMessageMutation, TError, CreateMessageMutationVariables, TContext>(
      ['createMessage'],
      (variables?: CreateMessageMutationVariables) => fetcher<CreateMessageMutation, CreateMessageMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateMessageDocument, variables)(),
      options
    )};

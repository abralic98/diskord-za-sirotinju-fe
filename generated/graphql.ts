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
  Long: { input: any; output: any; }
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

export type JoinServerInput = {
  id: Scalars['ID']['input'];
  invitationLink?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  author?: Maybe<User>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateUpdated?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imgPath?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MessageType>;
};

export type MessagePage = {
  __typename?: 'MessagePage';
  content: Array<Message>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
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
  joinServer?: Maybe<Server>;
  updateServer?: Maybe<Server>;
  updateUser?: Maybe<User>;
  updateUserPassword?: Maybe<User>;
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


export type MutationJoinServerArgs = {
  input?: InputMaybe<JoinServerInput>;
};


export type MutationUpdateServerArgs = {
  server?: InputMaybe<UpdateServerInput>;
};


export type MutationUpdateUserArgs = {
  user?: InputMaybe<UpdateUserInput>;
};


export type MutationUpdateUserPasswordArgs = {
  credentials?: InputMaybe<UpdateUserPasswordInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllServers: ServerPage;
  getAllUserServers?: Maybe<Array<Maybe<Server>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getMessagesByRoomId: MessagePage;
  getRoomById?: Maybe<Room>;
  getRoomsByServerId?: Maybe<Rooms>;
  getServerById?: Maybe<Server>;
  getUserById?: Maybe<User>;
  meQuery?: Maybe<User>;
};


export type QueryGetAllServersArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryGetMessagesByRoomIdArgs = {
  id: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryGetRoomByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRoomsByServerIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetServerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
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

export type Rooms = {
  __typename?: 'Rooms';
  text?: Maybe<Array<Maybe<Room>>>;
  voice?: Maybe<Array<Maybe<Room>>>;
};

/**
 * #####################################
 * ### SERVERS & ROOMS #################
 */
export type Server = {
  __typename?: 'Server';
  banner?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  joinedUsers?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']['output']>;
  publicServer?: Maybe<Scalars['Boolean']['output']>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  serverImg?: Maybe<Scalars['String']['output']>;
};

export type ServerPage = {
  __typename?: 'ServerPage';
  content: Array<Server>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UpdateServerInput = {
  banner?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  publicServer?: InputMaybe<Scalars['Boolean']['input']>;
  serverImg?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['Long']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  confirmNewPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

/**  USERS ############################## */
export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  phoneNumber?: Maybe<Scalars['Long']['output']>;
  userPresence?: Maybe<UserPresenceType>;
  username?: Maybe<Scalars['String']['output']>;
};

export enum UserPresenceType {
  Away = 'AWAY',
  Busy = 'BUSY',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CreateSessionMutationVariables = Exact<{
  credentials: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession?: { __typename?: 'UserWithToken', token?: string | null, user?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, avatar?: string | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  user?: InputMaybe<UpdateUserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  credentials?: InputMaybe<UpdateUserPasswordInput>;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword?: { __typename?: 'User', id?: string | null } | null };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', meQuery?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, phoneNumber?: any | null, avatar?: string | null } | null };

export type GetAllUserServersSidebarQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserServersSidebarQuery = { __typename?: 'Query', getAllUserServers?: Array<{ __typename?: 'Server', id?: string | null, name?: string | null } | null> | null };

export type CreateServerMutationVariables = Exact<{
  server?: InputMaybe<CreateServerInput>;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer?: { __typename?: 'Server', id?: string | null } | null };

export type UpdateServerMutationVariables = Exact<{
  server?: InputMaybe<UpdateServerInput>;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer?: { __typename?: 'Server', id?: string | null } | null };

export type GetRoomsByServerIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomsByServerIdQuery = { __typename?: 'Query', getRoomsByServerId?: { __typename?: 'Rooms', voice?: Array<{ __typename?: 'Room', id: string, name: string, maxLimit?: number | null, type?: RoomType | null, createdBy?: { __typename?: 'User', id?: string | null, username?: string | null } | null } | null> | null, text?: Array<{ __typename?: 'Room', id: string, name: string, maxLimit?: number | null, type?: RoomType | null, createdBy?: { __typename?: 'User', id?: string | null, username?: string | null } | null } | null> | null } | null };

export type CreateRoomMutationVariables = Exact<{
  room?: InputMaybe<CreateRoomInput>;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'Room', id: string } | null };

export type GetMessagesByRoomIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetMessagesByRoomIdQuery = { __typename?: 'Query', getMessagesByRoomId: { __typename?: 'MessagePage', size: number, number: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'Message', id?: string | null, text?: string | null, imgPath?: string | null, type?: MessageType | null, dateCreated?: string | null, dateUpdated?: string | null, author?: { __typename?: 'User', id?: string | null, username?: string | null, avatar?: string | null } | null }> } };

export type GetRoomByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomByIdQuery = { __typename?: 'Query', getRoomById?: { __typename?: 'Room', id: string, name: string, type?: RoomType | null } | null };

export type GetServerByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServerByIdQuery = { __typename?: 'Query', getServerById?: { __typename?: 'Server', id?: string | null, name?: string | null, description?: string | null, serverImg?: string | null, banner?: string | null, createdBy?: { __typename?: 'User', id?: string | null } | null, joinedUsers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, avatar?: string | null } | null> | null } | null };

export type CreateMessageMutationVariables = Exact<{
  message?: InputMaybe<CreateMessageInput>;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id?: string | null } | null };

export type GetAllServersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetAllServersQuery = { __typename?: 'Query', getAllServers: { __typename?: 'ServerPage', size: number, number: number, totalElements: number, totalPages: number, content: Array<{ __typename?: 'Server', id?: string | null, name?: string | null, description?: string | null, banner?: string | null, serverImg?: string | null, joinedUsers?: Array<{ __typename?: 'User', id?: string | null, userPresence?: UserPresenceType | null } | null> | null }> } };

export type JoinServerMutationVariables = Exact<{
  input?: InputMaybe<JoinServerInput>;
}>;


export type JoinServerMutation = { __typename?: 'Mutation', joinServer?: { __typename?: 'Server', id?: string | null } | null };



export const CreateSessionDocument = `
    mutation CreateSession($credentials: CreateSessionInput!) {
  createSession(credentials: $credentials) {
    token
    user {
      id
      username
      email
      avatar
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

export const UpdateUserDocument = `
    mutation UpdateUser($user: UpdateUserInput) {
  updateUser(user: $user) {
    id
  }
}
    `;

export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserDocument, variables)(),
      options
    )};

export const UpdateUserPasswordDocument = `
    mutation UpdateUserPassword($credentials: UpdateUserPasswordInput) {
  updateUserPassword(credentials: $credentials) {
    id
  }
}
    `;

export const useUpdateUserPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserPasswordMutation, TError, UpdateUserPasswordMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUserPasswordMutation, TError, UpdateUserPasswordMutationVariables, TContext>(
      ['UpdateUserPassword'],
      (variables?: UpdateUserPasswordMutationVariables) => fetcher<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserPasswordDocument, variables)(),
      options
    )};

export const MeQueryDocument = `
    query meQuery {
  meQuery {
    id
    username
    email
    phoneNumber
    avatar
  }
}
    `;

export const useMeQueryQuery = <
      TData = MeQueryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: MeQueryQueryVariables,
      options?: UseQueryOptions<MeQueryQuery, TError, TData>
    ) => {
    
    return useQuery<MeQueryQuery, TError, TData>(
      variables === undefined ? ['meQuery'] : ['meQuery', variables],
      fetcher<MeQueryQuery, MeQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MeQueryDocument, variables),
      options
    )};

export const GetAllUserServersSidebarDocument = `
    query getAllUserServersSidebar {
  getAllUserServers {
    id
    name
  }
}
    `;

export const useGetAllUserServersSidebarQuery = <
      TData = GetAllUserServersSidebarQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllUserServersSidebarQueryVariables,
      options?: UseQueryOptions<GetAllUserServersSidebarQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllUserServersSidebarQuery, TError, TData>(
      variables === undefined ? ['getAllUserServersSidebar'] : ['getAllUserServersSidebar', variables],
      fetcher<GetAllUserServersSidebarQuery, GetAllUserServersSidebarQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllUserServersSidebarDocument, variables),
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

export const UpdateServerDocument = `
    mutation updateServer($server: UpdateServerInput) {
  updateServer(server: $server) {
    id
  }
}
    `;

export const useUpdateServerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateServerMutation, TError, UpdateServerMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateServerMutation, TError, UpdateServerMutationVariables, TContext>(
      ['updateServer'],
      (variables?: UpdateServerMutationVariables) => fetcher<UpdateServerMutation, UpdateServerMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateServerDocument, variables)(),
      options
    )};

export const GetRoomsByServerIdDocument = `
    query getRoomsByServerId($id: ID!) {
  getRoomsByServerId(id: $id) {
    voice {
      id
      name
      maxLimit
      type
      createdBy {
        id
        username
      }
    }
    text {
      id
      name
      maxLimit
      type
      createdBy {
        id
        username
      }
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
    query getMessagesByRoomId($id: ID!, $page: Int!, $size: Int!) {
  getMessagesByRoomId(id: $id, page: $page, size: $size) {
    content {
      id
      author {
        id
        username
        avatar
      }
      text
      imgPath
      type
      dateCreated
      dateUpdated
    }
    size
    number
    totalElements
    totalPages
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

export const GetServerByIdDocument = `
    query getServerById($id: ID!) {
  getServerById(id: $id) {
    id
    name
    description
    serverImg
    banner
    createdBy {
      id
    }
    joinedUsers {
      id
      username
      avatar
    }
  }
}
    `;

export const useGetServerByIdQuery = <
      TData = GetServerByIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetServerByIdQueryVariables,
      options?: UseQueryOptions<GetServerByIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetServerByIdQuery, TError, TData>(
      ['getServerById', variables],
      fetcher<GetServerByIdQuery, GetServerByIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetServerByIdDocument, variables),
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

export const GetAllServersDocument = `
    query getAllServers($page: Int!, $size: Int!) {
  getAllServers(page: $page, size: $size) {
    content {
      id
      name
      description
      banner
      serverImg
      joinedUsers {
        id
        userPresence
      }
    }
    size
    number
    totalElements
    totalPages
  }
}
    `;

export const useGetAllServersQuery = <
      TData = GetAllServersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAllServersQueryVariables,
      options?: UseQueryOptions<GetAllServersQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllServersQuery, TError, TData>(
      ['getAllServers', variables],
      fetcher<GetAllServersQuery, GetAllServersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllServersDocument, variables),
      options
    )};

export const JoinServerDocument = `
    mutation joinServer($input: JoinServerInput) {
  joinServer(input: $input) {
    id
  }
}
    `;

export const useJoinServerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<JoinServerMutation, TError, JoinServerMutationVariables, TContext>
    ) => {
    
    return useMutation<JoinServerMutation, TError, JoinServerMutationVariables, TContext>(
      ['joinServer'],
      (variables?: JoinServerMutationVariables) => fetcher<JoinServerMutation, JoinServerMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, JoinServerDocument, variables)(),
      options
    )};

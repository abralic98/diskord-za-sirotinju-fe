export type DynamicPages = {
  serverId?: string;
  roomId?: string;
};

export interface CustomPageProps {
  params: DynamicPages;
}

export interface SearchInput {
  search?: string
}

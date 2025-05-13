import React from 'react'
import { Server } from "@/generated/graphql";

interface Props {
  server: Server
}
export const SingleServer = ({ server }: Props) => {
  return (
    <div>
      {server.name}
    </div>
  )
}


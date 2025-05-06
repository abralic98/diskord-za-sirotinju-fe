import { Message } from '@/generated/graphql'
import React from 'react'

interface Props {
  message: Message
}
export const SingleMessage = ({ message }: Props) => {
  return (
    <div>{message.text}</div>
  )
}


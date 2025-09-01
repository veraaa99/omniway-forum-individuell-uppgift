import React from 'react'
import type { ForumThread } from '../types/forum'
import Thread from './Thread';


type ThreadListProps = {
  threads: ForumThread[];
}

export default function ThreadList({ threads }: ThreadListProps) {
  return (
    <div className='container mx-auto px-4 lg: max-w-6xl'>
      <h1 className='text-3xl text-center font-bold text-blue-950 my-4'>Forum</h1>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  )
}
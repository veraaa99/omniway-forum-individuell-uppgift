import React from 'react'
import Thread from './Thread';
import { useThread } from '../contexts/ThreadContext';


export default function ThreadList() {
  const { threads } = useThread();

  return (
    <div className='container mx-auto px-4 lg: max-w-6xl'>
      <h1 className='text-3xl text-center font-bold text-blue-950 my-4'>Forum</h1>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  )
}
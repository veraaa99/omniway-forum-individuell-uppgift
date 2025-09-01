import React from 'react'
import { FaUser } from 'react-icons/fa';

type ThreadProps = {
  thread: Thread | QNAThread;
};

export default function Thread({ thread }: ThreadProps) {
  return (
    <div className='p-4 rounded-lg mb-4 border-gray-300 bg-blue-950'>

      <div className='flex justify-between mb-4'>
        <div className='flex gap-2 items-center'>
          <div className='text-gray-200'><FaUser /></div>
          <p className='font-semibold text-gray-200'>{thread.creator.userName}</p>
        </div>
        <div>
          <p className='text-sm text-gray-200'>{thread.category}</p>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <h3 className='text-gray-200 text-xl font-semibold'>{thread.title}</h3>
        <p className='text-gray-200 text-sm'>{thread.creationDate}</p>
      </div>

      <p className='text-gray-200 my-3'>{thread.description}</p>

      {'isAnswered' in thread && (
        <p className='text-gray-200 italic mb-2'>{thread.isAnswered ? 'Answered' : 'No answeres yet'}</p>
      )}

      <button className='bg-orange-600 text-gray-100 rounded px-3 py-2 text-sm hover:bg-orange-500'
        onClick={() => console.log("Reply here")}>
        Reply
      </button>
    </div>
  );
}
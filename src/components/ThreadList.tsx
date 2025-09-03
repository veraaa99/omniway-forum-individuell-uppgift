import { useThread } from '../contexts/ThreadContext';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ThreadPreview from './ThreadPreview';
import { dummyComments } from '../data/comments';
import { useState } from 'react';
import Thread from './Thread';
import { FaArrowLeft } from 'react-icons/fa';
import Modal from 'react-modal'
import ThreadForm from './ThreadForm';


export default function ThreadList() {
  const { threads } = useThread();
  const [selectedThread, setselectedThread] = useState<Thread | QNAThread | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (selectedThread) {

    return (
      <div className='container mx-auto px-4 lg: max-w-6xl'>
        <button onClick={() => setselectedThread(null)} className='flex gap-2 items-center mb-3'>
          <FaArrowLeft />
          <p>Back to threads</p>
        </button>
        <Thread thread={selectedThread} />
      </div>

    )
  }

  return (
    <div className='container mx-auto px-4 lg:max-w-6xl'>
      <h1 className='text-3xl text-center font-bold text-blue-950 my-4'>Forum</h1>

      <div className='flex gap-2 items-center mb-4 text-2xl font-semibold cursor-pointer' onClick={() => setIsModalOpen(true)}>
        <IoIosAddCircleOutline /><p>Skapa ny tråd</p>
      </div>

      <Modal isOpen={isModalOpen} appElement={document.getElementById('root') as HTMLElement} onRequestClose={() => setIsModalOpen(false)}
        contentLabel='Skapa ny tråd'
        className='text-blue-950 rounded'
        overlayClassName='fixed inset-0 text-white flex justify-center items-center z-50'>

        <ThreadForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div className="space-y-4">
        {
          threads.map((thread) => (
            <ThreadPreview
              key={thread.id}
              thread={thread}
              onClick={() => setselectedThread(thread)}
            />
          ))
        }
      </div >
    </div >
  )
}
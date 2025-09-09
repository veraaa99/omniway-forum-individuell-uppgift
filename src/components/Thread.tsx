import { FaUser } from 'react-icons/fa';
import CommentForm from './CommentForm';
import { useEffect, useState } from 'react';
import Modal from 'react-modal'
import CommentsList from './CommentsList';
import { useThread } from '../contexts/ThreadContext';
import { useUser } from '../contexts/UserContext';
import EditThreadForm from './EditThreadForm';

type ThreadProps = {
  thread: Thread | QNAThread;
};

export default function Thread({ thread }: ThreadProps) {
  const { threads, comments, actions } = useThread();
  const { currentUser } = useUser();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false)
  const [commentsLocked, setCommentsLocked] = useState<boolean | undefined>(thread.commentsLocked)
  const [updatedThread, setUpdatedThread] = useState<ThreadCategoryType>(thread)

  const threadComments = comments?.filter(c => c.thread === thread.id);
  const answerCount = threadComments.length;

  const handleOpenForm = () => setShowCommentForm(true);
  const handleCloseForm = () => setShowCommentForm(false);

  const toggleCommentsLock = (threadId: number) => {
    actions.toggleCommentsLock(threadId);
    setCommentsLocked((prev) => !prev);
  }

  useEffect(() => {
    const _updatedThread = actions.getThreadByID(thread.id)
    if (_updatedThread) {
      setUpdatedThread(_updatedThread)
    }
  }, [threads])

  return (
    <div className='p-4 rounded-lg mb-4 border-gray-300 bg-blue-950'>

      <div className='flex justify-between mb-4'>
        <div className='flex gap-2 items-center'>
          <div className='text-gray-200'><FaUser /></div>
          <p className='font-semibold text-gray-200'>{updatedThread.creator.userName}</p>
        </div>
        <div>
          <p className='text-sm text-gray-200'>{updatedThread.category}</p>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <h3 className='text-gray-200 text-xl font-semibold'>{updatedThread.title}</h3>
        <p className='text-gray-200 text-sm'>{updatedThread.creationDate}</p>
      </div>

      <p className='text-gray-200 my-3'>{updatedThread.description}</p>
      { (currentUser?.userName == updatedThread.creator.userName || currentUser?.isModerator) &&
        <div className='mt-5 mb-5'>
            <button className='rounded-md py-1 px-2 border-white border-2 text-white text-sm hover:bg-blue-400'
              onClick={() => setIsModalOpen(true)}>
              Redigera tråd
            </button>
        </div>
      }

      { isModalOpen &&
        <Modal isOpen={isModalOpen} appElement={document.getElementById('root') as HTMLElement} onRequestClose={() => setIsModalOpen(false)}
                contentLabel='Redigera tråd'
                className='text-blue-950 rounded'
                overlayClassName='fixed inset-0 text-white flex justify-center items-center z-50'>
  
          <EditThreadForm thread={updatedThread} onClose={() => setIsModalOpen(false)}/>
        </Modal>
      }

      <p className='text-gray-200 italic text-sm mb-2'> {answerCount > 0 ? `${answerCount} answer${answerCount > 1 ? "s" : ""}` : "No answers yet"}</p>

      {!commentsLocked && (
        <button className='bg-orange-600 text-gray-100 rounded px-3 py-2 text-sm hover:bg-orange-500'
          onClick={handleOpenForm}>
          Svara
        </button>
      )}

      {showCommentForm && !commentsLocked && <CommentForm thread={updatedThread} onClose={handleCloseForm} />}

      {commentsLocked && <p className="text-orange-600 font-semibold mt-3">Kommentarer är låsta för denna tråd.</p>}

      { (currentUser?.userName == updatedThread.creator.userName || currentUser?.isModerator) &&
        <div className="mt-3">
          <button
            className="bg-orange-600 text-gray-100 rounded px-3 py-2 text-sm hover:bg-orange-500"
            onClick={() => toggleCommentsLock(updatedThread.id)}
          >
            {commentsLocked ? 'Låsa upp Kommentar' : 'Låsa Kommentar'}
          </button>
        </div>
      }

      <CommentsList threadId={updatedThread.id} threadCategory={updatedThread.category} />
    </div>
  );
}
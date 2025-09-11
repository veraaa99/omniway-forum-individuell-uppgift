import { FaUser } from "react-icons/fa"
import { useThread } from "../contexts/ThreadContext";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import CommentForm from "./CommentForm";

type CommentProps = {
  comment: ForumComment;
  threadCategory: ThreadCategory
  threadId: number
}

function Comment({ comment, threadCategory, threadId }: CommentProps) {
  const { actions, threads, comments } = useThread()
  const { currentUser } = useUser()

  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)
  const [showCommentReplyForm, setShowCommentReplyForm] = useState<boolean>(false)

  const _thread: ThreadCategoryType | undefined = threads.find(t => t.id == threadId)

  const isThreadAnswered: boolean = actions.isQNAAnswered(threadId)

  function isQNAThread(thread: ThreadCategoryType): thread is QNAThread {
    return thread.category == "QNA";
  }

  const QNAThreads = threads
  .filter((item): item is QNAThread => isQNAThread(item))
  
  const _QNAThread = QNAThreads.find(
    (t) => t.id === threadId
  );

  const answerComment: ForumComment | undefined = comments.find(c => c.id == comment.comment)

  const handleToggleIsAnswered = () => {
    if (!currentUser || (_QNAThread?.creator.id !== currentUser?.id && currentUser?.isModerator == false)) {
      setShowLoginPopup(true)
      return;
    } 

    if(_QNAThread && !isThreadAnswered) {
      const updatedThread: QNAThread = { 
        id: _QNAThread.id, 
        title: _QNAThread.title,
        category: "QNA",
        creationDate: _QNAThread.creationDate,
        description: _QNAThread.description,
        creator: _QNAThread.creator,
        commentsLocked: _QNAThread.commentsLocked, 
        isAnswered: true, 
        commentReplyId: comment.id
      }
      
      actions.updateThread(updatedThread)
    }
  }

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  if (!comment.creator) {
    return <p className="text-white">Kommentar saknar skapare</p>
  }

  return (
    <div className='p-4 mt-4 rounded-lg mb-4 border border-gray-300 bg-blue-950'>

      { answerComment && 
        <div className='p-4 mt-4 rounded-lg mb-4 border border-gray-300 bg-blue-500/30'>
          <div className='flex gap-2 items-center'>
            <div className='text-gray-200'><FaUser /></div>
            <p className='font-semibold text-gray-200'>{answerComment.creator.userName}</p>
          </div>
          <p className='text-gray-200 my-3'>{answerComment.content}</p>
        </div>
      }
      
      <div className='flex gap-2 items-center'>
        <div className='text-gray-200'><FaUser /></div>
        <p className='font-semibold text-gray-200'>{comment.creator.userName}</p>
      </div>
      <p className='text-gray-200 my-3'>{comment.content}</p>
      { _QNAThread && threadCategory === "QNA" &&
      <button onClick={handleToggleIsAnswered} disabled={isThreadAnswered} className={`bg-green-900 text-white text-sm rounded p-2 ${isThreadAnswered && _QNAThread.commentReplyId == comment.id ? 'bg-green-900' : 'bg-neutral-500'}`}>
        {isThreadAnswered && _QNAThread.commentReplyId == comment.id ? 'Svar' : 'Markera som svar'}
      </button>
      }
      { _thread && !_thread.commentsLocked && (
        <div className="mt-3">
          <button className='bg-orange-600 text-gray-100 rounded px-3 py-2 text-sm hover:bg-orange-500'
            onClick={() => setShowCommentReplyForm(true)}>
            Svara på kommentar
          </button>
        </div>
      )}

      {_thread && showCommentReplyForm && !_thread.commentsLocked && <CommentForm thread={_thread} onClose={() => setShowCommentReplyForm(false)} commentReplyId={comment.id} />}

      { showLoginPopup && (
          <div onClick={closeLoginPopup} className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center'>
            <div className="bg-white text-black p-6 rounded shadow-lg text-center max-w-sm w-full">
              {!currentUser 
              ? 
              <p className="mb-4 text-lg font-semibold">Du måste vara inloggad för att markera en kommentar som svar.</p>
              :
              <p className="mb-4 text-lg font-semibold">Endast skaparen av tråden eller moderatorer kan markera en kommentar som svar.</p>
              }
              <button
                onClick={closeLoginPopup}
                className="mt-2 px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700"
              >
                Stäng
              </button>
            </div>
          </div>
        )
      }

    </div>
  )
}
export default Comment
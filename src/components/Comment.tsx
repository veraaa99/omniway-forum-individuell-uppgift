import { FaUser } from "react-icons/fa"
import { useThread } from "../contexts/ThreadContext";

type CommentProps = {
  comment: ForumComment;
  threadCategory: ThreadCategory
  threadId: number
}

function Comment({ comment, threadCategory, threadId }: CommentProps) {

  const { actions, threads } = useThread()

  let isThreadAnswered = actions.isQNAAnswered(threadId)

  function isQNAThread(thread: ThreadCategoryType): thread is QNAThread {
    return thread.category == "QNA";
  }

  const QNAThreads = threads
  .filter((item): item is QNAThread => isQNAThread(item))
  
  const _thread = QNAThreads.find(
    (t) => t.id === threadId
  );   

  const handleToggleIsAnswered = () => {
    if(_thread && !isThreadAnswered) {

      const updatedThread: QNAThread = { 
        id: _thread.id, 
        title: _thread.title,
        category: "QNA",
        creationDate: _thread.creationDate,
        description: _thread.description,
        creator: _thread.creator,
        commentsLocked: _thread.commentsLocked, 
        isAnswered: true, 
        commentAnswerId: comment.id
      }
      
      const threadIndex = threads.findIndex(
        (t) => t.id === threadId
      );  
      actions.updateQNAThread(threadIndex, updatedThread)
    }
  }

  if (!comment.creator) {
    return <p className="text-white">Kommentar saknar skapare</p>
  }

  return (
    <div className='p-4 mt-4 rounded-lg mb-4 border border-gray-300 bg-blue-950'>
      <div className='flex gap-2 items-center'>
        <div className='text-gray-200'><FaUser /></div>
        <p className='font-semibold text-gray-200'>{comment.creator.userName}</p>
      </div>
      <p className='text-gray-200 my-3'>{comment.content}</p>
      { threadCategory === "QNA" && 
      <button onClick={handleToggleIsAnswered} disabled={isThreadAnswered} className={`bg-green-900 text-white text-sm rounded p-2 ${isThreadAnswered && _thread?.commentAnswerId == comment.id ? 'bg-green-900' : 'bg-neutral-500'}`}>{isThreadAnswered && _thread?.commentAnswerId == comment.id ? 'Svar' : 'Markera som svar'}</button>
      }
    </div>
  )
}
export default Comment
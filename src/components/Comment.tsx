import { FaUser } from "react-icons/fa"
import { useThread } from "../contexts/ThreadContext";

type CommentProps = {
  comment: ForumComment;
  thread: ThreadCategory
}

function Comment({ comment, thread }: CommentProps) {
  const { actions } = useThread()


  // if (!comment.creator) {
  //   return <p className="text-white">Kommentar saknar skapare</p>
  // }
  return (
    <div className='p-4 mt-4 rounded-lg mb-4 border border-gray-300 bg-blue-950'>
      <div className='flex gap-2 items-center'>
        <div className='text-gray-200'><FaUser /></div>
        <p className='font-semibold text-gray-200'>{comment.creator.userName}</p>
      </div>
      <p className='text-gray-200 my-3'>{comment.content}</p>
      {thread === "QNA" && !actions.isQNAAnswered(comment.id) &&
        <button className='bg-green-900 text-white text-sm rounded p-2'>Markera som svar</button>}

    </div>
  )
}
export default Comment
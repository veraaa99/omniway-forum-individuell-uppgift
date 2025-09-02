import { FaUser } from "react-icons/fa"

type CommentProps = {
  comment: ForumComment;
}

function Comment({ comment }: CommentProps) {
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
    </div>
  )
}
export default Comment
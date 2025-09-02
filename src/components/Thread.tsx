import { FaUser } from 'react-icons/fa';

type ThreadProps = {
  thread: Thread | QNAThread;
  comments?: ForumComment[]
};

export default function Thread({ thread, comments }: ThreadProps) {
  const threadComments = comments?.filter(c => c.thread === thread.id) ?? [];
  const answerCount = threadComments.length;
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

      <p className='text-gray-200 italic text-sm mb-2'> {answerCount > 0 ? `${answerCount} answer${answerCount > 1 ? "s" : ""}` : "No answers yet"}</p>

      <button className='bg-orange-600 text-gray-100 rounded px-3 py-2 text-sm hover:bg-orange-500'
        onClick={() => console.log("Reply here")}>
        Reply
      </button>
    </div>
  );
}
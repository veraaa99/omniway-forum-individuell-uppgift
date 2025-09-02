import { useForm } from 'react-hook-form';
import { useThread } from '../contexts/ThreadContext';
import { useUser } from '../contexts/UserContext';

type CommentFormProps = {
  thread: Thread | QNAThread;
  onClose: () => void;
}

type FormData = {
  comment: string;
}

function CommentForm({ thread, onClose }: CommentFormProps) {
  const { actions } = useThread()
  const { currentUser } = useUser()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (!currentUser) {
      alert("Du måste vara inloggad för att kommentera.");
      return;
    }

    const newComment: ForumComment = {
      id: Date.now(),
      thread: thread.id,
      content: data.comment,
      creator: currentUser,
    }

    actions.addComment(newComment);
    onClose();
   };

  console.log(errors);
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center'>
      <div className="relative bg-white max-w-screen-sm shadow-md rounded px-8 pt-6 pb-8 my-6 flex flex-col justify-center">
        <button
          onClick={onClose}
          className="hover:text-black shadow appearance-none border rounded font-semibold text-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline absolute right-2 top-2"
          aria-label="Stäng formulär"
        >
          X
        </button>
        <div className="bg-white shadow-md rounded px-8 py-6 mt-10 mb-4">
          {thread && (
            <p>Svar till <span className='font-bold'>{thread.creator.userName}</span> på tråd <span className='font-bold'>{thread.title}</span></p>
          )}
        </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <textarea
              {...register("comment", {
                required: "Kommentaren får inte vara tom.",
                minLength: {
                  value: 2,
                  message: "Kommentaren måste vara minst 2 tecken."
                },
                maxLength: {
                  value: 300,
                  message: "Kommentaren får högst vara 300 tecken."
                }
              })}
              placeholder="Skriv din kommentar här..."
              className="w-full border rounded p-2"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
            )}
          </div>
          <button
              type="submit"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            Skicka Kommentar
          </button>
        </form>
      </div>
    </div>
  )
}
export default CommentForm
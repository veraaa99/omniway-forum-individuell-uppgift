import { useForm } from 'react-hook-form';
import { useThread } from '../contexts/ThreadContext';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';

type CommentFormProps = {
  thread: Thread | QNAThread;
}

type FormData = {
  comment: string;
}

function CommentForm({ thread }: CommentFormProps) {
  const { actions } = useThread()
  const { currentUser } = useUser()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const onClose = () => {
    setIsOpen(false)
  }

  const onSubmit = (data: FormData) => {
    // Login function before checking
    // if (!currentUser) {
    //   alert("Du måste vara inloggad för att kommentera.");
    //   return;
    // }

    const newComment: ForumComment = {
      id: Date.now(),
      thread: thread.id,
      content: data.comment,
      creator: currentUser,
    }

    actions.addComment(newComment);
    onClose();
   };

   if (!isOpen) return null;

  console.log(errors);
  return (
    <div className="relative bg-white max-w-screen-sm shadow-md rounded px-8 pt-6 pb-8 my-6 flex flex-col justify-center">
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-black text-xl absolute right-2 top-2"
        aria-label="Stäng formulär"
      >
        X
      </button>
      <div className="bg-white rounded px-8 pt-6 mt-4 mb-4">
        {thread && (
          <p>Svar till {thread.creator.userName} på tråd {thread.title}</p>
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
  )
}
export default CommentForm
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useThread } from '../contexts/ThreadContext';
import { useUser } from '../contexts/UserContext';

type EditThreadFormProps = {
    thread: ThreadCategoryType;
    onClose?: () => void;
}

type EditThreadFormData = Omit<Thread, 'id' | 'creator' | 'creationDate'>

export default function EditThreadForm({ thread, onClose }: EditThreadFormProps) {
    const { actions } = useThread();
    const { currentUser } = useUser();

    const updatedDate = new Date().toLocaleDateString("sv-SE");

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<EditThreadFormData>()

    const onSubmit: SubmitHandler<EditThreadFormData> = (data) => {
        if (!currentUser) {
            return
        }

        if (currentUser) {
            if(data.category == "QNA") {
                const qnaThread = thread as QNAThread;
                const newQNAThread: QNAThread = {
                    id: qnaThread.id,
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    creationDate: updatedDate,
                    creator: { userName: currentUser.userName, password: currentUser.password },
                    commentsLocked: data.commentsLocked,
                    isAnswered: qnaThread.isAnswered,
                    commentAnswerId: qnaThread.commentAnswerId
                }
                actions.updateThread(newQNAThread);
                onClose?.();

            } else {
                const newThread: Thread = {
                    id: thread.id,
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    creationDate: updatedDate,
                    creator: { userName: currentUser.userName, password: currentUser.password },
                    commentsLocked: data.commentsLocked
                }
                actions.updateThread(newThread);
                onClose?.();
            }
        }

        return
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-2" >Titel: </label>
                    <input className='border' defaultValue={thread.title} {...register("title", { required: true })} />
                    {errors.title && errors.title.type === "required" && <p className="text-red-600 text-sm italic mt-1">Vänligen ange en titel</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2" >Kategori: </label>
                    <div className=''>
                        <select
                            className='border'
                            defaultValue={thread.category}
                            required
                            {...register("category", { validate: (value) => value !== 'NoCategory' })}
                            onChange={e => setValue("category", e.target.value as ThreadCategory, { shouldValidate: true })}
                        >
                            <option value="NoCategory">Välj:</option>
                            <option value="QNA">QNA</option>
                            <option value="Diskussion">Diskussion</option>
                            <option value="Meddelande">Meddelande</option>
                            <option value="Hitta gruppmedlem">Hitta gruppmedlem</option>
                        </select>
                        {errors.category && errors.category.type === "validate" && <p className="text-red-600 text-sm italic mb-5 mt-1">Vänligen välj en kategori till tråden</p>}
                    </div>
                </div>

                <div>
                    <label>Beskrivning: </label>
                    <textarea className='border w-full p-2 rounded' defaultValue={thread.description} id='description' {...register("description", { required: true })} />
                    {errors.description && errors.description.type === "required" && <p className="text-red-600 text-sm italic">Vänligen ange en beskrivning till tråden</p>}
                </div>

                <div className='mb-3'>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" {...register("commentsLocked")} />
                        <span className="ml-2">Låsa kommentarer?</span>
                    </label>
                </div>
                {/* {errorMessage && (<p className='text-red-600 text-sm mb-4'>{errorMessage}</p>)} */}

                <button
                    type='submit'
                    className='bg-green-800 text-white p-3 rounded mt-5'
                >
                    Publicera
                </button>
            </form >
        </div >
    )
}
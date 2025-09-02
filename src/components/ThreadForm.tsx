import { useForm, type SubmitHandler } from 'react-hook-form'
import Dropdown from './Dropdown'
import { useThread } from '../contexts/ThreadContext';
import { dummyUsers } from '../data/users';

type ThreadFormProps = {
    onClose?: () => void;
}

type ThreadFormData = Omit<Thread, 'id' | 'creator' | 'creationDate'>

export default function ThreadForm({ onClose }: ThreadFormProps) {
    const { threads, actions } = useThread();

    const creationDate = new Date().toLocaleDateString("sv-SE");

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ThreadFormData>()

    const onSubmit: SubmitHandler<ThreadFormData> = (data) => {
        const newThread: Thread = {
            id: threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1,
            title: data.title,
            category: data.category,
            description: data.description,
            creationDate: creationDate,
            creator: { userName: dummyUsers[0].userName, password: '' }
        }

        actions.createThread(newThread);
        onClose?.();
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-2" >Titel: </label>
                    <input className='border' {...register("title")} />
                </div>

                <div className="mb-4">
                    <label className="block mb-2" >Kategori: </label>
                    <div className='flex'>
                        <input className='border' {...register("category")} />
                        <Dropdown
                            onSelect={(value) => setValue("category", value, { shouldValidate: true })}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label>Beskrivning: </label>
                    <textarea className='border w-full p-2 rounded' id='description' {...register("description")} />
                </div>

                <button type='submit' className='border-blue-950 rounded'>Publicera</button>
            </form >
        </div >
    )
}


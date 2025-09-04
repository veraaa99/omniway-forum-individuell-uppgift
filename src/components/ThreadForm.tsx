import { useForm, type SubmitHandler } from 'react-hook-form'
import { useThread } from '../contexts/ThreadContext';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';

type ThreadFormProps = {
    onClose?: () => void;
}

type ThreadFormData = Omit<Thread, 'id' | 'creator' | 'creationDate'>

export default function ThreadForm({ onClose }: ThreadFormProps) {
    const { threads, actions } = useThread();
    const { currentUser } = useUser();

    const [errorMessage, seterrorMessage] = useState<string | null>(null)

    const creationDate = new Date().toLocaleDateString("sv-SE");

    const {
        register,
        setValue,
        handleSubmit,
    } = useForm<ThreadFormData>()

    //if category === "THREAD", rendera ut error-meddelande i form
    //ÄNDRA NEDAN SÅ ATT THREAD ÄR DEFAULT VALUE

    const onSubmit: SubmitHandler<ThreadFormData> = (data) => {

        if (!currentUser) {
            seterrorMessage('Du måste vara inloggad för att skapa en tråd')

            return
        }

        const newThread: Thread = {
            id: threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1,
            title: data.title,
            category: data.category,
            description: data.description,
            creationDate: creationDate,
            creator: { userName: currentUser.userName, password: '' },
            commentsLocked: data.commentsLocked
        }

        actions.createThread(newThread);
        onClose?.();
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-2" >Titel: </label>
                    <input className='border' required {...register("title")} />
                </div>

                <div className="mb-4">
                    <label className="block mb-2" >Kategori: </label>
                    <div className=''>
                        <select
                            className='border'
                            required
                            {...register("category")}
                            onChange={e => setValue("category", e.target.value as ThreadCategory, { shouldValidate: true })}
                        >
                            <option value="THREAD">Välj:</option>
                            <option value="QNA">QNA</option>
                            <option value="Diskussion">Diskussion</option>
                            <option value="Meddelande">Meddelande</option>
                            <option value="Hitta gruppmedlem">Hitta gruppmedlem</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label>Beskrivning: </label>
                    <textarea className='border w-full p-2 rounded' required id='description' {...register("description")} />
                </div>

                <div className='mb-3'>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" {...register("commentsLocked")} />
                        <span className="ml-2">Låsa kommentarer?</span>
                    </label>
                </div>
                {errorMessage && (<p className='text-red-600 text-sm mb-4'>{errorMessage}</p>)}
                <button
                    type='submit'
                    className='bg-green-800 text-white p-3 rounded'
                >
                    Publicera
                </button>
            </form >
        </div >
    )
}


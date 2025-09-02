import { useForm, type SubmitHandler } from 'react-hook-form'
import Dropdown from './Dropdown'
import { useThread } from '../contexts/ThreadContext';

type ThreadFormData = Thread

function ThreadForm() {
    const { threads, actions } = useThread(); 
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ThreadFormData>()
  const onSubmit: SubmitHandler<ThreadFormData> = (data) => console.log(data)
  
  return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block mb-2" >Titel: </label>
                <input className='border' {...register("title")} />
            </div>

            <div className="mb-4">
                <label className="block mb-2" >Kategori: </label>
                <div className='flex'>
                <input className='border' {...register("category")} />
                <Dropdown />
                </div>
            </div>

            <div className="mb-6">
                <label>Beskrivning: </label>
                <input className='border' type="text" id='description' {...register("description")} />
            </div>

            <div onSubmit={handleSubmit(onSubmit)}>
                <button
                    type="button"
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    onClick={() => {
                        // thread object with all Thread properties/props, ev. replace values if needed
                        const newThread: Thread = {
                            id: threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1,
                            title: "Hjälp",
                            category: "QNA",
                            creationDate: "2025-09-02",
                            description: "jag fattar egentligen inte hooks :(",
                            creator: {userName: "Rebecka", password: ""}
                        };
                        console.log(newThread)
                        setValue("title", newThread.title);
                        setValue("category", newThread.category);
                        setValue("creationDate", newThread.creationDate)
                        setValue("description", newThread.description);
                        setValue("creator", newThread.creator)
                    }}
                >
                Publicera
                </button>
            </div>
        </form>
    </div>
  )
}

export default ThreadForm

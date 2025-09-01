import { useForm, type SubmitHandler } from 'react-hook-form'

type FormData = {
  username: string
  password: string
}


function UserForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)

  return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block mb-2" >Användarnamn: </label>
                <input className='border' {...register("username")} />
            </div>

            <div className="mb-6">
                <label>Lösenord: </label>
                <input className='border' id='password' {...register("password")} />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>

            <div onSubmit={handleSubmit(onSubmit)}>
                <button
                    type="button"
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    onClick={() => {
                        setValue("username", "RebLar")
                        setValue("password", "123456")
                    }}
                >
                Logga in
                </button>
            </div>
        </form>
    </div>
  )
}

export default UserForm

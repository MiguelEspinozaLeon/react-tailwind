import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
type User = {
    firstname: string
    lastname: string
    email: string
    age: number
    username: string
    password: string
    index?: number
  }

export default function EditUser({users, user, editUser}:{users: User[], user: number, editUser: (data: User) => void}){
    const {register, handleSubmit, formState : {errors}} = useForm<User>();
    return (
        <>
            <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8  bg-teal-500'>
                <h1 className='text-blue-600 font-bold py-4'>Form</h1>
                <form onSubmit={handleSubmit(editUser)}>
                <div className='flex flex-col items-center gap-4'>
                    <input defaultValue={users[user].firstname} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="firstname" {...register('firstname')} />

                    <input defaultValue={users[user].lastname} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="lastname" {...register('lastname')} />

                    <input defaultValue={users[user].email} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="email" {...register('email')} />

                    <input defaultValue={users[user].age} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="age" {...register('age')} />

                    <input defaultValue={users[user].username} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="username" {...register('username')} />

                    <input defaultValue={users[user].password} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="password" {...register('password', {required: true})} />
                    {errors.password && <span>This field is required</span>}

                    <input className='border-2 border-white shadow-md bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-sm px-8 cursor-pointer hover:bg-cyan-700' type='submit' value="Submit" />
                    
                </div>
                </form>
            </div>
        
        </>
    )
}
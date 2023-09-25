import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import './App.css'
import UsersTable from './UsersTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

type Inputs = {
  firstname: string
  lastname: string
  email: string
  age: number
  username: string
  password: string
}

export default function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<Inputs[]>([]);
  const {register, handleSubmit, watch, formState : {errors}} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    const user: Inputs = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      age: data.age,
      username : data.username,
      password: data.password
    }
    setUsers([...users, user]);
    toast.success('User added!');
    
  };
  

  return (
    <>
      <ToastContainer/>
      
      <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8 bg-teal-500'>
        <h1 className='text-blue-600 font-bold py-4'>Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center gap-4'>
              <input defaultValue="John" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="firstname" {...register('firstname')} />
              <input defaultValue="Doe" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="lastname" {...register('lastname')} />
              <input defaultValue="test@gmail.com" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="email" {...register('email')} />
              <input defaultValue={0} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="age" {...register('age')} />
              <input defaultValue="username" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="username" {...register('username')} />
              <input defaultValue="password" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="password" {...register('password', {required: true})} />
              {errors.password && <span>This field is required</span>}
              <input className='border-2 border-white shadow-md bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-sm px-8 cursor-pointer hover:bg-cyan-700' type='submit' value="Submit" />
            
          </div>
        </form>
      </div>
       {count > 0 && (
        <span>You have registered {count} users.</span>
      )}
      {users.length > 0 && (
          <UsersTable users={users}/>
      )}
      
      
    </>
  )
}



import { useState } from 'react'
import { useForm, SubmitHandler} from "react-hook-form"
import { Toaster, toast } from 'sonner'
import './App.css'

import EditUser from './EditUser'
import DynamicUsersTable from './DynamicUsersTable'
import { supabase } from './supabase'
import Button from './components/button'


type Inputs = {
  firstname: string
  lastname: string 
  email: string 
  age: number 
  username: string 
  password: string
 
 
}

type InputsEdit = {
  firstname: string
  lastname: string
  email: string
  age: number
  username: string
  password: string
  
}

export default function App() {
  //const [count, setCount] = useState(0);
  const [users, setUsers] = useState<Inputs[]>([]);
  const {register, handleSubmit, formState : {errors}} = useForm<Inputs>();
  const [showEdit, setShowEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(0);

  
  const handleEditClick = async (userid: number) => {
    setEditUserId(userid);
    setShowEdit(true);
  }
  
  const onSubmit: SubmitHandler<Inputs> = async (datos) =>{
    const  {data, error}  = await supabase.from('users').insert([{ firstname: datos.firstname, lastname: datos.lastname, email: datos.email, age: datos.age, username: datos.username, password: datos.password },]).select()
    if(error) console.log(error);
    toast.success('Usuario Registrado');
    setUsers([...users, data?.[0] as Inputs]);
    
  };


  return (
    <>
    <Toaster richColors position='top-right'/>
    <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8  bg-teal-500
      self-center'>
        <h1 className='text-blue-600 font-bold py-4'>Registrar Usuario</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center gap-4'>
              <input defaultValue="John" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="firstname" {...register('firstname', {required: true})} />
              {errors.firstname && <span>This field is required</span>}
              <input defaultValue="Doe" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="lastname" {...register('lastname', {required: true})} />
              {errors.lastname && <span>This field is required</span>}
              <input defaultValue="test@gmail.com" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="email" {...register('email', {required: true})} />
              {errors.email && <span>This field is required</span>}
              <input defaultValue={0} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="age" {...register('age', {required: true})} />
              {errors.age && <span>This field is required</span>}
              <input defaultValue="username" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="username" {...register('username', {required: true})} />
              {errors.username && <span>This field is required</span>}
              <input defaultValue="password" className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="password" {...register('password', {required: true})} />
              {errors.password && <span>This field is required</span>}

              <input className='border-2 border-white shadow-md bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-sm px-8 cursor-pointer hover:bg-cyan-700' type='submit' value="Submit" />
            
          </div>
        </form>
      </div>
      
         
      
      {showEdit && (
          <EditUser userid={editUserId} />
      )
      }
      <DynamicUsersTable  edit={handleEditClick}/>
      
      
      
    </>
  )
}



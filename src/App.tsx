import { useState } from 'react'
import { useForm, SubmitHandler} from "react-hook-form"
import { Toaster, toast } from 'sonner'
import './App.css'
import EditUser from './EditUser'
import DynamicUsersTable from './DynamicUsersTable'
import { supabase } from './supabase'
import { Routes, Route, useNavigate } from 'react-router-dom'



type Inputs = {
  firstname: string
  lastname: string 
  email: string 
  age: number 
  username: string 
  password: string 
}


export default function App() {
  const navigate = useNavigate();

  const navigateToUsersTable = () => {
    navigate('/users');
  }
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
    <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8  bg-slate-800
      self-center'>
        <h1 className='text-gray-50 font-bold py-4'>Register User</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center gap-4'>
              <input defaultValue="John" className='text-black px-2 rounded-sm ' id="firstname" {...register('firstname', {required: true})} />
              {errors.firstname && <span>This field is required</span>}
              <input defaultValue="Doe" className='text-black px-2 border rounded-sm' id="lastname" {...register('lastname', {required: true})} />
              {errors.lastname && <span>This field is required</span>}
              <input defaultValue="test@gmail.com" className='text-black px-2 rounded-sm' id="email" {...register('email', {required: true})} />
              {errors.email && <span>This field is required</span>}
              <input defaultValue={0} className='text-black px-2 rounded-sm' id="age" {...register('age', {required: true})} />
              {errors.age && <span>This field is required</span>}
              <input defaultValue="username" className='text-black px-2 rounded-sm' id="username" {...register('username', {required: true})} />
              {errors.username && <span>This field is required</span>}
              <input defaultValue="password" className='text-black px-2 rounded-sm' id="password" {...register('password', {required: true})} />
              {errors.password && <span>This field is required</span>}

              <button type='submit' className='rounded-sm bg-sky-300 cursor-pointer border-2 border-white px-6 text-black' >Register</button>

              <button onClick={navigateToUsersTable} className='no-underline hover:underline text-sky-300'>View users table</button>
            
          </div>
        </form>
      </div>
        <Routes>
          <Route path='/users' element={<DynamicUsersTable edit={handleEditClick} />} />
        </Routes>
      
         
      
      {showEdit && (
          <EditUser userid={editUserId} />
      )
      }
      
      
      
      
    </>
  )
}



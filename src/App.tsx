import { useState } from 'react'
import { useForm, SubmitHandler, set } from "react-hook-form"
import './App.css'
import UsersTable from './UsersTable'
import EditUser from './EditUser'
import DynamicUsersTable from './DynamicUsersTable'
import { supabase } from './supabase'


type Inputs = {
  firstname: string | null
  lastname: string | null
  email: string | null
  age: number | null
  username: string | null
  password: string | null
  id: number 
  created_at: string 
 
}

type InputsEdit = {
  firstname: string
  lastname: string
  email: string
  age: number
  username: string
  password: string
  id: number
  created_at: string
}

export default function App() {
  //const [count, setCount] = useState(0);
  const [users, setUsers] = useState<Inputs[]>([]);
  const {register, handleSubmit, formState : {errors}} = useForm<Inputs>();
  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState<InputsEdit>({} as InputsEdit);
  const [editUserId, setEditUserId] = useState(0);

  const deleteUser = (index: number) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers); 
  }

  

  const handleEditClick = async (userid: number) => {
    //const {data, error} = await supabase.from('users').select('*').eq('id', userid);
    //if(error) console.log(error);
    //console.log(data)
    setEditUserId(userid);
    //if(data)setEditUser(data[0]);
    
    setShowEdit(true);
  }
  // make a function to insert rows into supabase table users          

  //Agregar usuario a la BD
  const onSubmit: SubmitHandler<Inputs> = async (datos) =>{
    const  {data, error}  = await supabase.from('users').insert([{ firstname: datos.firstname, lastname: datos.lastname, email: datos.email, age: datos.age, username: datos.username, password: datos.password },]).select()
    if(error) console.log(error);
    console.log(data);
  };

  const onEditSubmit: SubmitHandler<Inputs> = async (datos) =>{
    const {data, error} = await supabase.from('users').update({firstname: datos.firstname, lastname: datos.lastname, email: datos.email, age: datos.age, username: datos.username, password: datos.password}).eq('id', editUserId ).select();
    if (error) console.log(error);
    console.log(data); 
    setShowEdit(false);
  };
  

  return (
    <>
      
      <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8  bg-teal-500
      self-center'>
        <h1 className='text-blue-600 font-bold py-4'>Registrar Usuario</h1>
        
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
      
         
      
      {showEdit && (
          <EditUser userid={editUserId} editUser={onEditSubmit} />
      )
      }
      <DynamicUsersTable edit={handleEditClick}/>
      
      
      
    </>
  )
}



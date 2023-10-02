import { useEffect, useState } from "react";
import {useForm, SubmitHandler, Controller } from "react-hook-form";
import { supabase } from "./supabase";
type User = {
    firstname: string 
    lastname: string 
    email: string 
    age: number 
    username: string 
    password: string 
    
  }

export default function EditUser({userid}:{userid: number}){
    const [user, setUser] = useState<User>({} as User);
    const {register, handleSubmit, formState : {errors}} = useForm<User>({defaultValues: async () => {
        const {data, error} = await supabase.from('users').select('*').eq('id', userid);
        
        if(error) console.log(error);
        const usuario: User = data ? data[0] : {} as User;
        console.log('usuario', usuario);
        
        return {
            firstname: usuario.firstname ?? '',
            lastname: usuario.lastname ?? '',
            email: usuario.email ?? '',
            age: usuario.age ?? 0,
            username: usuario.username ?? '',
            password: usuario.password ?? ''
        }
    }});
        
    
    
    
    
   /* useEffect(() => {
        fetchUserToUpdate(userid)
    }, []); */


    const onEditSubmit: SubmitHandler<User> = async (datos) =>{
        console.log('datos a editar', datos);
        const {data, error} = await supabase.from('users').update({firstname: datos.firstname, lastname: datos.lastname, email: datos.email, age: datos.age, username: datos.username, password: datos.password}).eq('id', userid ).select('*');
        if (error) console.log(error);
        console.log('data', data);
        
      }; 
      
    /*
    async function fetchUserToUpdate(userid: number){
        try {
            const {data, error} = await supabase.from('users').select('*').eq('id', userid);
            if(error) throw error;
            setUser(data[0]);
            console.log('user data',data[0]);
        } catch (error) {
            console.log(error);
        }
    } */

    return (
        <>
            <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8  bg-teal-500'>
                <h1 className='text-blue-600 font-bold py-4'>Editar Usuario</h1>
                <form onSubmit={handleSubmit(onEditSubmit)}>
                <div className='flex flex-col items-center gap-4'>
                    
                    <input  className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="firstname" {...register('firstname')} />

                    <input  className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="lastname" {...register('lastname')}  />

                    <input className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="email" {...register('email')}/>

                    <input className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="age" {...register('age')}/>

                    <input className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="username" {...register('username')}/>

                    <input className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="password" {...register('password')} />
                    

                    <input className='border-2 border-white shadow-md bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-sm px-8 cursor-pointer hover:bg-cyan-700' type='submit' value="Submit" />
                    
                </div>      
                </form>
            </div>
            <ul>
                <li>{user.age}</li>
                <li>{user.firstname}</li>
                
                <li>{user.lastname}</li>
                <li>{user.email}</li>
                <li>{user.username}</li>
                <li>{user.password}</li>
            </ul>
        
        </>
    )
}
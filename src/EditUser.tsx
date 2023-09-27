import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { supabase } from "./supabase";
type User = {
    firstname: string | null
    lastname: string | null
    email: string | null
    age: number | null
    username: string | null
    password: string | null
    id: number 
    created_at: string 
  }

export default function EditUser({userid, editUser}:{userid: number, editUser: (data: User) => void}){
    const {register, handleSubmit, formState : {errors}} = useForm<User>();
    const [user, setUser] = useState<User>({} as User);
    useEffect(() => {
        fetchUserToUpdate(userid)
    }, []);

    async function fetchUserToUpdate(userid: number){
        try {
            const {data, error} = await supabase.from('users').select('*').eq('id', userid);
            if(error) throw error;
            setUser(data[0]);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='container mx-auto shadow-lg max-w-sm rounded overflow-hidden p-8  bg-teal-500'>
                <h1 className='text-blue-600 font-bold py-4'>Editar Usuario</h1>
                <form onSubmit={handleSubmit(editUser)}>
                <div className='flex flex-col items-center gap-4'>
                    <input  defaultValue={user.firstname ?? ''} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="firstname" {...register('firstname')} />

                    <input defaultValue={user.lastname ?? ''} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="lastname" {...register('lastname')} />

                    <input defaultValue={user.email ?? ''} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="email" {...register('email')} />

                    <input defaultValue={user.age ?? ''} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="age" {...register('age')} />

                    <input defaultValue={user.username ?? ''} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="username" {...register('username')} />

                    <input defaultValue={user.password ?? ''} className='text-cyan-500 px-4 border border-sky-500 rounded-sm' id="password" {...register('password', {required: true})} />
                    {errors.password && <span>This field is required</span>}

                    <input className='border-2 border-white shadow-md bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-sm px-8 cursor-pointer hover:bg-cyan-700' type='submit' value="Submit" />
                    
                </div>
                </form>
            </div>
        
        </>
    )
}
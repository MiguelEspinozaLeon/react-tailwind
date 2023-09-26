import { useState } from "react"
import { set } from "react-hook-form"

type User = {
    firstname: string
    lastname: string
    email: string
    age: number
    username: string
    password: string
  }

  const tableColumns = [ 
    {name: '#', label: '#'},
    {name: 'firstname', label: 'First Name'},
    {name: 'lastname', label: 'Last Name'},
    {name: 'email', label: 'E-mail'},
    {name: 'age', label: 'Age'},
    {name: 'username', label: 'Username'},
    {name: 'password', label: 'Password'},
    {name: 'actions', label: 'Actions'}
  ]


export default function UsersTable({users, deleteUser}:{users: User[], deleteUser: (index: number) => void}){
   
    return (
        <>
        <div className='container mx-auto shadow-lg rounded p-8 flex flex-col items-center'>
          <table className='object-fill table-auto border-collapse border border-slate-500 border-spacing-2 w-full text-slate-100 font-sans'>
            <caption className='caption-bottom text-black'>Table 1.0: Users registered in this app.</caption>
            <thead className='bg-slate-500'>
              <tr>
                {tableColumns.map((column, index) => {
                  return (
                    <th key={index} className='border border-slate-600 p-3'>{column.label}</th>
                  )
                } )}
              </tr>
            </thead>
            <tbody className='bg-slate-800'>
              {users.map((user: User, index:number)=>(
                <tr key={index}>
                  <td className='border border-slate-700 p-3'>{index}</td>
                  <td className='border border-slate-700 p-3'>{user.firstname}</td>
                  <td className='border border-slate-700 p-3'>{user.lastname}</td>
                  <td className='border border-slate-700 p-3'>{user.email}</td>
                  <td className='border border-slate-700 p-3'>{user.age}</td>
                  <td className='border border-slate-700 p-3'>{user.username}</td>
                  <td className='border border-slate-700 p-3'>{user.password}</td>
                  <td className="border border-slate-700 p-3 ">
                    <div className="flex gap-2 items-center">
                        <button className="rounded p-2 bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">Editar</button>
                        <button className="rounded p-2 bg-gradient-to-r from-red-500 to-red-700 cursor-pointer" onClick={() => deleteUser(index)}>Eliminar</button>
                    </div>
                    
                  </td>
                  
                </tr>
              ))}
              
            </tbody>
          </table>
          
        </div>
        
        
        </>
    )
}
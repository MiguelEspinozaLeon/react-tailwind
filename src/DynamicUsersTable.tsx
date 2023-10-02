import { useEffect, useState } from "react"
import { supabase } from "./supabase";



type User = {
    id: number
    created_at: string
    firstname: string | null
    lastname: string | null
    email: string | null
    age: number | null
    username: string | null
    password: string | null
}

const tableColumns = [ 
    {id:1, name: 'id', label: 'Id'},
    {id:2, name: 'firstname', label: 'First Name'},
    {id:3, name: 'lastname', label: 'Last Name'},
    {id:4, name: 'email', label: 'E-mail'},
    {id:5, name: 'age', label: 'Age'},
    {id:6, name: 'username', label: 'Username'},
    {id:8, name: 'actions', label: 'Actions'}
]

export default function DynamicUsersTable({edit}: {edit: (userid: number) => void}){
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [users])

    async function fetchUsers(){
        try {
            const {data, error}  = await supabase.from('users').select('*').order('id', {ascending: true});
            if(error) throw error;
            const usersdata: User[] = data;
            setUsers(usersdata);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="bg-white container mx-auto shadow-lg rounded p-8 flex flex-col items-center">
            <p>Search by User</p>  
            <input defaultValue={search} type="text" className="rounded p-2 border border-gray-300 w-full" placeholder="Search..." onChange={(e)=>{setSearch(e.target.value)}}/>
            {users.filter((user: User) => {user.firstname === search}).map((user: User) => (
                <p>{user.firstname}</p>
            ))}
            <table className='object-fill table-auto border-collapse border border-slate-500 border-spacing-2 w-full text-slate-100 font-sans'>
            <caption className='caption-bottom text-black'>Table 1.0: Users registered in this app.</caption>
                <thead className="bg-slate-500">
                    <tr>
                        {tableColumns.map((column, index) => (
                            <th key={index} className='border border-slate-600 p-3'>{column.label}</th>                        
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-slate-800">
                    
                    {users.map((user: User) => (
                        <tr key={user.id}>
                            <td className='border border-slate-700 p-3'>{user.id}</td>
                            <td className='border border-slate-700 p-3'>{user.firstname}</td>
                            <td className='border border-slate-700 p-3'>{user.lastname}</td>
                            <td className='border border-slate-700 p-3'>{user.email}</td>
                            <td className='border border-slate-700 p-3'>{user.age}</td>
                            <td className='border border-slate-700 p-3'>{user.username}</td>
                            <td className='border border-slate-700 p-3'>
                                <button className="rounded p-2 bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer" onClick={()=>edit(user.id)}>Edit</button>
                                <button className="rounded p-2 bg-gradient-to-r from-red-500 to-red-700 cursor-pointer">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        </>
    )
}
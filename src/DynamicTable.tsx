import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Database } from "./schema";

const supabase = createClient<Database>("https://jwvvdkaiqshpjxadopyp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dnZka2FpcXNocGp4YWRvcHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NDk5NzIsImV4cCI6MjAxMTMyNTk3Mn0.VCSn4uS_oopYXilyxUgmLYrNB6nz12ZU7Q5CMyMFZxg");

type User = {
    id?: number
    created_at?: string
    firstname?: string | null
    lastname?: string | null
    email?: string | null
    age?: number | null
    username?: string | null
    password?: string | null
}

const tableColumns = [ 
    {id:1, name: '#', label: '#'},
    {id:2, name: 'firstname', label: 'First Name'},
    {id:3, name: 'lastname', label: 'Last Name'},
    {id:4, name: 'email', label: 'E-mail'},
    {id:5, name: 'age', label: 'Age'},
    {id:6, name: 'username', label: 'Username'},
    {id:7, name: 'password', label: 'Password'},
    {id:8, name: 'actions', label: 'Actions'}
]

export default function DynamicTable(){
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    async function fetchUsers(){
        try {
            const data = await supabase.from('users').select('*'); 
            if(data.error) throw data.error;
            const usersdata: User[] = data.data;
            console.log('usersdata', usersdata);
            setUsers(users.concat(usersdata));
            //console.log(users);
            
        } catch (error) {
            console.log(error);
        }
        
        
        
    }

    return (
        <>
        <div className="container">
            <table>
                <thead>
                    <tr>
                        {tableColumns.map((column, index) => (
                            <th key={index}>{column.label}</th>                        
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => (
                        <tr key={user.id}>
                            {tableColumns.map((column)=>(
                                <td key={column.id}>{user[column.name]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        </>
    )
}
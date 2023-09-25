
type User = {
    firstname: string
    lastname: string
    email: string
    age: number
    username: string
    password: string
  }


export default function UsersTable({users}:{users: User[]}){
    
    const handleClick = () => {

    }
    const eliminarUsuario = (index: number) => {
        console.log(users)
        users.splice(index, 1);
        console.log(users)
    }

    return (
        <>
        <div className='container mx-auto shadow-lg rounded p-8 flex flex-col items-center'>
          <table className='object-fill table-auto border-collapse border border-slate-500 border-spacing-2 w-full text-slate-100 font-sans'>
            <caption className='caption-bottom text-black'>Table 1.0: Users registered in this app.</caption>
            <thead className='bg-slate-500'>
              <tr>
                <th className='border border-slate-600 p-3'>#</th>
                <th className="border border-slate-600 p-3">First Name</th>
                <th className="border border-slate-600 p-3">Last Name</th>
                <th className="border border-slate-600 p-3">E-mail</th>
                <th className="border border-slate-600 p-3">Age</th>
                <th className='border border-slate-600 p-3'>Username</th>
                <th className='border border-slate-600 p-3'>Password</th>
                <th className="border border-slate-600 p-3">Actions</th>
              </tr>
            </thead>
            <tbody className='bg-slate-800'>
              {users.map((user: User, index:number)=>(
                <tr key={index} className="cursor-pointer" onClick={handleClick}>
                  <td className='border border-slate-700 p-3'>{index}</td>
                  <td className='border border-slate-700 p-3'>{user.firstname}</td>
                  <td className='border border-slate-700 p-3'>{user.lastname}</td>
                  <td className='border border-slate-700 p-3'>{user.email}</td>
                  <td className='border border-slate-700 p-3'>{user.age}</td>
                  <td className='border border-slate-700 p-3'>{user.username}</td>
                  <td className='border border-slate-700 p-3'>{user.password}</td>
                  <td className="border border-slate-700 p-3 ">
                    <div className="flex gap-2 items-center">
                        <button className="rounded p-2 bg-gradient-to-r from-cyan-500 to-blue-500">Editar</button>
                        <button className="rounded p-2 bg-gradient-to-r from-red-500 to-red-700" onClick={() => eliminarUsuario(index)}>Eliminar</button>
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
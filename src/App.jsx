import { useEffect, useState } from 'react'
import './App.css'

const URL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  const [users, setUsers] = useState()
  const [filter, setFilter] = useState()

  // fetch users data
  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setFilter(data)
      })
      .catch(err => console.log(err))

  }, [])

  // filter users function
  const handleFilteredUsers = (e) => {
    const filteredUsers = users.filter(user => user.email.toLowerCase().includes(e.target.value.toLowerCase()) || user.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilter(filteredUsers)
  }

  return (
    <main>
      <div className='table-searchBar-container'>
        <div className='searchBar'>
          <input onChange={(e) => handleFilteredUsers(e)} type="text" placeholder='Buscar usuario...' />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='table'>
          <div className='table__grid table__grid-title'>
            Nombre
          </div>
          <div className='table__grid table__grid-title'>
            Correo
          </div>
          <div className='table__grid table__grid-title'>
            Dirección
          </div>
          {filter?.length > 0 ? filter?.map(user => (
            <>
              <div className='table__grid' key={user.name}>
                {user.name}
              </div>
              <div className='table__grid' key={user.email}>
                {user.email}
              </div>
              <div className='table__grid' key={user.address.street}>
                {user.address.street} {user.address.suite}, {user.address.city}
              </div>
            </>
          )) : <div className='userNotFound'>Usuario no encontrado</div>}
        </div>
      </div>
    </main>
  )
}

export default App

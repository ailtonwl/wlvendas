import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Usuario() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  async function getUsers() {
    let usersFromApi = await api.get('/user')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/user', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value
    })

    getUsers()
  }

  async function deleteUsers(id) {

    await api.delete(`/user/${id}`)

    getUsers()

  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    // <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name="name" type="text" ref={inputName} />
          <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
          <input placeholder="Password" name="password" type="password" ref={inputPassword} />
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>

        { users.map( user => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{ user.name }</span></p>
              <p>E-mail: <span>{ user.email }</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} className="material-symbols-outlined" />
            </button>
          </div>
        ) ) }
      </div>
    // </>
  )
}

export default Usuario

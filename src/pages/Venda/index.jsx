import './style.css'
import Plus from '../../assets/addcircle.svg'
import { useState } from 'react'

function Venda() {

  const [cadastro, setCadastro] = useState(0)

  function adicionaPessoa() {
    setCadastro(1)
  }

  function listaPessoa() {
    setCadastro(0)
  }


  if (cadastro === 1) {

    return (
      <div className="container">
        <h1>Cadastro de Vendas</h1>
        <button onClick={listaPessoa}>
          <img src={Plus} />
        </button>
      </div>
    )
  } else {

    return (
      <div className="container">
        <h3>Ailton Martins Guimarães</h3>
        <button onClick={adicionaPessoa}>
          <img src={Plus} />
        </button>
      </div>
    )
  }
}

export default Venda

/* <form>
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
              <p>Password: <span>{ user.password }</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} className="material-symbols-outlined" />
            </button>
          </div>
        ) ) } */

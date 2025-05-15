// import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './style.css'
import Logo from '../../assets/storefront.svg'
import Usuario from '../Usuario'
import Venda from '../Venda'
import Pessoa from '../Pessoa'
import Unidade from '../Unidade'
import Produto from '../Produto'

function Home() {

  function buttonClick() {

    const nav = document.querySelector(".nav")

    nav.classList.toggle("active")
  }

  function homeClick() {
    // const nav = document.querySelector(".nav")
    // nav.classList.toggle("active")
    createRoot(document.getElementById('corpo')).render(
      <div></div>
    )
  }

  function vendaClick() {
    const nav = document.querySelector(".nav")
    nav.classList.toggle("active")
    createRoot(document.getElementById('corpo')).render(
      <Venda />
    )
  }

  function usuarioClick() {
    const nav = document.querySelector(".nav")
    nav.classList.toggle("active")
    createRoot(document.getElementById('corpo')).render(
        <Usuario />
    )
  }

  function pessoaClick() {
    const nav = document.querySelector(".nav")
    nav.classList.toggle("active")
    createRoot(document.getElementById('corpo')).render(
        <Pessoa />
    )
  }

  function produtoClick() {
    const nav = document.querySelector(".nav")
    nav.classList.toggle("active")
    createRoot(document.getElementById('corpo')).render(
        <Produto />
    )
  }

  function unidadeClick() {
    const nav = document.querySelector(".nav")
    nav.classList.toggle("active")
    createRoot(document.getElementById('corpo')).render(
        <Unidade />
    )
  }

  return (

    <>

      <header className="header">
        <div className="menu">
          <div>
            <a href='#' onClick={homeClick}>
              <img alt="store" src="src/assets/storefront.svg" />
            </a>
          </div>
          <div>
            <nav className="nav">
              <button id="hamburger" title="button" className="hamburger" onClick={buttonClick}></button>
              <ul className="nav-list">
                <li><a href='#' id="venda" onClick={vendaClick}>Vendas</a></li>
                <li className="dropdown">
                  <a href='#' id="produto" onClick={produtoClick}>Produtos</a>
                  <div className="dropdown-menu">
                    <a href='#' id="unidade" onClick={unidadeClick}>Unidades</a>
                    <a href='#' id="produto">Outra Coisa</a>
                  </div>
                </li>
                <li><a href='#' id="compra">Compras</a></li>
                <li><a href='#' id="pessoa" onClick={pessoaClick}>Pessoas</a></li>
                <li><a href='#' id="usuario" onClick={usuarioClick}>Usuários</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <script src="scripts.js"></script>
      </header>
      <main id="corpo" className="hero">
        {/* <Usuario /> */}
      </main>
    </>
  )
}

export default Home

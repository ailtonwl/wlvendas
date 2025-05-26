import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trashcan.svg'
import Plus from '../../assets/addcircle.svg'
import Undo from '../../assets/undo.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'

function Pessoa() {
  const [pessoas, setPessoas] = useState([])
  const [cadastro, setCadastro] = useState(0)

  let [idPessoa, setIdPessoa] = useState(0)
  let [nome, setNome] = useState(0)
  let [email, setEmail] = useState(0)
  let [cliente, setCliente] = useState(false)
  let [fornecedor, setFornecedor] = useState(null)
  let [ativo, setAtivo] = useState(null)
  let [status, setStatus] = useState(null)

  let inputNome = useRef()
  let inputEmail = useRef()
  let inputCliente = useRef()
  let inputFornecedor = useRef()
  let inputAtivo = useRef()
  let selectStatus = useRef()

  function adicionaPessoa() {
    setCadastro(1)
  }

  function listarPessoas() {
    setCadastro(0)
  }

  function telaAlteraPessoa(pessoa) {
    // setPessoaUma(pessoa)
    setIdPessoa(pessoa.id)
    setNome(pessoa.nome)
    setEmail(pessoa.email)
    setCliente(pessoa.cliente)
    setFornecedor(pessoa.fornecedor)
    setAtivo(pessoa.ativo)
    setStatus(pessoa.status)

    console.log('Tela: ', pessoa)

    console.log(nome, email, cliente, fornecedor, ativo, status)

    setCadastro(2)
    // alteraPessoa(pessoa)
  }

  async function alteraPessoa(pessoa) {

    console.log('alteraPessoa: ', pessoa)

    // console.log('alteraPessoa: ', idPessoa, inputNome.current.value, inputEmail.current.value, inputCliente.current.value, inputFornecedor.current.value, inputAtivo.current.value, selectStatus.current.value)

    await api.put(`/pessoa/${pessoa}`, {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      cliente: inputCliente.current.checked,
      fornecedor: inputFornecedor.current.checked,
      ativo: inputAtivo.current.checked,
      status: selectStatus.current.value
    })

    getPessoas()
    setCadastro(0)
  }

  async function getPessoas() {
    let pessoasFromApi = await api.get('/pessoa')

    setPessoas(pessoasFromApi.data)
  }

  async function createPessoas() {

    await api.post('/pessoa', {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      cliente: inputCliente.current.checked,
      fornecedor: inputFornecedor.current.checked,
      ativo: inputAtivo.current.checked,
      status: selectStatus.current.value
    })

    getPessoas()
    setCadastro(0)
  }

  async function deletePessoa(id) {

    await api.delete(`/pessoa/${id}`)

    getPessoas()
    setCadastro(0)
  }

  useEffect(() => {
    getPessoas()
  }, [])

  if (cadastro === 0) {



    return (
      // <>
        <div className="container">
          <div className="titOpcoes">
            <h1>Lista de Pessoas</h1>
            <button className="butOpcoes" onClick={adicionaPessoa}>
              <img src={Plus} />
            </button>
          </div>

          <div id="corpoPessoa" className="corpoPessoa">
            { pessoas.map( pessoa => (
              <div key={pessoa.id} className="card">
                <div>
                  <p>
                    Nome: <span>{ pessoa.nome } &nbsp;&nbsp;</span> E-mail: <span>{ pessoa.email }</span>
                  </p>
                  <p>
                    Cliente: <span>{ pessoa.cliente ? 'Sim' : 'Não' } &nbsp;&nbsp;</span>
                    Fornecedor: <span>{ pessoa.fornecedor ? 'Sim' : 'Não' }  &nbsp;&nbsp;</span>
                    Ativo: <span>{ pessoa.ativo ? 'Sim' : 'Não' }  &nbsp;&nbsp;</span>
                    Status: <span>{ pessoa.status }  &nbsp;&nbsp;</span>
                  </p>
                </div>
                <div className="buttons">
                  <button className="butRow" onClick={() => {
                    telaAlteraPessoa({
                      id: pessoa.id, nome: pessoa.nome, email: pessoa.email, cliente: pessoa.cliente,
                      fornecedor: pessoa.fornecedor, ativo: pessoa.ativo, status: pessoa.status
                    })
                  }}>
                    <img src={Edit} />
                  </button>
                  <button className="butRow" onClick={() => deletePessoa(pessoa.id)}>
                    <img src={Trash} />
                  </button>
                </div>
              </div>
            ) ) }
          </div>
        </div>
      // </>
    )
  } else {

    if (cadastro === 1) {  // Criar nova pessoa

      return (
        <div className="container">
          <form>
            <h1>Cadastrar Pessoa</h1>
            <input placeholder="Nome" name="nome" type="text" ref={inputNome} />
            <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
            <div className="ckBoxes">
              <div className="itemBox">
                <input type="checkbox" id="cbcliente" name="cbcliente" ref={inputCliente} />
                <label for="cbcliente">Cliente</label>
              </div>
              <div className="itemBox">
                <input type="checkbox" id="cbfornecedor" name="cbfornecedor" ref={inputFornecedor} />
                <label for="cbfornecedor">Fornecedor</label>
              </div>
              <div className="itemBox">
                <input type="checkbox" id="cbativo" name="cbativo" ref={inputAtivo} checked />
                <label for="cbativo">Ativo</label>
              </div>
            </div>
            <div className="ckBoxes">
              <select id="cbstatus" name="cbstatus" ref={selectStatus}>
                <option selected value="Liberado">Liberado</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Em Débito">Em Débito</option>
              </select>

            </div>
            <button className="butConfirm" type="button" onClick={createPessoas}>Cadastrar</button>
            <button className="butReturn" type="button" onClick={listarPessoas}>Voltar</button>
          </form>
        </div>
      )
    } else if(cadastro === 2) {    // 2 - Alterar cadastro de pessoa

      const nomeChange = (event) => { setNome(event.target.value) }
      const emailChange = (event) => { setEmail(event.target.value) }
      const clienteChange = (event) => { setCliente(event.target.checked) }
      const fornecedorChange = (event) => { setFornecedor(event.target.checked) }
      const ativoChange = (event) => { setAtivo(event.target.checked) }
      const statusChange = (event) => { setStatus(event.target.value) }

      return (
        <div className="container">
          <form>
            <h1>Alterar Pessoa</h1>
            <input placeholder="Nome" name="nome" type="text"
              value={nome}
              ref={inputNome}
              onChange={nomeChange}
            />
            <input placeholder="E-mail" name="email" type="email"
              value={email}
              ref={inputEmail}
              onChange={emailChange}
            />
            <div className="ckBoxes">
              <div className="itemBox">
                <input type="checkbox" id="cbcliente" name="cbcliente"
                  defaultChecked={cliente}
                  ref={inputCliente}
                  onChange={clienteChange}
                />
                <label for="cbcliente">Cliente</label>
              </div>
              <div className="itemBox">
                <input type="checkbox" id="cbfornecedor" name="cbfornecedor"
                  defaultChecked={fornecedor}
                  ref={inputFornecedor}
                  onChange={fornecedorChange}
                />
                <label for="cbfornecedor">Fornecedor</label>
              </div>
              <div className="itemBox">
                <input type="checkbox" id="cbativo" name="cbativo"
                  defaultChecked={ativo}
                  ref={inputAtivo}
                  onChange={ativoChange}
                />
                <label for="cbativo">Ativo</label>
              </div>
            </div>
            <div className="ckBoxes">
              <select id="cbstatus" name="cbstatus" ref={selectStatus} onChange={statusChange}>
                <option value={status}>{status}</option>
                <option value="Liberado">Liberado</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Em Débito">Em Débito</option>
              </select>

            </div>
            <button className="butConfirm" type="button" onClick={() => alteraPessoa(idPessoa)}>Alterar</button>
            <button className="butReturn" type="button" onClick={listarPessoas}>Voltar</button>
          </form>
        </div>
      )
    }
  }
}

export default Pessoa

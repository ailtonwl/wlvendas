import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trashcan.svg'
import Plus from '../../assets/addcircle.svg'
import Undo from '../../assets/undo.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'

function Unidade() {
  const [unidades, setUnidades] = useState([])
  const [cadastro, setCadastro] = useState(0)

  let [idUnidade, setIdUnidade] = useState(0)
  let [sigla, setSigla] = useState('')
  let [descricao, setDescricao] = useState('')
  let [ativo, setAtivo] = useState(null)

  let inputSigla = useRef()
  let inputDescricao = useRef()
  let inputAtivo = useRef()

  function adicionaUnidade() {
    setCadastro(1)
  }

  function listarUnidades() {
    setCadastro(0)
  }

  function telaAlteraUnidade(unidade) {
    setIdUnidade(unidade.id)
    setSigla(unidade.sigla)
    setDescricao(unidade.descricao)
    setAtivo(unidade.ativo)

    setCadastro(2)
  }

  async function alteraUnidade(unidade) {

    await api.put(`/unidade/${unidade}`, {
      nome: inputSigla.current.value,
      descricao: inputDescricao.current.value,
      ativo: inputAtivo.current.checked,
    })

    getUnidades()
    setCadastro(0)
  }

  async function getUnidades() {
    const unidadesFromApi = await api.get('/unidade')

    setUnidades(unidadesFromApi.data)
  }

  async function createUnidades() {

    await api.post('/unidade', {
      sigla: inputSigla.current.value,
      descricao: inputDescricao.current.value,
      ativo: inputAtivo.current.checked,
    })

    getUnidades()
    setCadastro(0)
  }

  async function deleteUnidade(id) {

    await api.delete(`/unidade/${id}`)

    getUnidades()
    setCadastro(0)
  }

  useEffect(() => {
    getUnidades()
  }, [])

  if (cadastro === 0) {

    return (
      <div className="container">
        <div className="titOpcoes">
          <h1>Lista de Unidades</h1>
          <button className="butOpcoes" onClick={adicionaUnidade}>
            <img src={Plus} />
          </button>
        </div>

        <div id="corpoUnidade" className="corpoUnidade">
          { unidades.map( unidade => (
            <div key={unidade.id} className="card">
              <div>
                <p>
                  Sigla: <span>{ unidade.sigla } &nbsp;&nbsp;</span>
                  Descrição: <span>{ unidade.descricao } &nbsp;&nbsp;</span>
                  Ativo: <span>{ unidade.ativo ? 'Sim' : 'Não' }  &nbsp;&nbsp;</span>
                </p>
              </div>
              <div>
                <button className="butRow" onClick={() => {
                  telaAlteraUnidade({
                    id: unidade.id, sigla: unidade.sigla, descricao: unidade.descricao, ativo: unidade.ativo
                  })
                }}>
                  <img src={Edit} />
                </button>
                <button className="butRow" onClick={() => deleteUnidade(unidade.id)}>
                  <img src={Trash} />
                </button>
              </div>
            </div>
          ) ) }
        </div>
      </div>
    )
  } else {

    if (cadastro === 1) {  // Criar nova unidade

      return (
        <div className="container">
          <form>
            <h1>Cadastrar Unidade</h1>
            <input placeholder="Sigla" name="sigla" type="text" ref={inputSigla} />
            <input placeholder="Descricao" name="descricao" type="text" ref={inputDescricao} />
            <div className="ckBoxes">
              <div className="itemBox">
                <input type="checkbox" id="cbativo" name="cbativo" ref={inputAtivo} checked />
                <label for="cbativo">Ativo</label>
              </div>
            </div>
            <button className="butConfirm" type="button" onClick={createUnidades}>Cadastrar</button>
            <button className="butReturn" type="button" onClick={listarUnidades}>Voltar</button>
          </form>
        </div>
      )
    } else if(cadastro === 2) {    // 2 - Alterar cadastro de unidade

      const siglaChange = (event) => { setSigla(event.target.value) }
      const descricaoChange = (event) => { setDescricao(event.target.value) }
      const ativoChange = (event) => { setAtivo(event.target.checked) }

      return (
        <div className="container">
          <form>
            <h1>Alterar Unidade</h1>
            <input placeholder="Sigla" name="sigla" type="text"
              value={sigla}
              ref={inputSigla}
              onChange={siglaChange}
            />
            <input placeholder="Descrição" name="descricao" type="text"
              value={descricao}
              ref={inputDescricao}
              onChange={descricaoChange}
            />
            <div className="ckBoxes">
              <div className="itemBox">
                <input type="checkbox" id="cbativo" name="cbativo"
                  defaultChecked={ativo}
                  ref={inputAtivo}
                  onChange={ativoChange}
                />
                <label for="cbativo">Ativo</label>
              </div>
            </div>
            <button className="butConfirm" type="button" onClick={() => alteraUnidade(idUnidade)}>Alterar</button>
            <button className="butReturn" type="button" onClick={listarUnidades}>Voltar</button>
          </form>
        </div>
      )
    }
  }
}

export default Unidade

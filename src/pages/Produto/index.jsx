import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trashcan.svg'
import Plus from '../../assets/addcircle.svg'
import Undo from '../../assets/undo.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'

function Produto() {
  const [produtos, setProdutos] = useState([])
  const [cadastro, setCadastro] = useState(0)

  let [idProduto, setIdProduto] = useState(0)
  let [unidId, setUnidId] = useState(0)
  let [descricao, setDescricao] = useState('')
  let [vrCusto, setVrCusto] = useState(0)
  let [vrVenda, setVrVenda] = useState(0)
  let [custoMedio, setCustoMedio] = useState(0)
  let [estoque, setEstoque] = useState(0)
  let [ativo, setAtivo] = useState(null)

  let inputUnidade = useRef()
  let inputDescricao = useRef()
  let inputVrCusto = useRef()
  let inputVrVenda = useRef()
  let inputCustoMedio = useRef()
  let inputEstoque = useRef()
  let inputAtivo = useRef()
  // let selectStatus = useRef()

  function adicionaProduto() {
    setCadastro(1)
  }

  function listarProdutos() {
    setCadastro(0)
  }

  function telaAlteraProduto(produto) {
    setIdProduto(produto.id)
    setUnidId(produto.unid_id)
    setDescricao(produto.descricao)
    setVrCusto(produto.vrcusto)
    setVrVenda(produto.vrvenda)
    setCustoMedio(produto.customedio)
    setEstoque(produto.estoque)
    setAtivo(produto.ativo)

    console.log('Tela: ', produto)

    console.log(descricao, unidId, vrCusto, vrVenda, custoMedio, estoque, ativo)

    setCadastro(2)
  }

  async function alteraProduto(produto) {

    await api.put(`/produto/${produto}`, {
      unid_id: inputUnidade.current.value,
      descricao: inputDescricao.current.value,
      vrcusto: inputVrCusto.current.value,
      vrvenda: inputVrVenda.current.value,
      customedio: inputCustoMedio.current.value,
      estoque: inputEstoque.current.value,
      ativo: inputAtivo.current.checked,
    })

    getProdutos()
    setCadastro(0)
  }

  async function getProdutos() {
    const produtosFromApi = await api.get('/produto')

    setProdutos(produtosFromApi.data)
  }

  async function createProdutos() {

    await api.post('/produto', {
      unid_id: inputUnidade.current.value,
      descricao: inputDescricao.current.value,
      vrcusto: inputVrCusto.current.value,
      vrvenda: inputVrVenda.current.value,
      customedio: inputCustoMedio.current.checked,
      estoque: inputEstoque.current.checked,
      ativo: inputAtivo.current.checked,
    })

    getProdutos()
    setCadastro(0)
  }

  async function deleteProduto(id) {

    await api.delete(`/produto/${id}`)

    getProdutos()
    setCadastro(0)
  }

  useEffect(() => {
    getProdutos()
  }, [])

  if (cadastro === 0) {



    return (
      <div className="container">
        <div className="titOpcoes">
          <h1>Lista de Produtos</h1>
          <button className="butOpcoes" onClick={adicionaProduto}>
            <img src={Plus} />
          </button>
        </div>

        <div id="corpoProduto" className="corpoProduto">
          { produtos.map( produto => (
            <div key={produto.id} className="card">
              <div>
                <p>
                  Descricao: <span>{ produto.descricao } &nbsp;&nbsp;</span>
                  Unidade: <span>{ produto.unid_id } &nbsp;&nbsp;</span>
                  Custo R$: <span>{ produto.vrcusto } &nbsp;&nbsp;</span>
                  Venda R$: <span>{ produto.vrvenda } &nbsp;&nbsp;</span>
                  Custo Médio: <span>{ produto.customedio } &nbsp;&nbsp;</span>
                  Estoque: <span>{ produto.estoque } &nbsp;&nbsp;</span>
                  Ativo: <span>{ produto.ativo ? 'Sim' : 'Não' }  &nbsp;&nbsp;</span>
                </p>
              </div>
              <div className="buttons">
                <button className="butRow" onClick={() => {
                  // telaAlteraProduto(produto)
                  telaAlteraProduto({
                    id: produto.id, unid_id: produto.unid_id, descricao: produto.descricao, vrcusto: produto.vrcusto,
                    vrvenda: produto.vrvenda, customedio: produto.customedio, estoque: produto.estoque, ativo: produto.ativo
                  })
                }}>
                  <img src={Edit} />
                </button>
                <button className="butRow" onClick={() => deleteProduto(produto.id)}>
                  <img src={Trash} />
                </button>
              </div>
            </div>
          ) ) }
        </div>
      </div>
    )
  } else {

    if (cadastro === 1) {  // Criar nova produto

      return (
        <div className="container">
          <form>
            <h1>Cadastrar Produto</h1>
            <input placeholder="Descricao" name="descricao" type="text" ref={inputDescricao} />
            <input placeholder="Unidade" name="unid_id" type="text" ref={inputUnidade} />
            <input placeholder="Custo R$" name="vrcusto" type="text" ref={inputVrCusto} />
            <input placeholder="Venda R$" name="vrvenda" type="text" ref={inputVrVenda} />
            <input placeholder="Qtde. Estoque" name="estoque" type="text" ref={inputEstoque} />
            <div className="ckBoxes">
              <div className="itemBox">
                <input type="checkbox" id="cbativo" name="cbativo" ref={inputAtivo} checked />
                <label for="cbativo">Ativo</label>
              </div>
            </div>
            {/* <div className="ckBoxes">
              <select id="cbstatus" name="cbstatus" ref={selectStatus}>
                <option selected value="Liberado">Liberado</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Em Débito">Em Débito</option>
              </select>

            </div> */}
            <button className="butConfirm" type="button" onClick={createProdutos}>Cadastrar</button>
            <button className="butReturn" type="button" onClick={listarProdutos}>Voltar</button>
          </form>
        </div>
      )
    } else if(cadastro === 2) {    // 2 - Alterar cadastro de produto

      const descricaoChange = (event) => { setDescricao(event.target.value) }
      const unidIdChange = (event) => { setUnidId(event.target.value) }
      const vrCustoChange = (event) => { setVrCusto(event.target.value) }
      const vrVendaChange = (event) => { setVrVenda(event.target.value) }
      const custoMedioChange = (event) => { setCustoMedio(event.target.value) }
      const estoqueChange = (event) => { setEstoque(event.target.value) }
      const ativoChange = (event) => { setAtivo(event.target.checked) }

      return (
        <div className="container">
          <form>
            <h1 className="tit-form">Alterar Produto</h1>
            <label htmlFor="descricao">Descrição do Produto</label>
            <input placeholder="Descricao" name="descricao" type="text"
              value={descricao}
              ref={inputDescricao}
              onChange={descricaoChange}
            />
            <label htmlFor="unidade">Unidade</label>
            <input placeholder="Unidade" name="unid_id" type="text"
              value={unidId}
              ref={inputUnidade}
              onChange={unidIdChange}
            />
            <label htmlFor="vrcusto">Preço de Custo</label>
            <input placeholder="Custo R$" name="vrcusto" type="text"
              value={vrCusto}
              ref={inputVrCusto}
              onChange={vrCustoChange}
            />
            <label htmlFor="vrvenda">Preço de Venda</label>
            <input placeholder="Venda R$" name="vrvenda" type="text"
              value={vrVenda}
              ref={inputVrVenda}
              onChange={vrVendaChange}
            />
            <label htmlFor="customedio">Custo Médio</label>
            <input placeholder="Custo Medio R$" name="customedio" type="text"
              value={custoMedio}
              ref={inputCustoMedio}
              onChange={custoMedioChange}
            />
            <label htmlFor="estoque">Quantidade em Estoque</label>
            <input placeholder="Estoque" name="estoque" type="text"
              value={estoque}
              ref={inputEstoque}
              onChange={estoqueChange}
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
            {/* <div className="ckBoxes">
              <select id="cbstatus" name="cbstatus" ref={selectStatus} onChange={statusChange}>
                <option value={status}>{status}</option>
                <option value="Liberado">Liberado</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Em Débito">Em Débito</option>
              </select>

            </div> */}
            <button className="butConfirm" type="button" onClick={() => alteraProduto(idProduto)}>Alterar</button>
            <button className="butReturn" type="button" onClick={listarProdutos}>Voltar</button>
          </form>
        </div>
      )
    }
  }
}

export default Produto

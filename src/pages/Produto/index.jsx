import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trashcan.svg'
import Plus from '../../assets/addcircle.svg'
import Undo from '../../assets/undo.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'

function Produto() {
  const [produtos, setProdutos] = useState([])
  const [unidades, setUnidades] = useState([])
  const [cadastro, setCadastro] = useState(0)

  let [idProduto, setIdProduto] = useState(0)
  let [unidId, setUnidId] = useState(0)
  let [descUnidade, setDescUnidade] = useState("")
  let [descricao, setDescricao] = useState('')
  let [vrCusto, setVrCusto] = useState(0)
  let [vrVenda, setVrVenda] = useState("")
  let [custoMedio, setCustoMedio] = useState(0)
  let [estoque, setEstoque] = useState(0)
  let [ativo, setAtivo] = useState(null)

  // let inputUnidade = useRef()
  let inputDescricao = useRef()
  let inputVrCusto = useRef()
  let inputVrVenda = useRef()
  let inputCustoMedio = useRef()
  let inputEstoque = useRef()
  let inputAtivo = useRef()
  let selectUnidade = useRef()

  function adicionaProduto() {
    setCadastro(1)
  }

  function listarProdutos() {
    setCadastro(0)
  }

  function telaAlteraProduto(produto) {

    // getUnidades()

    let registroEncontrado = unidades.find(reg_unidade => reg_unidade.id === produto.unid_id);

    setIdProduto(produto.id)
    setUnidId(produto.unid_id)
    setDescUnidade(registroEncontrado.descricao)
    setDescricao(produto.descricao)
    setVrCusto( defineVrAlterarBr(produto.vrcusto) )
    setVrVenda( defineVrAlterarBr(produto.vrvenda) )
    setCustoMedio(produto.customedio)
    setEstoque(produto.estoque)
    setAtivo(produto.ativo)

    setCadastro(2)
  }

  async function alteraProduto(produto) {

    let venda = inputVrVenda.current.value
    let pVenda = venda.replace(",", ".")

    await api.put(`/produto/${produto}`, {
      unid_id: unidId,
      descricao: inputDescricao.current.value,
      vrcusto: inputVrCusto.current.value,
      vrvenda: parseFloat(pVenda),
      customedio: inputCustoMedio.current.value,
      estoque: inputEstoque.current.value,
      ativo: inputAtivo.current.checked,
    })

    getProdutos()
    setCadastro(0)
  }

  async function getProdutos() {
    let produtosFromApi = await api.get('/produto')
    let unidadesFromApi = await api.get('/unidade')

    setProdutos(produtosFromApi.data)
    setUnidades(unidadesFromApi.data)
  }

  // async function getUnidades() {
  //   let unidadesFromApi = await api.get('/unidade')

  //   setUnidades(unidadesFromApi.data)
  // }


  async function createProdutos() {

    await api.post('/produto', {
      unid_id: unidId,
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
    // getUnidades()
  }, [])

  function defineVrAlterarBr(valor) {

    let nVr = ""
    let intVr = parseInt(valor * 100)
    let vr = intVr.toString()
    let tamanho = vr.length

    if (intVr === 0) {
      nVr = '0,00'
    } else if (tamanho === 1) {
      nVr = '0,0' + vr
    } else if (tamanho === 2) {
      nVr = '0,' + vr
    } else if (tamanho === 3) {
      nVr = vr.substr(0,1) + ',' + vr.substr(1,2)
    } else if (tamanho === 4) {
      nVr = vr.substr(0,2) + ',' + vr.substr(2,2)
    } else if (tamanho === 5) {
      nVr = vr.substr(0,3) + ',' + vr.substr(3,2)
    } else if (tamanho === 6) {
      nVr = vr.substr(0,4) + ',' + vr.substr(4,2)
    } else if (tamanho === 7) {
      nVr = vr.substr(0,5) + ',' + vr.substr(5,2)
    } else if (tamanho === 8) {
      nVr = vr.substr(0,6) + ',' + vr.substr(6,2)
    } else if (tamanho === 9) {
      nVr = vr.substr(0,7) + ',' + vr.substr(7,2)
    } else if (tamanho === 10) {
      nVr = vr.substr(0,8) + ',' + vr.substr(8,2)
    }

    return nVr
  }

  function defineVrBr(valor) {
    let vr = valor;
    let nVr = ""
    let tamanho = 0
    let intVr = 0

    vr = vr.replace(",", ""); // Remove a vírgula
    intVr = parseInt(vr)
    vr = intVr.toString()
    tamanho = vr.length

    if (intVr === 0) {
      nVr = '0,00'
    } else if (tamanho === 1) {
      nVr = '0,0' + vr
    } else if (tamanho === 2) {
      nVr = '0,' + vr
    } else if (tamanho === 3) {
      nVr = vr.substr(0,1) + ',' + vr.substr(1,2)
    } else if (tamanho === 4) {
      nVr = vr.substr(0,2) + ',' + vr.substr(2,2)
    } else if (tamanho === 5) {
      nVr = vr.substr(0,3) + ',' + vr.substr(3,2)
    } else if (tamanho === 6) {
      nVr = vr.substr(0,4) + ',' + vr.substr(4,2)
    } else if (tamanho === 7) {
      nVr = vr.substr(0,5) + ',' + vr.substr(5,2)
    } else if (tamanho === 8) {
      nVr = vr.substr(0,6) + ',' + vr.substr(6,2)
    } else if (tamanho === 9) {
      nVr = vr.substr(0,7) + ',' + vr.substr(7,2)
    } else if (tamanho === 10) {
      nVr = vr.substr(0,8) + ',' + vr.substr(8,2)
    }
    return nVr
  }

  function mostraDescricaoUnidade(idUnidade) {
    let registroEncontrado = unidades.find(reg_unidade => reg_unidade.id === idUnidade);
    return registroEncontrado.descricao
  }

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
                  Unidade: <span>{ mostraDescricaoUnidade(produto.unid_id) } &nbsp;&nbsp;</span>
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
  } else if (cadastro === 1) {  // Criar nova produto

    return (
      <>
      <div className="container">
        <form>
          <h1>Cadastrar Produto</h1>
          <label htmlFor="descricao">Descrição do Produto</label>
          <input placeholder="Descricao" name="descricao" type="text" ref={inputDescricao} />
          <label htmlFor="dbunidade">Unidade</label>
          <div className="ckBoxes">
            <select id="cbunidade" name="cbunidade" ref={selectUnidade}>
              { unidades.map( unidade => (
                  <option value={unidade.id}>{unidade.descricao}</option>
                ) )
              }
            </select>
          </div>
          <label htmlFor="vrcusto">Preço de Custo</label>
          <input placeholder="Custo R$" name="vrcusto" type="text" ref={inputVrCusto} />
          <label htmlFor="vrvenda">Preço de Venda</label>
          <input placeholder="Venda R$" name="vrvenda" type="text" ref={inputVrVenda} />
          <label htmlFor="estoque">Quantidade em Estoque</label>
          <input placeholder="Qtde. Estoque" name="estoque" type="text" ref={inputEstoque} />
          <div className="ckBoxes">
            <div className="itemBox">
              <input type="checkbox" id="cbativo" name="cbativo" ref={inputAtivo} checked />
              <label for="cbativo">Ativo</label>
            </div>
          </div>
          <button className="butConfirm" type="button" onClick={createProdutos}>Cadastrar</button>
          <button className="butReturn" type="button" onClick={listarProdutos}>Voltar</button>
        </form>
      </div>
      </>
    )
  } else if(cadastro === 2) {    // 2 - Alterar cadastro de produto

    const descricaoChange = (event) => { setDescricao(event.target.value) }
    const vrCustoChange = (event) => { setVrCusto( defineVrBr(event.target.value)) }
    const vrVendaChange = (event) => { setVrVenda( defineVrBr(event.target.value)) }
    const custoMedioChange = (event) => { setCustoMedio(event.target.value) }
    const estoqueChange = (event) => { setEstoque(event.target.value) }
    const ativoChange = (event) => { setAtivo(event.target.checked) }
    const unidadeChange = (event) => { setUnidId(event.target.value) }

    return (
      <>
        <div className="container">
          <form>
            <h1 className="tit-form">Alterar Produto</h1>
            <label htmlFor="descricao">Descrição do Produto</label>
            <input placeholder="Descricao" name="descricao" type="text"
              value={descricao}
              ref={inputDescricao}
              onChange={descricaoChange}
            />
            <label htmlFor="dbunidade">Unidade</label>
            <div className="ckBoxes">
              <select id="cbunidade" name="cbunidade" ref={selectUnidade} onChange={unidadeChange}>
                { unidades.map( unid => (
                    <option value={unid.id} selected={unid.descricao===descUnidade ? true : false}>{unid.descricao}</option>
                  ))
                }
              </select>
            </div>
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
              readOnly
            />
            <label htmlFor="estoque">Quantidade em Estoque</label>
            <input placeholder="Estoque" name="estoque" type="text"
              value={estoque}
              ref={inputEstoque}
              onChange={estoqueChange}
              readOnly
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

            <button className="butConfirm" type="button" onClick={() => alteraProduto(idProduto)}>Alterar</button>
            <button className="butReturn" type="button" onClick={listarProdutos}>Voltar</button>
          </form>
        </div>
      </>
    )
  }
}

export default Produto

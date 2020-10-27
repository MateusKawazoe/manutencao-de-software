import React, { useState, useEffect } from 'react'
import '../styles/product.css'
import $ from 'jquery'
import { Table } from 'reactstrap'
import api from '../services/api'
import Swal from 'sweetalert2'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteIcon from '@material-ui/icons/Delete'
import { formatarData } from '../common/dateFormat'

export default function Produto() {
    const [editar, setEditar] = useState(true)
    const [Produto, setProduto] = useState('')
    const [Quantidade, setQuantidade] = useState('')
    const [Valor, setValor] = useState('')
    const [Fornecedor, setFornecedor] = useState('')
    const [Dia, setDia] = useState('')
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])
    const [table, setTable] = useState('Tabela de Compras')
    const [cadastrar, setCadastrar] = useState('Cadastrar')
    const numberMask = new RegExp('^[0-9]*$')

    function handleDelete() {
        if(!(Produto !== '' && Fornecedor !== '' && Dia !== '' && $.isNumeric(Quantidade) && $.isNumeric(Valor))) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Compra não existe!',
                showConfirmButton: false,
                timer: 1000
            })
            return
        }

        Swal.fire({
            title: 'Deseja realmente deletar esta compra?',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
            denyButtonColor: 'red'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
                return
            } else {
                const exists = await api.post('/product/showByDistributor', {
                    nome: Produto,
                    fornecedor: Fornecedor
                })

                const aux = await api.post('/buy/delete', {
                    produto_id: exists.data._id,
                    quantidade: Quantidade,
                    valor: Valor,
                    data: Dia
                })

                if(!exists) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Produto não existe!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    return
                }

                if(aux.data == 2) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Compra excluída com sucesso!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    dataGen()
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Produto não existe!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                }
            }
        })
        dataGen()
    }

    async function handleSelect(data) {
        if(editar) {
            const clicked = await api.post('/product/showByDistributor', {
                nome: data.produto,
                fornecedor: data.fornecedor
            })
    
            const buys = await api.post('/buy/showOne', {
                produto_id: clicked.data._id,
                quantidade: data.quantidade,
                valor: data.valor,
                data: data.data
            })
    
            if(buys.data !== 1) {
                setProduto(clicked.data.nome)
                setQuantidade(buys.data.quantidade)
                setFornecedor(clicked.data.fornecedor.nome)
                setValor(buys.data.valor)
                setDia(buys.data.data)
            } else {
                dataGen()
            }
            return
        } else {
            const clicked = await api.post('/product/showByDistributor', {
                nome: data.produto,
                fornecedor: data.fornecedor
            })
    
            if(clicked.data !== 1) {
                setProduto(clicked.data.nome)
                setQuantidade(0)
                setFornecedor(clicked.data.fornecedor.nome)
                setDia(new Date())
            } else {
                dataGen()
            }
            return
        } 
    }

    async function dataGen() {
        const buys = await api.get('/buy/showAll')
        const aux = []
        setColumns(['Produto', 'Fornecedor', 'Quantidade', 'Valor (R$)', 'Data'])
        let i = 0

        while(buys.data[i]) {
            const product = await api.post('product/showById', {
                _id: buys.data[i].produto_id
            })

            if(product.data == 1) {
                return
            }
            
            let element = {
                produto: product.data.nome,
                fornecedor: product.data.fornecedor.nome,
                quantidade: buys.data[i].quantidade,
                data: buys.data[i].data,
                valor: buys.data[i].valor
            }
            aux.push(element)
            i++
        }
        setData(aux)
    }

    async function dataGenProduct() {
        const products = await api.get('/product/showAll')
        const aux = []
        let i = 0
        setColumns(['Produto', 'Fornecedor', 'Quantidade'])

        while(products.data[i]) {
            let element = {
                produto: products.data[i].nome,
                fornecedor: products.data[i].fornecedor.nome,
                quantidade: products.data[i].quantidade
            }
            aux.push(element)
            i++
        }
        setData(aux)
    }

    function handleSignUp() {
        if(!editar) {
            Swal.fire({
                title: 'Deseja finalizar o cadastro?',
                icon: 'warning',
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonColor: 'green',
                confirmButtonText: `Confirmar`,
                denyButtonText: `Cancelar`,
                denyButtonColor: 'red'
            }).then(async (result) => {
                if (result.isDenied) {
                    setTable('Tabela de Compras')
                    setCadastrar('Cadastrar')
                    setDia('')
                    setColumns([])
                    setData([])
                    dataGen()
                    setEditar(true)
                    return
                } else {

                    if($.isNumeric(Quantidade) && $.isNumeric(Valor) && Produto !== '' && Fornecedor !== '') {
                        const exists = await api.post('/product/showByDistributor', {
                            nome: Produto,
                            fornecedor: Fornecedor
                        })

                        const aux = await api.post('buy/store', {
                            produto_id: exists.data._id,
                            quantidade: Quantidade,
                            valor: Valor
                        })

                        console.log(aux)

                        if(aux.data == 2 && exists) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Compra Efetuada!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                            dataGen()
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Produto não existe!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                        }
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Todos os campos são obrigatórios!',
                            showConfirmButton: false,
                            timer: 1200
                        })
                    } 
                    setTable('Tabela de Compras')
                    setCadastrar('Cadastrar')
                    setColumns([])
                    setData([])
                    dataGen()
                    setEditar(true)
                    return
                }
            })
        } else {
            setProduto('')
            setQuantidade('')
            setFornecedor('')
            setValor('')
            setDia(new Date())
            setTable('Tabela de Produtos')
            setCadastrar('Salvar')
            setColumns([])
            setData([])
            dataGenProduct()
            setEditar(false)
        }
        return
    }  

    useEffect(() => {
        if(editar) {
            $('#modify').text('Editar') 
        } else {
            $('#modify').text('Salvar')
        }
    }, [editar])

    useEffect(() => {
        dataGen()  
    }, [])

    return (
        <div className="function-container">
            <ol className="buttons">
                <li onClick={handleSignUp}>
                    <AddBoxIcon className="icon" id="cadastrar"/>
                    <p>{cadastrar}</p>
                </li>
                <li onClick={handleDelete}>
                    <DeleteIcon className="icon" id="deletar"/>
                    <p>Deletar</p>
                </li>
            </ol>
            <ol className="form-table">
                <li className="forms">
                    <form>
                        <h1>Informações</h1>
                        <ol className="produto">
                            <p>Compra:</p>
                            <li className="descricao">
                                <div className="nome">
                                    <p>Valor (R$):</p>
                                    <input
                                        disabled={editar}
                                        value={Valor}
                                        onChange={(e) => {
                                            if(numberMask.test(e.target.value))
                                                setValor(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="nome">
                                    <p>Quantidade:</p>
                                    <input
                                        disabled={editar}
                                        value={Quantidade}
                                        onChange={(e) => {
                                            if(numberMask.test(e.target.value))
                                                setQuantidade(e.target.value)
                                        }}
                                    />
                                </div>
                            </li>
                            <li className="preco">
                                <div className="nome">
                                    <p>Data:</p>
                                    <input
                                        disabled={true}
                                        value={Dia ? (formatarData(Dia)) : ('')}
                                        onChange={(e) => {
                                            setDia(e.target.value)
                                        }}
                                    />
                                </div>
                            </li>
                        </ol>
                        <ol className="fornecedor">
                        <p>Produto:</p>
                            <li className="dados">
                                <div className="nome">
                                    <p>Nome:</p>
                                    <input
                                        disabled={editar}
                                        value={Produto}
                                        onChange={(e) => {
                                            setProduto(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="nome">
                                    <p>Fornecedor:</p>
                                    <input
                                        value={Fornecedor}
                                        disabled={editar}
                                        onChange={(e) => {
                                            setFornecedor(e.target.value)
                                        }}
                                    />
                                </div>
                            </li>
                        </ol> 
                    </form>
                </li>
                <li className="table">
                    <h1>{table}</h1>
                    <div className="aux">
                        {data.length > 0 && (
                            <Table
                                bordered
                                dark
                                striped
                            >
                                <thead>
                                    <tr className="coluna">
                                        {columns.map(coluna => {
                                            return (
                                                <th key={coluna}>{coluna}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(data => {
                                        return (
                                            <tr key={data.produto} onClick={() => {
                                                handleSelect(data)
                                            }}>
                                                <td>{data.produto}</td>
                                                <td>{data.fornecedor}</td>
                                                <td>{data.quantidade}</td>
                                                <td>{data.valor}</td>
                                                {editar ? (
                                                    <td>{formatarData(data.data)}</td>
                                                ) : (
                                                    <></>
                                                )}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        )}
                    </div> 
                </li>
            </ol>
        </div>
    )
}
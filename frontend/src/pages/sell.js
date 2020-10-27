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
    const [Cliente, setCliente] = useState('')
    const [Dia, setDia] = useState('')
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])
    const [table, setTable] = useState('Tabela de Venda')
    const [cadastrar, setCadastrar] = useState('Cadastrar')
    const numberMask = new RegExp('^[0-9]*$')

    function handleDelete() {
        if(!(Produto !== '' && Cliente !== '' && Dia !== '' && $.isNumeric(Quantidade) && $.isNumeric(Valor))) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Venda não cadastrada!',
                showConfirmButton: false,
                timer: 1000
            })
            return
        }

        Swal.fire({
            title: 'Deseja realmente deletar esta venda?',
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
                const aux = await api.post('/sell/delete', {
                    produto: Produto,
                    cliente: Cliente,
                    quantidade: Quantidade,
                    valor: Valor,
                    data: Dia
                })

                console.log(aux)

                if(aux.data == 2) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Venda excluída com sucesso!',
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
            if(data !== null) {
                setProduto(data.produto)
                setQuantidade(data.quantidade)
                setCliente(data.cliente)
                setValor(data.valor)
                setDia(data.data)
            } else {
                dataGen()
            }
           return 
        } else {
            if(data.produto !== '') {
                setProduto(data.produto)
                setQuantidade(0)
                setDia(new Date())
            } else {
                dataGen()
            }
            return
        }
        
    }

    async function dataGen() {
        const sells = await api.get('/sell/showAll')
        setColumns(['Produto', 'Cliente', 'Quantidade', 'Valor', 'Data'])
        const aux = []
        let i = 0

        while(sells.data[i]) {
            const product = await api.post('product/showOneByName', {
                nome: '' + sells.data[i].produto
            })

            if(product.data == 1) {
                return
            }
            
            let element = {
                produto: product.data.nome,
                cliente: sells.data[i].cliente,
                quantidade: sells.data[i].quantidade,
                data: sells.data[i].data,
                valor: sells.data[i].valor
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
            console.log(products.data[i].fornecedor)
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
                title: 'Deseja finalizar a venda?',
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
                    setTable('Tabela de Venda')
                    setCadastrar('Cadastrar')
                    setDia('')
                    setColumns([])
                    setData([])
                    dataGen()
                    setEditar(true)
                    return
                } else {
                    if($.isNumeric(Quantidade) && $.isNumeric(Valor) && Produto !== '' && Cliente !== '') {
                        const exists = await api.post('/product/showOneByName', {
                            nome: '' + Produto
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
                        console.log(Cliente)
                        const aux = await api.post('sell/store', {
                            produto: Produto,
                            cliente: Cliente,
                            quantidade: Quantidade,
                            valor: Valor,
                            data: new Date()
                        })

                        console.log(aux)

                        if(aux.data == 2) {
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
                                title: 'Quantidade do produto não é o suficiente!',
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
                    setTable('Tabela de Vendas')
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
                                    <p>Valor:</p>
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
                                        value={Dia ? (formatarData(Dia)):('')}
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
                                    <p>Cliente:</p>
                                    <input
                                        value={Cliente}
                                        disabled={editar}
                                        onChange={(e) => {
                                            setCliente(e.target.value)
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
                                                <td>{editar ? data.cliente : data.fornecedor}</td>
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
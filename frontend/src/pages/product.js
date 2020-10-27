import React, { useState, useEffect } from 'react'
import '../styles/product.css'
import $ from 'jquery'
import { Table } from 'reactstrap'
import api from '../services/api'
import Swal from 'sweetalert2'
import AddBoxIcon from '@material-ui/icons/AddBox'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'
import { validarCNPJ, ValidarCNPJ } from '../common/validator'

export default function Produto() {
    const [editar, setEditar] = useState(true)
    const [Nome, setNome] = useState('')
    const [NovoNome, setNovoNome] = useState('')
    const [Quantidade, setQuantidade] = useState('')
    const [Compra, setCompra] = useState('')
    const [Venda, setVenda] = useState('')
    const [Fornecedor, setFornecedor] = useState('')
    const [CNPJ, setCNPJ] = useState('')
    const [data, setData] = useState([])
    const [columns] = useState([
        'Produto', 'Fornecedor', 'CNPJ' 
    ])
    const numberMask = new RegExp('^[0-9]*$')

    function handleDelete() {
        if(!(Nome !== '' && Fornecedor !== '' && CNPJ !== '')) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Produto não existe!',
                showConfirmButton: false,
                timer: 1000
            })
            return
        }

        Swal.fire({
            title: 'Deseja realmente deletar este produto?',
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
                const aux = await api.post('/product/delete', {
                    nome: Nome,
                    fornecedor: {
                        nome: Fornecedor,
                        CNPJ: CNPJ
                    }
                })

                if(aux.data == 2) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Produto deletado com sucesso!',
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
        const clicked = await api.post('/product/showOne', {
            'nome': data.produto,
            'fornecedor': {
                'nome': data.fornecedor,
                'CNPJ': data.CNPJ
            }
        })

        if(clicked.data !== 1) {
            setNome(clicked.data.nome)
            setNovoNome(clicked.data.nome)
            setQuantidade(clicked.data.quantidade)
            setCompra(clicked.data.precoCompra)
            setVenda(clicked.data.precoVenda)
            setFornecedor(clicked.data.fornecedor.nome)
            setCNPJ(clicked.data.fornecedor.CNPJ)
        } else {
            dataGen()
        }
       return 
    }

    async function dataGen() {
        const products = await api.get('/product/showAll')
        const aux = []
        let i = 0

        while(products.data[i]) {
            let element = {
                produto: products.data[i].nome,
                fornecedor: products.data[i].fornecedor.nome,
                CNPJ: products.data[i].fornecedor.CNPJ
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
                /* Read more about isConfirmed, isDenied below */
                if (result.isDenied) {
                    return
                } else {
                    if(!validarCNPJ(CNPJ)) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'CNPJ inválido',
                            showConfirmButton: false,
                            timer: 1000
                        }) 
                        return
                    }

                    if($.isNumeric(Quantidade) && $.isNumeric(Venda) && $.isNumeric(Compra) && NovoNome !== '' && Fornecedor !== '') {
                        const aux = await api.post('product/store', {
                            nome: NovoNome,
                            fornecedor: {
                                nome: Fornecedor,
                                CNPJ: CNPJ
                            },
                            quantidade: Quantidade,
                            precoCompra: Compra,
                            precoVenda: Venda
                        })

                        if(aux.data == 2) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Produto cadastrado com sucesso!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                            dataGen()
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Produto já cadastrado!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                        }
                    }
                }
            })
            dataGen()
        }
        setEditar(!editar)
        return
    }

    function handleModify() {
        setEditar(!editar)
        if(!editar) {
            Swal.fire({
                title: 'Tem certeza que deseja salvar os dados?',
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
                  if($.isNumeric(Quantidade) && $.isNumeric(Venda) && $.isNumeric(Compra)) {
                      const aux = await api.put('product/update', {
                          nome: Nome,
                          novoNome: NovoNome,
                          fornecedor: {
                              nome: Fornecedor,
                              CNPJ: CNPJ
                          },
                          quantidade: Quantidade,
                          precoCompra: Compra,
                          precoVenda: Venda
                      })

                      if(aux.data == 2) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Produto atualizado!',
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
                }
            })
        }
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
                    <p>Cadastrar</p>
                </li>
                <li onClick={handleModify}>
                    <UpdateIcon className="icon" id="modificar"/>
                    <p id="modify">Editar</p>
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
                            <p>Produto:</p>
                            <li className="descricao">
                                <div className="nome">
                                    <p>Nome:</p>
                                    <input
                                        disabled={editar}
                                        value={NovoNome}
                                        onChange={(e) => {
                                            setNovoNome(e.target.value)
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
                                    <p>Preço de Compra:</p>
                                    <input
                                        disabled={editar}
                                        value={Compra}
                                        onChange={(e) => {
                                            if(numberMask.test(e.target.value))
                                                setCompra(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="nome">
                                    <p>Preço de Venda:</p>
                                    <input
                                        disabled={editar}
                                        value={Venda}
                                        onChange={(e) => {
                                            if(numberMask.test(e.target.value))
                                                setVenda(e.target.value)
                                        }}
                                    />
                                </div>
                            </li>
                        </ol>
                        <ol className="fornecedor">
                        <p>Fornecedor:</p>
                            <li className="dados">
                                <div className="nome">
                                    <p>Nome:</p>
                                    <input
                                        disabled={editar}
                                        value={Fornecedor}
                                        onChange={(e) => {
                                            setFornecedor(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="nome">
                                    <p>CNPJ:</p>
                                    <input
                                        value={CNPJ}
                                        disabled={editar}
                                        onChange={(e) => {
                                            if(numberMask.test(e.target.value))
                                                setCNPJ(e.target.value)
                                        }}
                                    />
                                </div>
                            </li>
                        </ol> 
                    </form>
                </li>
                <li className="table">
                    <h1>Tabela</h1>
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
                                            <tr key={data.CNPJ} onClick={() => {
                                                handleSelect(data)
                                            }}>
                                                <td>{data.produto}</td>
                                                <td>{data.fornecedor}</td>
                                                <td>{data.CNPJ}</td>
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
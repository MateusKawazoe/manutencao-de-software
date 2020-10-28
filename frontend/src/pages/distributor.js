import React, { useState, useEffect } from 'react'
import '../styles/product.css'
import $ from 'jquery'
import { Table } from 'reactstrap'
import api from '../services/api'
import Swal from 'sweetalert2'
import AddBoxIcon from '@material-ui/icons/AddBox'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'
import { validarCNPJ } from '../common/validator'
import InputMask from 'react-input-mask'

export default function Fornecedor() {
    const [editar, setEditar] = useState(true)
    const [Nome, setNome] = useState('')
    const [CNPJ, setCNPJ] = useState('')
    const [data, setData] = useState([])
    const [columns] = useState([
        'Nome', 'CNPJ'
    ])
    const numberMask = new RegExp('^[0-9]*$')

    function handleDelete() {
        if(!(Nome !== '' && CNPJ !== '')) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Fornecedor não existe!',
                showConfirmButton: false,
                timer: 1000
            })
            return
        }

        Swal.fire({
            title: 'Deseja realmente deletar este Fornecedor?',
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
                const aux = await api.post('/distributor/delete', {
                    nome: Nome,
                    CNPJ: CNPJ
                })

                if(aux.data == 2) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Fornecedor deletado com sucesso!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    dataGen()
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Fornecedor não existe!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                }
            }
        })
        dataGen()
    }

    async function handleSelect(data) {
        const clicked = await api.post('/distributor/showOne', {
            CNPJ: data.CNPJ
        })

        if(clicked.data !== 1) {
            setNome(clicked.data.nome)
            setCNPJ(clicked.data.CNPJ)
        } else {
            dataGen()
        }
       return 
    }

    async function dataGen() {
        const distributor = await api.get('/distributor/showAll')
        const aux = []
        let i = 0

        while(distributor.data[i]) {
            let element = {
                nome: distributor.data[i].nome,
                CNPJ: distributor.data[i].CNPJ
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

                    if(Nome !== '') {
                        const aux = await api.post('distributor/store', {
                            nome: Nome,
                            CNPJ: CNPJ
                        })

                        if(aux.data == 2) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Fornecedor atualizado!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                            dataGen()
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Fornecedor já cadastrado!',
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

                    console.log(Nome, CNPJ)
                    if(Nome !== '') {
                        const aux = await api.put('distributor/update', {
                            nome: Nome,
                            CNPJ: CNPJ
                        })

                        if(aux.data == 2) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Fornecedor atualizado!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                            dataGen()
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Fornecedor não existe!',
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
                        <h1>Fornecedor</h1>
                        <ol className="fornecedor">
                            <li className="dados">
                                <div className="nome">
                                    <p>Nome:</p>
                                    <input
                                        disabled={editar}
                                        value={Nome}
                                        onChange={(e) => {
                                            setNome(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="nome">
                                    <p>CNPJ:</p>
                                    <InputMask
                                        maskChar=''
                                        mask='99.999.999/9999-99'
                                        value={CNPJ}
                                        disabled={editar}
                                        maxLength={18}
                                        onChange={(e) => {
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
                                                <td>{data.nome}</td>
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
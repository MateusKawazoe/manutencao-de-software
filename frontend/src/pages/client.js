import React, { useState, useEffect } from 'react'
import '../styles/product.css'
import $ from 'jquery'
import { Table } from 'reactstrap'
import api from '../services/api'
import Swal from 'sweetalert2'
import AddBoxIcon from '@material-ui/icons/AddBox'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'
import { validarCPF } from '../common/validator'
import DatePicker  from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { formatarData } from '../common/dateFormat'
import InputMask from 'react-input-mask'

export default function Cliente() {
    const [editar, setEditar] = useState(true)
    const [Nome, setNome] = useState('')
    const [CPF, setCPF] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [aux] = useState(new Date())
    const [data, setData] = useState([])
    const [columns] = useState([
        'Nome', 'CPF', 'Data de Nascimento'
    ])
    const numberMask = new RegExp('^[0-9]*$')

    function handleDelete() {
        if(!(Nome !== '' && CPF !== '')) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Cliente não existe!',
                showConfirmButton: false,
                timer: 1000
            })
            return
        }

        Swal.fire({
            title: 'Deseja realmente deletar este Cliente?',
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
                const aux = await api.post('/client/delete', {
                    CPF: CPF
                })

                if(aux.data == 2) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cliente deletado com sucesso!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    dataGen()
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Cliente não existe!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                }
            }
        })
        dataGen()
    }

    async function handleSelect(data) {
        const clicked = await api.post('/client/showOne', {
            CPF: data.CPF
        })

        if(clicked.data !== 1) {
            setNome(clicked.data.nome)
            setCPF(clicked.data.CPF)
            setNascimento(clicked.data.nascimento)
        } else {
            dataGen()
        }
       return 
    }

    async function dataGen() {
        const client = await api.get('/client/showAll')
        const aux = []
        let i = 0

        while(client.data[i]) {
            let element = {
                nome: client.data[i].nome,
                CPF: client.data[i].CPF,
                nascimento: formatarData(client.data[i].nascimento)
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
                    if(!validarCPF(CPF)) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'CPF inválido',
                            showConfirmButton: false,
                            timer: 1000
                        }) 
                        return
                    }

                    if(Nome !== '') {
                        const aux = await api.post('client/store', {
                            nome: Nome,
                            CPF: CPF,
                            nascimento: nascimento
                        })

                        if(aux.data == 2) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Cliente atualizado!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                            dataGen()
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Cliente já cadastrado!',
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
                    if(!validarCPF(CPF)) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'CPF inválido',
                            showConfirmButton: false,
                            timer: 1000
                        }) 
                        return
                    } 

                    if(Nome !== '') {
                        const aux = await api.put('client/update', {
                            nome: Nome,
                            CPF: CPF
                        })

                        if(aux.data == 2) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Cliente atualizado!',
                                showConfirmButton: false,
                                timer: 1200
                            })
                            dataGen()
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Cliente não existe!',
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
                        <h1>Cliente</h1>
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
                                    <p>CPF:</p>
                                    <InputMask
                                        maskChar=''
                                        mask='999.999.999-99'
                                        value={CPF}
                                        disabled={editar}
                                        maxLength={14}
                                        onChange={(e) => {
                                            setCPF(e.target.value)
                                        }}
                                    />
                                </div>
                            </li>
                        </ol>
                        <ol className="produto">
                            <li className="descricao">
                            <div className="nome">
                                    <p>Data de Nascimento:</p>
                                    <DatePicker
                                        selected={aux}
                                        value={nascimento ? (formatarData(nascimento)):('')}
                                        disabled={editar}
                                        showYearDropdown
                                        dateFormatCalendar="MMMM"
                                        yearDropdownItemNumber={35}
                                        scrollableYearDropdown
                                        onChange={date => {
                                            setNascimento(date)
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
                                            <tr key={data.CPF} onClick={() => {
                                                handleSelect(data)
                                            }}>
                                                <td>{data.nome}</td>
                                                <td>{data.CPF}</td>
                                                <td>{data.nascimento}</td>
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
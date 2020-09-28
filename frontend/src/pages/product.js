import React from 'react'
import '../styles/product.css'
import AddBoxIcon from '@material-ui/icons/AddBox'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'

export default function Produto() {
    return (
        <div className="function-container">
            <ol className="buttons">
                <li>
                    <AddBoxIcon className="icon" id="cadastrar"/>
                    <p>Cadastrar</p>
                </li>
                <li>
                    <UpdateIcon className="icon" id="modificar"/>
                    <p>Modificar</p>
                </li>
                <li>
                    <DeleteIcon className="icon" id="deletar"/>
                    <p>Deletar</p>
                </li>
            </ol>
            <ol class="form-table">
                <li className="forms">
                    <form>
                        <h1>Informações</h1>
                        <div className="nome">
                            <input
                                placeholder=''
                            />
                        </div>  
                    </form>
                </li>
                <li className="table"></li>
            </ol>
        </div>
    )
}
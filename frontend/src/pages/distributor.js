import React from 'react'
import '../styles/distributor.css'
import AddBoxIcon from '@material-ui/icons/AddBox'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'

export default function Fornecedor() {
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
        </div>
    )
}
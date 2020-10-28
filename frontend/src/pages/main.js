import React, {
    useState, useEffect
} from "react"
import $ from 'jquery'
import HelpIcon from '@material-ui/icons/Help'
import Swal from 'sweetalert2'

import '../styles/main.css'
import logo from '../assets/logo.png'
import produto from '../assets/produto.png'
import fornecedor from '../assets/fornecedor.png'
import cliente from '../assets/cliente.png'
import compra from '../assets/compra.png'
import venda from '../assets/venda.png'
import Produto from './product'
import Compra from './buy'
import Venda from './sell'
import Fornecedor from './distributor'
import Cliente from './client'


export default function Main({ history }) {
    const [selected, setSelected] = useState('')

    if(localStorage.getItem('token') === '') {
        history.push('/')
    }

    useEffect(() => {
        if(localStorage.getItem('selected') !== '') {
            $('#' + localStorage.getItem('selected')).css('background-color', 'rgb(0, 80, 133)')
        }
    }, []);

    function handleSelected(e) {
        e.preventDefault()

        if(selected !== '') {
            $(selected).css('background-color', 'rgba(88, 88, 88, 0.884)')
        } else if(localStorage.getItem('selected') !== '') {
            $('#' + localStorage.getItem('selected')).css('background-color', 'rgba(88, 88, 88, 0.884)')
        } 

        setSelected('#' + e.target.id)
        localStorage.setItem('selected', e.target.id)
        $('#' + e.target.id).css('background-color', 'rgb(0, 80, 133)')
        return
    }

    function handleHelp() {
        Swal.mixin({
            confirmButtonText: 'Próximo &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
          }).queue([
            {
                title: 'Sobre o sistema:',
                text: 'O sistema apresentado é voltado para controle de estoque, e controle de vendas para clientes e compras de fornecedores.' +
                'Busca otimizar o processo de cadastro de produtos, clientes, fornecedores, compras e vendas. Facilitando a manipulação e visualização' +
                ' dos dados'
            },
            {
                title: 'Funcionamento dos cadastros e visualização:',
                text: 'Todos os cadastros são simples e com poucos dados, cada um dos itens localizado no menu lateral esquerdo' +
                'contém a aba de cada cadastro, clicando sobre uma delas aparecerá todos os campos à serem preenchidos. Todos os dados' +
                ' são armazenados em um banco de dados online chamado MongoDB e a visualização dos mesmo se da por meio de tabelas.'
            },
            {
                title: 'Maniputalção dos dados e execução das operações:',
                text: 'Após o cadastro dos dados é possível alterá-los, e realizar operações de compra e venda. Nem todos os dados ' +
                'são alteráveis, contudo apenas os campos quem podem ser modificados aparecem na tela de atualização de dados. Dentro das' +
                ' operações de compra só é possível comprar produtos já cadastrados, então quando for realizar a compra de um produto novo' +
                ' é necessário cadastrar o produto antes de realizar a compra e todo produto possuí um fornecedor, contudo o fornecedor pode ser cadastrado' +
                ' juntamente com o produto dentro da aba do produto. Dentro de venda também é necessário ter o produto cadastrado e em estoque' +
                ', similar à compra dentro da venda possuí o cliente que também pode ser cadastrado junto à venda.'
            }
        ])
    }

    function handleClick(e) {
        e.preventDefault()
        Swal.fire({
            title: 'Tem certeza que deseja sair?',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
            denyButtonColor: 'red'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                localStorage.setItem('token', '')
                localStorage.setItem('username', '')
                localStorage.setItem('selected', '')
                history.push('/')
            }
            return
        })  
    }

    return(
        <div className="main-container">
            <header>
                <div className="background"/>
                <div className="logo">
                    <img src={logo} alt="logo"></img>
                    <h1>K0nda1</h1>
                    <p>SA</p>
                </div>
                <ol className="right-header-menu">
                    <button onClick={handleClick}>Sair</button>
                    <li className="help" onClick={handleHelp}>
                        <HelpIcon className="icon"/>
                        <p>Ajuda</p>
                    </li>
                </ol>
            </header>
            <ol className="left-menu">
                <li className="welcome">
                    <h2>Bem vindo</h2>
                    <p>{localStorage.getItem('username')}</p>
                </li>
                <li className="line"/>
                <ul id="navigation" className="functions">
                    <li id="produto" onClick={handleSelected}>
                        <img src={produto} alt='produto'/>
                        Produto
                    </li>
                    <li onClick={handleSelected} id="fornecedor">
                        <img src={fornecedor} alt='produto'/>
                        Fornecedor
                    </li>
                    <li onClick={handleSelected} id="cliente">
                        <img src={cliente} alt='produto'/>
                        Cliente
                    </li>
                    <li onClick={handleSelected} id="compra">
                        <img src={compra} alt='produto'/>
                        Compra
                    </li>
                    <li onClick={handleSelected} id="venda">
                        <img src={venda} alt='produto'/>
                        Venda
                    </li>
                </ul>
            </ol>
            <div className="layout">
                {localStorage.getItem('selected') === 'produto' ? (
                    <Produto/>
                ) : (
                    <></>
                )}
                {localStorage.getItem('selected') === 'fornecedor' ? (
                    <Fornecedor/>
                ) : (
                    <></>
                )}
                {localStorage.getItem('selected') === 'cliente' ? (
                    <Cliente/>
                ) : (
                    <></>
                )}
                {localStorage.getItem('selected') === 'compra' ? (
                    <Compra/>
                ) : (
                    <></>
                )}
                {localStorage.getItem('selected') === 'venda' ? (
                    <Venda/>
                ) : (
                    <></>
                )}
            </div> 
        </div>
    )
}
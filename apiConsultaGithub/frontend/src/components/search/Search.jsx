import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
// import { Link } from 'react-router-dom'

const headerProps = {
    icon:'search',
    title:'Pesquisar',
    subtitle:'Pesquisar repositórios e adicionar aos favoritos'
}

const initialState = {
    lista: []
}

export default class Search extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            query: "",
            isLoaded: false,
            lista: [],
            items: []
        }
        // this.handleClick = this.handleClick.bind(this)
        this.cancel = ""
    }

    active() {
        this.setState({isLoaded: true}, () =>{
            this.componentWillMount(this.state.query)
        })
    }
    
    componentWillMount = (query) => {
        
        const api = {
            gitRootURL: "https://api.github.com",
            client_id: "Iv1.e29beccf0ebe8abd",
            client_secret: "a9d6b21ba1befaba1238ac23baf42da22d62b25c"
        }

        if (this.cancel) {
            this.cancel.cancel()
        }

        this.cancel = axios.CancelToken.source()

        let apiGitURL = ''
        
        if ( this.state.isLoaded ){
            apiGitURL =`${api.gitRootURL}/search/repositories?q={${query}}{&page,per_page,sort,order}&="${api.client_id}"&"${api.client_secret}`
        }

        axios.get(apiGitURL, {
            cancelToken: this.cancel.token
            })
        .then( resp => {
            const resultNotFoundMsg = ! resp.data.items.lenght ? 
                'No search results! Try a new search' : '';
            this.setState({ 
                lista: resp.data.items,
                message: resultNotFoundMsg,
            },
                () => {
                        this.renderRows()
                }
            )
        })
        .catch( error => {
            if (axios.isCancel(error) || error) {
                this.setState ({
                    isLoaded: false,
                    message: 'Failed to fetch!'
                })
            }
        })
    };

    handleOnInputChange = (event) => {
        const query = event.target.value
        this.setState({ query, message: '' }, 
            () => {
                this.componentWillMount(query)
            }
        )
    }

    clear() {
        this.setState({ lista: initialState.lista })
    }

    renderForm() {

        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-m-d6">
                        <div className="form-group">
                            <label>Repositório</label>
                            <input type="text" 
                                className="form-control"
                                name="projeto"
                                value={this.state.query.name}
                                onChange={e => this.handleOnInputChange(e)}
                                placeholder="Digite o titúlo..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.active(e)}>
                            Buscar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Limpar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Projeto</th>
                        <th>Autor</th>
                        <th>Descrição</th>
                        <th>Stars</th>
                        <th>Forks</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        
        return this.state.lista.map( item => {
            return (
                <tr key={item.id} href={item.previewURL}>
                    
                    <td src= {item.previewURL}>{item.name}</td>
                    <td src= {item.previewURL}>{item.owner.login}</td>
                    <td src= {item.previewURL}>{item.description}</td>
                    <td src= {item.previewURL}>{item.stargazers_count}</td>
                    <td src= {item.previewURL}>{item.forks}</td>
                    {/* <td 
                    key={item.id}
                    // onClick={(item)=>this.handleClick(item)}
                    // onClick={this.handleClick, ()=>{ console.log(item.id)}}
                    >
                        <button 
                        className="btn btn-pencil" 
                        
                        >
                            <Link to="/">
                                Detalhes
                            </Link>
                        </button>
                    </td> */}
                </tr> 
            
            )
        })                                        
    }
    
    render() {
        return(
            <Main {...headerProps}>
                    {this.renderForm()}
                    {this.renderTable()}
            </Main>
        )
    }
}

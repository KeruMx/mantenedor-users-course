import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ViewList from './componentes/ViewList'
import UserForm from './componentes/UserForm'
import axios from 'axios';
class App extends Component {
  state = {
    ruta:'lista', //formulario
    data: []
  }
  constructor(){
    super();
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(({data}) => this.setState({data}))
  }
  seleccionUsuario = (id) =>{
    this.setState({
      ruta: 'formulario',
      usuarioSeleccionado: id,
    })
  }
  nuevoUsuario = () =>{ 
    this.setState({
      ruta: 'formulario'
    })
  }
  agregarNuevoUsuario = usuario =>{
    axios.post('https://jsonplaceholder.typicode.com/users',usuario)
      .then(({data}) => {
        const newData = this.state.data.concat(data);
        this.setState({
          data: newData,
          ruta:'lista'
        })
      }).catch(e => {
        this.setState({ruta:'lista', usuarioSeleccionado:undefined})
      })
    }
    actualizarNuevoUsuario = (id,values) =>{
      axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, values)
        .then(()=>{
          const newData = this.state.data.map(x => x.id == id ? values : x)
          this.setState({
            data: newData,
            ruta: 'lista' 
          })
        })
    }
  render() {
    console.log(this.state);
    const {ruta, data, usuarioSeleccionado } = this.state;
    const valoresIniciales = usuarioSeleccionado && data.find(x=> x.id == usuarioSeleccionado);
    console.log(valoresIniciales);
    return (
      <div className="App">
        {ruta == 'lista' && 
          <ViewList
            nuevoUsuario = {this.nuevoUsuario} 
            handleClick = {this.seleccionUsuario}
            data={data}
          />
        }
        {ruta == 'formulario' && <UserForm handleSubmit={this.agregarNuevoUsuario }  valoresIniciales = {valoresIniciales || {}} handleUpdate = {this.actualizarNuevoUsuario} />}
      </div>
    );
  }
}

export default App;

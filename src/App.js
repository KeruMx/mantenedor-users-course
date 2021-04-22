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
  render() {
    console.log(this.state);
    const {ruta, data} = this.state;
    return (
      <div className="App">
        {ruta == 'lista' && <ViewList data={data}/>}
        {ruta == 'formulario' && <UserForm/>}
      </div>
    );
  }
}

export default App;

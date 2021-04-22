import React, { Component} from 'react';
import Cabecera from './Cabecera.jsx'
import Lista from './Lista'
export default class ViewList extends Component {
    render(){
        const {data} = this.props;
        return( 
            <div>
                <Cabecera/>
                <Lista data = {data}/>
            </div>
        )
    }
}
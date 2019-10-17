import React from 'react'
import { Input } from 'reactstrap';

const InputCoordenate = (props) =>{

    return (
        <div>
            <label>{props.label}</label>
            <Input name={props.name} onChange={props.update} value={props.value}></Input>          
        </div>
    )
}

export default InputCoordenate;
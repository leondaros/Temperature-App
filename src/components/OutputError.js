import React from 'react'
import { CardText } from 'reactstrap';

const OutpuError = (props) =>{

    let message = ""
    switch(props.error){
        case "Server returned status code ZERO_RESULTS":
            message = "This input has returned no results"
            break;
        default:
            message = "This request could not be completed" 
            break;
    }

    return (
        <CardText>{message}</CardText>
    )
}

export default OutpuError;
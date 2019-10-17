import React from 'react'
import { Row, CardText,CardFooter } from 'reactstrap';
import OutputError from './OutputError'

const OutputTemp = (props) =>{

    return (
      <>
        <CardText>Temperature at {props.lat}, {props.lng} is</CardText>
          <h2>
            {props.temp}ºC
          </h2>
      </>
    )
}

export default OutputTemp;
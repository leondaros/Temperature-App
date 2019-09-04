import React from 'react'
import { Row, CardText,CardFooter } from 'reactstrap';

const OutputTemp = (props) =>{

    return (
        <CardFooter>
              <Row className="output-container">
                <CardText>Temperature at {props.address} is</CardText>
                <h2>
                  {props.temp}ºC
                </h2>
              </Row>
        </CardFooter>
    )
}

export default OutputTemp;
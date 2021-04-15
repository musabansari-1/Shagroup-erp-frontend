import React from 'react'
import {Row, Col, Card} from 'reactstrap';
import {useHistory} from 'react-router-dom';

import './Administration.css';

const Administration = () => {
    const history = useHistory();
    return (
        <div className="administration">
            <Card  className="card administration__card">
             <h2>DEPARTMENT OF ADMINISTRATION</h2>   
            <Row>
                <Col md="6">
                <div onClick={() => history.push('administration/cognitiveSolutions')} className="myCard"  >
                COGNITIVE SOLUTION
            </div>
                </Col>
                <Col md="6">
                <div onClick={() => history.push('/administration/codelabSystems')}  className="myCard"  >
                CODELAB SYSTEMS
            </div>
                </Col>
            </Row>
            <Row style={{display: 'flex' , justifyContent: 'center'}}>
            <Col md="6" >
                <div  className="myCard"  >
                DATAQUEUE SYSTEMS
            </div>
                </Col>
            </Row>
            </Card>
        </div>
    )
}

export default Administration

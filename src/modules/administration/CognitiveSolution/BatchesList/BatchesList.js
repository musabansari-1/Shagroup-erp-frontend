import React, {useState, useEffect} from 'react';
import axios from '../../../../axios'; 
import {useHistory} from 'react-router-dom';

import '../InternshipList/InternshipList.css';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Form
  } from "reactstrap";

const BatchesList = (props) => {

    const internshipId = props.match.params.internshipId;
    console.log(internshipId);

    const history = useHistory();
    const [batchesList, setBatchesList] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    const fetchData = () => {
        // fetch internships list
        axios.get(`administration/cognitive_solutions/programs/batches/?internship=${internshipId}`, headers)
        .then(res =>{
            console.log(res.data);
            setBatchesList(res.data)
        })
        .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, [])

    const endBatchHandler = (batch) => {
        const batchId = batch.id;
        axios.put(`administration/cognitive_solutions/programs/batches/${batchId}/`, {
          ...batch , status: 0
        }, headers)
        .then(response => {
        console.log(response);
        fetchData();
        }
        )
        .catch(err => console.log(err));
    }

    return (
        <div className="internshipList">
           <Row>
          <Col md="12">
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Batches</CardTitle>
                {/* <Form onSubmit={searchSubmitHandler} >
              <InputGroup className="no-border search">
                <Input  placeholder="Search..." onChange={searchInputHandler} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              </Form> */}
                {/* <Button
                  onClick={() => {
                    history.push("/administration/cognitiveSolutions/airegister");
                  }}
                >
                  Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </Button> */}
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>NAME</th>
                      <th>START DATE</th>
                      <th>FROM TIME</th>
                      <th>TO TIME</th>
                      <th>STATUS</th>
                      <th>VIEW STUDENTS</th>
                      <th>END BATCH</th>
                      {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {batchesList.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                        >
                          <td>{listItem.name}</td>
                          <td>{listItem.start_date}</td>
                          <td>{listItem.from_time}</td>
                          <td>{listItem.to_time}</td>
                          <td>{listItem.status == 0 ? 'Closed': 'Ongoing'}</td>
                          <td><Button style={{backgroundColor: '#0093DD'}} onClick={() => {
                            history.push(history.push(`/administration/cognitiveSolutions/studentsList/${listItem.id}`))
                          }} >VIEW</Button></td>
                          <td >{listItem.status == 1? <Button style={{backgroundColor: 'red'}} onClick={() => endBatchHandler(listItem)}>END BATCH</Button>: 'Batch Closed'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
           
           
           
            {/* <h3>Batches</h3>
            {
                batchesList.map(batchesItem => 
                    <div className="internshipsList__item" onClick={() => history.push(`/administration/cognitiveSolutions/studentsList/${batchesItem.id}`)}>{batchesItem.name}</div>
                    )
            } */}
        </div>
    )
}

export default BatchesList

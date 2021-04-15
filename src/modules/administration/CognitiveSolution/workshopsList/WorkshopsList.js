import React, {useState, useEffect} from 'react';
import axios from '../../../../axios'; 
import {useHistory} from 'react-router-dom';

import './WorkshopsList.css';

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

const WorkshopsList = () => {

    const history = useHistory();
    const [workshopsList, setWorkshopsList] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    const fetchData = () => {
        // fetch internships list
        axios.get('administration/cognitive_solutions/programs/workshops/', headers)
        .then(res => setWorkshopsList(res.data))
        .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="workshopsList">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Workshops</CardTitle>
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
                      <th>DATE OF WORKSHOP</th>
                      <th>NO OF DAYS</th>
                      <th>NO OF HOURS</th>
                      <th>VIEW STUDENTS</th>
                      {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {workshopsList.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                          // onClick={() => {
                          //   history.push(`/administration/cognitiveSolutions/batchesList/${listItem.id}`)
                          // }}
                        >
                          <td>{listItem.name}</td>
                          <td>{listItem.date_of_workshop}</td>
                          <td>{listItem.no_of_days}</td>
                          <td>{listItem.no_of_hours}</td>
                          <td><Button style={{backgroundColor: '#0093DD'}} onClick={() => {
                            history.push(history.push(`/administration/cognitiveSolutions/workshopstudentsList/${listItem.id}`))
                          }} >VIEW</Button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> 


            {/* <h3>Internships</h3>
            {
                internshipsList.map(internshipsItem => 
                    <div className="internshipsList__item" onClick={() => history.push(`/administration/cognitiveSolutions/batchesList/${internshipsItem.id}`)}>{internshipsItem.name}</div>
                    )
            } */}
        </div>
    )
}

export default WorkshopsList

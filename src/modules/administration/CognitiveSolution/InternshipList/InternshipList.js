import React, {useState, useEffect} from 'react';
import axios from '../../../../axios'; 
import {useHistory} from 'react-router-dom';

import './InternshipList.css';

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

const InternshipList = () => {

    const history = useHistory();
    const [internshipsList, setInternshipsList] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    const fetchData = () => {
        // fetch internships list
        axios.get('administration/cognitive_solutions/programs/internships/', headers)
        .then(res => setInternshipsList(res.data))
        .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="internshipList">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Internships</CardTitle>
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
                      <th>NO OF MONTHS</th>
                      <th>ACTUAL FEES</th>
                      {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {internshipsList.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                          onClick={() => {
                            history.push(`/administration/cognitiveSolutions/batchesList/${listItem.id}`)
                          }}
                        >
                          <td>{listItem.name}</td>
                          <td>{listItem.no_of_months}</td>
                          <td>{listItem.actual_fees}</td>
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

export default InternshipList

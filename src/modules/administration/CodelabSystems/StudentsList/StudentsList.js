import React, {useState, useEffect} from 'react';
import axios from '../../../../axios'; 
import {useHistory} from 'react-router-dom';

import './StudentsList.css';

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

const StudentsList = (props) => {

    const history = useHistory();
    const [studentsList, setStudentsList] = useState([]);
    const [isAll, setIsAll] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isDue, setIsDue] = useState(false);


    const collegeId = props.match.params.collegeId;
    const projectId = props.match.params.projectId;
    console.log(collegeId);
    console.log(projectId);

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    const fetchData = () => {
        // fetch internships list
        axios.get(`accounts/all/fees/student_project_collegewise/?college_id=${collegeId}&project_id=${projectId}`, headers)
        .then(res => setStudentsList(res.data))
        .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, [])

    const isAllHandler = () => {
      // console.log('All clicked');
      setIsAll(true);
      setIsPaid(false);
      setIsDue(false);
    }

    const isPaidHandler = () => {
      // console.log('Paid clicked');

      setIsAll(false);
      setIsPaid(true);
      setIsDue(false);
    }

    const isDueHandler = () => {
      // console.log('Due clicked');

      setIsAll(false);
      setIsPaid(false);
      setIsDue(true);
    }

    return (
        <div className="internshipList">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Students</CardTitle>
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
                <center>
                <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between', width: '200px'}}>
                <Button style={{backgroundColor: 'black'}} onClick={() => isAllHandler()}>All</Button>
                <Button style={{backgroundColor: 'green'}} onClick={() => isPaidHandler()}>Paid</Button>
                <Button style={{backgroundColor: 'red'}} onClick={() => isDueHandler()}>Due</Button>
                </div>
                </center>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>NAME</th>
                      <th>REGISTER NO</th>
                      <th>CONTACT</th>
                      <th>CONTACT 2</th>
                      <th>ACTUAL FEES</th>
                      <th>BALANCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isAll && 
                    studentsList.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                        >
                          <td>{listItem.name}</td>
                          <td>{listItem.register_no}</td>
                          <td>{listItem.contact_1}</td>
                          <td>{listItem.contact_2 ? listItem.contact_2: '-'}</td>
                          <td>{listItem.actual_fees}</td>
                          <td>{listItem.balance}</td>
                          
                        </tr>
                      );
                    })
                    }


                    {isPaid && 
                    studentsList.map((listItem) => { 
                      if(listItem.balance === 0 ){
                      return (
                        <tr
                          className="tableRow"
                        >
                          <td>{listItem.name}</td>
                          <td>{listItem.register_no}</td>
                          <td>{listItem.contact_1}</td>
                          <td>{listItem.contact_2 ? listItem.contact_2: '-'}</td>
                          <td>{listItem.actual_fees}</td>
                          <td>{listItem.balance}</td>
                          
                        </tr>
                      );
                      }
                    })
                    }


                    {isDue && 
                    studentsList.map((listItem) => { 
                      if(listItem.balance != 0 ){
                      return (
                        <tr
                          className="tableRow"
                        >
                          <td>{listItem.name}</td>
                          <td>{listItem.register_no}</td>
                          <td>{listItem.contact_1}</td>
                          <td>{listItem.contact_2 ? listItem.contact_2: '-'}</td>
                          <td>{listItem.actual_fees}</td>
                          <td>{listItem.balance}</td>
                          
                        </tr>
                      );
                      }
                    })
                    }
                  
                    
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

export default StudentsList

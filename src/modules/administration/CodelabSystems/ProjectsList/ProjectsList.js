import React, {useState, useEffect} from 'react';
import axios from '../../../../axios'; 
import {useHistory} from 'react-router-dom';

import './ProjectsList.css';

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

const ProjectsList = (props) => {

    const history = useHistory();
    const [projectsList, setProjectsList] = useState([]);
    let [slNO, setSlNo] = useState(0);

    const collegeId = props.match.params.collegeId;

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    const fetchData = () => {
        // fetch internships list
        axios.get(`administration/codelab_systems/student_projects/student_project_overview/?college_id=${collegeId}`, headers)
        .then(res => setProjectsList(res.data))
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
                <CardTitle tag="h4">STUDENT TEAMS</CardTitle>
                <Button
                  onClick={() => {
                    history.push(`/administration/codelabSystems/sp_register/${collegeId}`);
                  }}
                >
                  Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </Button>
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
                      <th>SL.NO</th>
                      <th>PROJECT NAME</th>
                      <th>REGISTER NO</th>
                      <th>NAME</th>
                      <th>CONTACT 1</th>
                      <th>CONTACT 2</th>
                      {/* <th>PLACE</th>
                      <th>DISTRICT</th>
                      <th>STATE</th> */}
                      {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    { 
                    projectsList.map((listItem) => { 
                      slNO = slNO + 1;
                      return (
                        <>
                        {/* <tr
                          className="tableRow"
                          onClick={() => {
                            history.push(`/administration/codelabSystems/studentsList/${collegeId}/${listItem.id}`)
                          }}
                        > */}
                        {  
                        listItem.students.map((listSubItem, index) => {
                            console.log('length', listItem.students.length);
                            return (
                              <>
                              <tr>
                          {index == 0 && <td rowspan={listItem.students.length}>{slNO}</td>}
                          {index == 0 && <td rowspan={listItem.students.length}>{listItem.project_name}</td>}
                          <td>{listSubItem.register_no}</td>
                          <td>{listSubItem.name}</td>
                          <td>{listSubItem.contact_1}</td>
                          <td>{listSubItem.contact_2 ? listSubItem.contact_2 : '-'}</td>
                        
                          </tr>
                          </>
                            )
                          })
                        }
  
                          {/* <td>{
                            listItem.students.map(listSubItem => {
                              return (
                                <>
                                <td>{listSubItem.name}</td>
                                <td>{listSubItem.register_no}</td>
                                <td>{listSubItem.contact_1}</td>
                                <td>{listSubItem.contact_2}</td>
                                <br/>
                                </>
                              )
                            })
                              }</td> */}
                          {/* <td>{listItem.register_no}</td>
                          <td>{listItem.contact_1}</td>
                          <td>{listItem.contact_2 ? listItem.contact_2 : '-'}</td>
                          <td>-</td> */}
                          {/* <td>{listItem.place}</td>
                          <td>{listItem.district}</td>
                          <td>{listItem.state}</td> */}
                        {/* </tr> */}
                        {/* <tr>
                        <td>mamdad</td>
                          <td>mamdad</td>
                          <td>mamdad</td>
                          <td>mamdad</td>
                        </tr> */}
                        </>
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

export default ProjectsList

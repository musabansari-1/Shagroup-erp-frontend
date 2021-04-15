import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

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
import axios from '../../../../axios';

import './SPList.css';

const SPList = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const fetchData = () => {
    const url = "administration/codelab_systems/student_projects/student_projects/";
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setList(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, [])

  const searchInputHandler = (event) => {
    setSearchItem(event.target.value);
  }

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const url = `administration/codelab_systems/student_projects/student_projects/?search=${searchItem}`;
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      }
    }
     
      axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      }); 

  }

    return (
        <div className="spList">
            <Row>
          <Col md="12">
            <Card className="spList__card">
              <CardHeader className="table__header">
                <CardTitle tag="h4">Students</CardTitle>
                <Form onSubmit={searchSubmitHandler} >
              <InputGroup className="no-border search">
                <Input  placeholder="Search..." onChange={searchInputHandler} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              </Form>
                <Button
                  onClick={() => {
                    history.push("/administration/codelabSystems/sp_register");
                  }}
                >
                  Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </Button>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>PROFILE PIC</th>
                      <th>REGISTER NO</th>
                      <th>NAME</th>
                      <th>CONTACT</th>
                      {/* <th>INTERNSHIP PROGRAM</th> */}
                      {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                          onClick={() => {
                            history.push(`/administration/codelabSystems/sp_detail/${listItem.id}`);
                          }}
                        >
                          <td><img src={listItem.profile_pic} height="100px" width="100px"/></td>
                        <td>{listItem.register_no}</td>
                        <td>{listItem.name}</td>
                        <td>{listItem.contact_1}</td>
                       </tr>
                      );
                    })} 
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
    )
}

export default SPList

import React, {useState, useEffect} from 'react';
import axios from '../../../../axios'; 
import {useHistory} from 'react-router-dom';

import './CollegeList.css';

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
    Form,
    FormGroup,
    Label
  } from "reactstrap";
  import Modal from '../../../../components/Modal/Modal';

const CollegeList = () => {

    const history = useHistory();
    const [collegeList, setCollegeList] = useState([]);
    const [totalStudents, setTotalStudents] = useState();
    const [collegeModal, setCollegeModal] = useState(false);
    const [college, setCollege] = useState({});
    // const [colleges, setColleges] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    const fetchData = () => {
        // fetch internships list
        axios.get('administration/codelab_systems/student_projects/college_overview/', headers)
        .then(res => {
          setCollegeList(res.data.colleges)
          setTotalStudents(res.data.total_no_of_students)
        })
        .catch(err => console.log(err));

    }

    useEffect(() => {
        fetchData();
    }, [])

    const collegeSubmitHandler = (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = college;
      axios
        .post(
          "administration/cognitive_solutions/programs/colleges/",
          data,
          headers
        )
        .then((res) => {
          console.log(res.data);
          // colleges.push(res.data);
          setCollegeModal(false);
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const collegeInputHandler = (event) => {
      setCollege({
        ...college,
        [event.target.name]: event.target.value,
      });
    };

    return (
        <div className="internshipList">

<Modal
        modalOpen={collegeModal}
        header="Add College"
        setModalOpen={setCollegeModal}
      >
        <Form onSubmit={collegeSubmitHandler}>
          <FormGroup>
            <Label for="">College Name</Label>
            <Input
              type="text"
              name="name"
              // value={degreeCollege.name}
              onChange={collegeInputHandler}
            />
            <Label for="">Place</Label>
            <Input
              type="text"
              name="place"
              // value={degreeCollege.value}
              onChange={collegeInputHandler}
            />
                 <Label for="">District</Label>
            <Input
              type="text"
              name="district"
              // value={degreeCollege.value}
              onChange={collegeInputHandler}
            />
                 <Label for="">State</Label>
            <Input
              type="text"
              name="state"
              // value={degreeCollege.value}
              onChange={collegeInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>

        <Row>
          <Col md="12">
            <div style={{backgroundColor: 'white', padding: '20px', marginBottom: '10px'}}>
            <h4>Total Number of Students: {totalStudents}</h4>
            </div>
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Colleges</CardTitle>
                <Button
                  onClick={() => {
                    setCollegeModal(true);
                  }}
                >
                  Add New College <i class="fa fa-plus-circle" aria-hidden="true"></i>
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
                      <th>NAME OF THE COLLEGE</th>
                      <th>DISTRICT</th>
                      <th>STATE</th>
                      <th>NO OF STUDENTS</th>
                      {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {collegeList.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                          onClick={() => {
                            history.push(`/administration/codelabSystems/projectsList/${listItem.college_id}`)
                          }}
                        >
                          <td>{listItem.college_name}</td>
                          <td>{listItem.district}</td>
                          <td>{listItem.state}</td>
                          <td>{listItem.no_of_students}</td>
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

export default CollegeList

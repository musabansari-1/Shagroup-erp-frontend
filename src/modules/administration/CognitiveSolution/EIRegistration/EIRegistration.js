import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import Modal from "../../../../components/Modal/Modal";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";

const EIDetailView = (props) => {
  const [companys, setCompanys] = useState([]);
  const [frontends, setFrontends] = useState([]);
  const [backends, setBackends] = useState([]);
  const [frontendModal, setFrontendModal] = useState(false);
  const [backendModal, setBackendModal] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [internshipModal, setInternshipModal] = useState(false);
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [company, setCompany] = useState({ name: "", place: "" });
  const [internship, setInternship] = useState({});
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState({});
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState({});
  const [batchModal, setBatchModal] = useState(false);
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    // const url = `cognitive_solutions/cognitive_internships/1`
    // const url = 'https://jsonplaceholder.typicode.com/posts/1'
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    axios
      .get("administration/cognitive_solutions/programs/batches/", headers)
      .then((res) => {
        console.log(res.data);
        setBatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/companys/", headers)
      .then((res) => {
        console.log(res.data);
        setCompanys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/frontends/", headers)
      .then((res) => {
        console.log(res.data);
        setFrontends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/backends/", headers)
      .then((res) => {
        console.log(res.data);
        setBackends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("administration/cognitive_solutions/programs/internships/", headers)
      .then((res) => {
        console.log(res.data);
        setInternships(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: "",
      register_no: "",
      date_of_admission: "",
      // no_of_months: "",
      name: "",
      address: "",
      contact_1: "",
      contact_2: "",
      email: "",
      guardian_name: "",
      guardian_contact: "",
      company: "",
      company_place: "",
      role: "",
      start_date: "",
      end_date: "",
      from_time: "",
      to_time: "",
      frontend: "",
      backend: "",
      internship: "",
      // actual_fees: "",
      concession: "",
    },
    validationSchema: Yup.object({
      // userName: Yup.string()
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      // password: Yup.string()
      //   .min(8, "Must be atleast 8 characters or more")
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      // firstName: Yup.string()
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      // lastName: Yup.string()
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      //   email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      // const url = "https://jsonplaceholder.typicode.com/posts";
      const url =
        "/administration/cognitive_solutions/programs/employee_internships/";
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      axios
        .post(url, formData, headers)
        .then((res) => {
          console.log(res.data);
          setSuccessResponse('Form Submitted Successfully')
          setSuccessResponseModal(true);
          // setResponse(res.data);
          // setModalOpen(true);
          // resetForm({ values: "" });
        })
        .catch((err) => {
          console.log(err);
          setErrorResponse(err.response.data);
          setErrorResponseModal(true)
          //   setResponse(err)
        });
    },
  });

  const internshipSubmitHandler = (event) => {
    event.preventDefault();
      const token= localStorage.getItem('token')
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = internship
      axios
      .post("administration/cognitive_solutions/programs/internships/",data , headers)
      .then((res) => {
        console.log(res.data);
        internships.push(res.data)
        setInternshipModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const internshipInputHandler = (event) => {
    setInternship({
      ...internship,
      [event.target.name]: 
      event.target.value
    })
  };

  const frontendSubmitHandler = (event) => {
    event.preventDefault();
    alert("frontend " + frontend);
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: frontend,
    };
    axios
      .post(
        "administration/cognitive_solutions/programs/frontends/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        frontends.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const frontendInputHandler = (event) => {
    setFrontend(event.target.value);
  };

  const backendSubmitHandler = (event) => {
    event.preventDefault();
    alert("backend " + backend);
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: backend,
    };
    axios
      .post(
        "administration/cognitive_solutions/programs/backends/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        backends.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backendInputHandler = (event) => {
    setBackend(event.target.value);
  };

  const companySubmitHandler = (event) => {
    event.preventDefault();
    alert("company " + JSON.stringify(company));
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = company;
    axios
      .post(
        "administration/cognitive_solutions/programs/companys/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        companys.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const companyInputHandler = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
  };

  const internshipChangeHandler = (event) => {
    internships.map(internship => {
      if (internship.id == event.target.value) {
        setSelectedInternship(internship)
      }
    })
  }

  const batchSubmitHandler = (event) => {
    event.preventDefault();
      const token= localStorage.getItem('token')
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = batch
      axios
      .post("administration/cognitive_solutions/programs/batches/",data , headers)
      .then((res) => {
        console.log(res.data);
        batches.push(res.data)
        setBatchModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const batchInputHandler = (event) => {
    setBatch({
      ...batch,
      [event.target.name]: 
      event.target.value
    })
  };

  return (
    <div className="DetailView">
      <Modal
        modalOpen={successResponseModal}
        header="Success"
        setModalOpen={setSuccessResponseModal}
      >
        <center><strong>{successResponse}</strong></center>
      </Modal>
      <Modal
        modalOpen={errorResponseModal}
        header="Error"
        setModalOpen={setErrorResponseModal}
      >
        {Object.keys(errorResponse).map(key => <div style={{color: 'red'}}><strong>{key} : {errorResponse[key]}</strong></div>)}
      </Modal>
      <Modal
        modalOpen={batchModal}
        header="Add Batch"
        setModalOpen={setBatchModal}
      >
          <Form onSubmit={batchSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={batchInputHandler} />
            </FormGroup>
            <FormGroup>
                      <Label>Internship Program 
                      <AddBoxRoundedIcon
                        onClick={() =>setInternshipModal(true)}
                      />
                      </Label>
                      <Input
                        type="select"
                        name = "internship"
                        onChange={batchInputHandler}
                        // {...formik.getFieldProps("internship")}
                        // onChange={(e) => {formik.handleChange(e); internshipChangeHandler(e)}}
                      >
                        <option selected></option>
                        {internships.map((internship) => {
                          return  (
                            <option value={internship.id}>
                              {internship.name} {frontends.map(frontend => frontend.id === internship.frontend ? frontend.name : null)} {backends.map(backend => backend.id === internship.backend ? backend.name : null)} {internship.actual_fees}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
            <FormGroup>
              <Label for="">From Time</Label>
              <Input type="time" name="from_time" onChange={batchInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">To Time</Label>
              <Input type="time" name="to_time" onChange={batchInputHandler} />
            </FormGroup>
            {/* <FormGroup>
                      <label>Front End      <AddBoxRoundedIcon
                        onClick={() => {
                          setFrontendModal(true);
                      }}
                      /></label>
                      <Input
                        type="select"
                        name="frontend"
                        // onChange={internshipInputHandler}
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {frontends.map((frontend) => <option value={frontend.id}>{frontend.name}</option>)}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label>Back End 
                      <AddBoxRoundedIcon
                        onClick={() =>setBackendModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        name="backend"
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {backends.map((backend) => <option value={backend.id}>{backend.name}</option>)}
                      </Input>
                    </FormGroup>
            <FormGroup>
              <Label for="">Actual Fees</Label>
              <Input type="number" name="actual_fees" onChange={internshipInputHandler} />
            </FormGroup> */}
            <Button type="submit">ADD</Button>
          </Form>
      </Modal>
            <Modal
        modalOpen={internshipModal}
        header="Add Internship"
        setModalOpen={setInternshipModal}
      >
          <Form onSubmit={internshipSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={internshipInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">No. of Months</Label>
              <Input type="number" name="no_of_months" onChange={internshipInputHandler} />
            </FormGroup>
            <FormGroup>
                      <label>Front End      <AddBoxRoundedIcon
                        onClick={() => {
                          setFrontendModal(true);
                      }}
                      /></label>
                      <Input
                        type="select"
                        name="frontend"
                        // onChange={internshipInputHandler}
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {frontends.map((frontend) => <option value={frontend.id}>{frontend.name}</option>)}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label>Back End 
                      <AddBoxRoundedIcon
                        onClick={() =>setBackendModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        name="backend"
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {backends.map((backend) => <option value={backend.id}>{backend.name}</option>)}
                      </Input>
                    </FormGroup>
            <FormGroup>
              <Label for="">Actual Fees</Label>
              <Input type="number" name="actual_fees" onChange={internshipInputHandler} />
            </FormGroup>
            <Button type="submit">ADD</Button>
          </Form>
      </Modal>
      <Modal
        modalOpen={frontendModal}
        header="Add Frontend"
        setModalOpen={setFrontendModal}
      >
        <Form onSubmit={frontendSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={frontendInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Modal
        modalOpen={backendModal}
        header="Add Backend"
        setModalOpen={setBackendModal}
      >
        <Form onSubmit={backendSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={backendInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Modal
        modalOpen={companyModal}
        header="Add Company"
        setModalOpen={setCompanyModal}
      >
        <Form onSubmit={companySubmitHandler}>
          <FormGroup>
            <Label for="">Company Name</Label>
            <Input type="text" name="name" onChange={companyInputHandler} />
            <Label for="">Company Place</Label>
            <Input type="text" name="place" onChange={companyInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Employee Internship Registration</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                {/* <Row>
                  <Col className="" md="12">
                    <FormGroup>
                      <label>No of Months</label>
                      <Input
                        placeholder="No of Months"
                        type="number"
                        {...formik.getFieldProps("no_of_months")}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                <h5>PERSONAL DETAILS</h5>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Employee Name</label>
                      <Input
                        placeholder="Employee Name"
                        type="text"
                        {...formik.getFieldProps("name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Email ID</label>
                      <Input
                        defaultValue=""
                        placeholder="Email ID"
                        type="email"
                        {...formik.getFieldProps("email")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Contact No.</label>
                      <Input
                        defaultValue=""
                        placeholder="Contact No."
                        type="number"
                        {...formik.getFieldProps("contact_1")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Contact No.2</label>
                      <Input
                        defaultValue=""
                        placeholder="Contact No.2"
                        type="number"
                        {...formik.getFieldProps("contact_2")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        defaultValue=""
                        placeholder="Address"
                        type="text"
                        {...formik.getFieldProps("address")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Guardian Name</label>
                      <Input
                        defaultValue=""
                        placeholder="Guardian Name"
                        type="text"
                        {...formik.getFieldProps("guardian_name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Guardian Contact</label>
                      <Input
                        defaultValue=""
                        placeholder="Guardian Contact"
                        type="number"
                        {...formik.getFieldProps("guardian_contact")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <h5>EMPLOYMENT DETAILS</h5>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Company Name</label>
                      <AddBoxRoundedIcon
                        onClick={() => {
                          setCompanyModal(true);
                        }}
                      />
                      <Input type="select" {...formik.getFieldProps("company")}>
                        <option selected></option>
                        {companys.map((company) => (
                          <option value={company.id}>{company.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Present Role</label>
                      <Input
                        defaultValue=""
                        placeholder="Present Role"
                        type="text"
                        {...formik.getFieldProps("role")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <h5>INTERNSHIP DETAILS</h5>
                {/* <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Start Date</label>
                      <Input
                        defaultValue=""
                        placeholder="Start Date"
                        type="date"
                        {...formik.getFieldProps("start_date")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        defaultValue=""
                        placeholder="End Date"
                        type="date"
                        {...formik.getFieldProps("end_date")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>From</label>
                      <Input
                        defaultValue=""
                        placeholder="From Time"
                        type="time"
                        {...formik.getFieldProps("from_time")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>To</label>
                      <Input
                        defaultValue=""
                        placeholder="To Time"
                        type="time"
                        {...formik.getFieldProps("to_time")}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Front End</label>
                      <AddBoxRoundedIcon
                        onClick={() => {
                          setFrontendModal(true);
                        }}
                      />
                      <Input
                        type="select"
                        name="frontend"
                        id="frontend"
                        {...formik.getFieldProps("frontend")}
                      >
                        {frontends.map((frontend) => (
                          <option value={frontend.id}>{frontend.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Back End</label>
                      <AddBoxRoundedIcon
                        onClick={() => {
                          setBackendModal(true);
                        }}
                      />
                      <Input
                        type="select"
                        name="backend"
                        id="backend"
                        {...formik.getFieldProps("backend")}
                      >
                        {backends.map((backend) => (
                          <option value={backend.id}>{backend.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col md="6" className="pr-1">
                  <FormGroup>
                      <label>Internship Program 
                      <AddBoxRoundedIcon
                        onClick={() =>setInternshipModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("internship")}
                        onChange={(e) => {formik.handleChange(e); internshipChangeHandler(e)}}
                      >
                        <option selected></option>
                        {internships.map((internship) => {
                          return  (
                            <option value={internship.id}>
                              {internship.name} 
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="pl-1">
                  <FormGroup>
              <Label for="">Internship Name</Label>
              <Input type="text" value={selectedInternship.name} disabled />
            </FormGroup>

                  </Col>
                  
                </Row>
                <Row>
                  <Col md="2" className="pr-1 ">
                            <FormGroup>
              <Label for="">Months</Label>
              <Input type="number" value={selectedInternship.no_of_months} disabled />
            </FormGroup>
            </Col>
            <Col md="5" className="pl-1 pr-1 ">
            <FormGroup>
              <Label for="">Start Date</Label>
              <Input type="date" name="start_date" value={selectedInternship.start_date} disabled />
            </FormGroup>
            </Col>
            <Col md="5" className="pl-1 ">
            <FormGroup>
              <Label for="">End Date</Label>
              <Input type="date" name="end_date" value={selectedInternship.end_date} disabled />
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md="4" className="pr-1 ">
            <FormGroup>
              <Label for="">Frontend</Label>
              <Input type="text" name="frontend" value={frontends.map(frontend => {
                if (frontend.id === selectedInternship.frontend ) {
                  return frontend.name;
                }
              })} disabled />
            </FormGroup>
            </Col>
            <Col md="4" className="pr-1 pl-1">
            <FormGroup>
              <Label for="">Backend</Label>
              <Input type="text" name="backend" value={backends.map(backend => {
                if (backend.id == selectedInternship.backend) {
                  return backend.name
                }
              })} disabled />
            </FormGroup>
            </Col>
            <Col md="4" className="pl-1 ">
              <FormGroup>
              <Label for="">Actual Fees</Label>
              <Input type="number" name="actual_fees" value={selectedInternship.actual_fees} disabled />
            </FormGroup>
            </Col>
            </Row>
                <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                      <label>Batch
                      <AddBoxRoundedIcon
                        onClick={() =>setBatchModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("batch")}
                      >
                        {batches.map((batch) =>  {
                          if (batch.internship === selectedInternship.id) { 
                          return  (
                            <option value={batch.id} selected>
                             Name: {batch.name} From: {batch.from_time} To: {batch.to_time}
                             </option>
                          ) 
                          }
                        })}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Concession</label>
                      <Input
                        defaultValue=""
                        placeholder="Concession"
                        type="number"
                        {...formik.getFieldProps("concession")}
                      />
                    </FormGroup>
                  </Col>
                </Row>                
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Upload Your Photo</label>
                      <Input
                        defaultValue=""
                        placeholder="Upload your Photo"
                        type="file"
                        {...formik.getFieldProps("profile_pic")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EIDetailView;

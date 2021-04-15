import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import Modal from "../../../../components/Modal/Modal";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

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

const AWRegistration = (props) => {
  const [detail, setDetail] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  // const [frontends, setFrontends] = useState([]);
  // const [backends, setBackends] = useState([]);
  // const [frontendModal, setFrontendModal] = useState(false);
  // const [backendModal, setBackendModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [collegeModal, setCollegeModal] = useState(false);
  // const [frontend, setFrontend] = useState("");
  // const [backend, setBackend] = useState("");
  const [course, setCourse] = useState({});
  const [college, setCollege] = useState({ name: "", place: "" });
  const [maxSem, setMaxSem] = useState(0);
  const [workshopModal, setWorkshopModal] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const [workshop, setWorkshop] = useState({}); 
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);

  useEffect(() => {
    let min_id = 9999;
    courses.map((course) => {
      if (min_id > course.id) {
        min_id = course.id;
        setMaxSem(course.max_sem);
      }
    });
  }, [courses]);

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
      .get("administration/cognitive_solutions/programs/workshops/", headers)
      .then((res) => {
        console.log(res.data);
        setWorkshops(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/colleges/", headers)
      .then((res) => {
        console.log(res.data);
        setColleges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/courses/", headers)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data).then(alert(courses));
        // setMaxSem(courses[detail.course].max_sem);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get("administration/cognitive_solutions/programs/frontends/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     setFrontends(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // axios
    //   .get("administration/cognitive_solutions/programs/backends/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     setBackends(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .get(
        `administration/cognitive_solutions/programs/cognitive_workshops/${id}`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
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
      date_of_workshop: "",
      course: "",
      semester: "",
      no_of_days: "",
      no_of_hours: "",
      name: "",
      address: "",
      contact_1: "",
      contact_2: "",
      email: "",
      college: "",
      college_place: "",
      start_date: "",
      end_date: "",
      from_time: "",
      to_time: "",
      // frontend: "",
      // backend: "",
      actual_fees: "",
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
        "administration/cognitive_solutions/programs/academic_workshops/";
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
          resetForm({ values: "" });
        })
        .catch((err) => {
          console.log(err);
          setErrorResponse(err.response.data);
          setErrorResponseModal(true)
          //   setResponse(err)
        });
    },
  });

  // const frontendSubmitHandler = (event) => {
  //   event.preventDefault();
  //   alert("frontend " + frontend);
  //   const token = localStorage.getItem("token");
  //   const headers = {
  //     headers: {
  //       Authorization: ` Token ${token}`,
  //     },
  //   };
  //   const data = {
  //     name: frontend,
  //   };
  //   axios
  //     .post(
  //       "administration/cognitive_solutions/programs/frontends/",
  //       data,
  //       headers
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       frontends.push(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const frontendInputHandler = (event) => {
  //   setFrontend(event.target.value);
  // };

  // const backendSubmitHandler = (event) => {
  //   event.preventDefault();
  //   alert("backend " + backend);
  //   const token = localStorage.getItem("token");
  //   const headers = {
  //     headers: {
  //       Authorization: ` Token ${token}`,
  //     },
  //   };
  //   const data = {
  //     name: backend,
  //   };
  //   axios
  //     .post(
  //       "administration/cognitive_solutions/programs/backends/",
  //       data,
  //       headers
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       backends.push(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const backendInputHandler = (event) => {
  //   setBackend(event.target.value);
  // };

  const courseSubmitHandler = (event) => {
    event.preventDefault();
    alert("course " + course);
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = course;
    axios
      .post(
        "administration/cognitive_solutions/programs/courses/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        courses.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const courseInputHandler = (event) => {
    setCourse({
      ...course,
      [event.target.name]: event.target.value,
    });
  };

  const collegeSubmitHandler = (event) => {
    event.preventDefault();
    alert("college " + JSON.stringify(college));
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
        colleges.push(res.data);
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

  const courseChangeHandler = (event) => {
    courses.map((course) => {
      if (event.target.value == course.id) {
        // alert(course.max_sem)
        setMaxSem(course.max_sem);
      }
    });
  };

  const workshopSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = workshop;
    axios
      .post(
        "administration/cognitive_solutions/programs/workshops/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        workshops.push(res.data);
        setWorkshopModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const workshopInputHandler = (event) => {
    setWorkshop({
      ...workshop,
      [event.target.name]: event.target.value,
    });
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
        modalOpen={workshopModal}
        header="Add Workshop"
        setModalOpen={setWorkshopModal}
      >
        <Form onSubmit={workshopSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={workshopInputHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="">No. of Days</Label>
            <Input
              type="number"
              name="no_of_days"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">No. of Hours</Label>
            <Input
              type="number"
              name="no_of_hours"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Date of Workshop</Label>
            <Input
              type="date"
              name="date_of_workshop"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>Start Date</Label>
            <Input
              type="date"
              name="start_date"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <label>End Date</label>
            <Input
              type="date"
              name="end_date"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label>From</Label>
            <Input
              type="time"
              name="from_time"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <label>To</label>
            <Input type="time" name="to_time" onChange={workshopInputHandler} />
          </FormGroup>
          <FormGroup>
            <label>Technology</label>
            <Input
              type="textarea"
              name="technology"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <label>Actual Fees</label>
            <Input
              type="number"
              name="actual_fees"
              onChange={workshopInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      {/* <Modal
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
      </Modal> */}
      <Modal
        modalOpen={courseModal}
        header="Add Course"
        setModalOpen={setCourseModal}
      >
        <Form onSubmit={courseSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={courseInputHandler} />
            <Label for="">Max Sem</Label>
            <Input type="text" name="max_sem" onChange={courseInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
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
              value={college.name}
              onChange={collegeInputHandler}
            />
            <Label for="">College Place</Label>
            <Input
              type="text"
              name="place"
              value={college.value}
              onChange={collegeInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Academic Workshop Registration</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  {/* <Col className="px-1" md="4">
                    <FormGroup>
                      <label>Date of Workshop</label>
                      <Input
                        type="date"
                        {...formik.getFieldProps("date_of_workshop")}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Course</label>
                      <AddBoxRoundedIcon onClick={() => setCourseModal(true)} />
                      <Input
                        type="select"
                        // onChange={courseChangeHandler}
                        {...formik.getFieldProps("course")}
                        onChange={(e) => {
                          formik.handleChange(e);
                          courseChangeHandler(e);
                        }}
                      >
                        {courses.map((course) => (
                          <option value={course.id}>{course.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Semester</label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("semester")}
                      >
                        {Array.from(Array(maxSem), (_, index) => index + 1).map(
                          (sem) => (
                            <option>{sem}</option>
                          )
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>No of Days</label>
                      <Input
                        placeholder="No of Days"
                        type="number"
                        {...formik.getFieldProps("no_of_days")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>No of Hours</label>
                      <Input
                        placeholder="No of Hours"
                        type="number"
                        {...formik.getFieldProps("no_of_hours")}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                <h5>PERSONAL DETAILS</h5>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Student Name</label>
                      <Input
                        // onChangeText={courseChangeHandler}
                        defaultValue={detail.name}
                        placeholder="Student Name"
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
                <h5>ACADEMIC DETAILS</h5>
                <Row>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      <label>College Name</label>
                      <AddBoxRoundedIcon
                        onClick={() => setCollegeModal(true)}
                      />
                      <Input
                        type="select"
                        name="collegeName"
                        id="collegeName"
                        {...formik.getFieldProps("college")}
                      >
                        {colleges.map((college) => (
                          <option>{college.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  {/* <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>College Place</label>
                      <Input
                        placeholder="College Place"
                        disabled
                        type="text"
                        {...formik.getFieldProps("college_place")}
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                <h5>WORKSHOP DETAILS</h5>
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
                        onClick={() => setFrontendModal(true)}
                      />
                      <Input
                        type="select"
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
                        onClick={() => setBackendModal(true)}
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
                  <Col>
                    <FormGroup>
                      <label>Workshop</label>
                      <AddBoxRoundedIcon
                        onClick={() => setWorkshopModal(true)}
                      />
                      <Input
                        type="select"
                        {...formik.getFieldProps("workshop")}
                      >
                        {workshops.map((workshop) =>
                          detail.workshop === workshop.id ? (
                            <option selected value={workshop.id}>
                              {workshop.date_of_workshop} | {workshop.name} |{" "}
                              {workshop.technology} | {workshop.actual_fees}
                            </option>
                          ) : (
                            <option value={workshop.id}>
                              {workshop.date_of_workshop} | {workshop.name} |{" "}
                              {workshop.technology} | {workshop.actual_fees}
                            </option>
                          )
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {/* <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Actual Fees</label>
                      <Input
                        defaultValue=""
                        placeholder="Actual fees"
                        type="number"
                        {...formik.getFieldProps("actual_fees")}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col>
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
                        style={{ border: "1px solid #CED4DA", padding: "5px" }}
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

export default AWRegistration;

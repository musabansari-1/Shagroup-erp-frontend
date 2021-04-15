import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

import "./AIDetailView.css";

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
  FormText,
} from "reactstrap";
import Modal from "../../../../components/Modal/Modal";

const AIDetailView = (props) => {
  const [detail, setDetail] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [frontends, setFrontends] = useState([]);
  const [backends, setBackends] = useState([]);
  const [batches, setBatches] = useState([]);
  const [frontendModal, setFrontendModal] = useState(false);
  const [backendModal, setBackendModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [collegeModal, setCollegeModal] = useState(false);
  const [internshipModal, setInternshipModal] = useState(false);
  const [batchModal, setBatchModal] = useState(false);
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [course, setCourse] = useState({});
  const [college, setCollege] = useState({ name: "", place: "" });
  const [maxSem, setMaxSem] = useState();
  const [internship, setInternship] = useState({});
  const [internships, setInternships] = useState([]);
  const [batch, setBatch] = useState({});
  const [selectedInternship, setSelectedInternship] = useState({});
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);
  const [paidFees, setPaidFees] = useState([]);
  const [actualFees, setActualFees] = useState();

  useEffect(() => {
    batches.map((batch) => {
      // alert(JSON.stringify(batch.internship));
      if (batch.id == detail.batch) {
        internships.map(
          (internship) =>
            internship.id == batch.internship &&
            setSelectedInternship(internship)
        );
      }
    });
  }, [detail, batches]);

  useEffect(() => {
    courses.map((course) => {
      if (course.id === detail.course) {
        setMaxSem(course.max_sem);
      }
    });
  }, [courses, detail]);

  const fetchData = () => {
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
        setCourses(res.data);
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

    axios
      .get(
        `administration/cognitive_solutions/programs/academic_internships/${id}/`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        axios
          .get(
            `accounts/all/fees/academic_internship_fees/?received_from=${res.data.id}`,
            headers
          )
          .then((res) => {
            console.log("fee receipts", res.data);
            // setBatches(res.data);
            const feesPaid = res.data.reduce((sum, obj) => {
              return sum + obj.amount;
            }, 0);
            setPaidFees(feesPaid);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

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
      .get(
        `administration/cognitive_solutions/programs/batches/${detail.batch}`,
        headers
      )
      .then((res) => {
        axios
          .get(
            `administration/cognitive_solutions/programs/internships/${res.data.internship}`,
            headers
          )
          .then((res) => { setActualFees(res.data.actual_fees)})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: detail.id,
      register_no: detail.register_no,
      date_of_admission: detail.date_of_admission,
      course: detail.course,
      semester: detail.semester,
      name: detail.name,
      address: detail.address,
      contact_1: detail.contact_1,
      contact_2: detail.contact_2,
      email: detail.email,
      guardian_name: detail.guardian_name,
      guardian_contact: detail.guardian_contact,
      college: detail.college,
      college_place: detail.college_place,
      overall_percentage: detail.overall_percentage,
      start_date: detail.start_date,
      end_date: detail.end_date,
      // from_time: detail.from_time,
      // to_time: detail.to_time,
      // frontend: detail.frontend,
      // backend: detail.backend,
      // actual_fees: detail.actual_fees,
      internship: detail.internship,
      concession: detail.concession,
      batch: detail.batch,
      profile_pic: null,
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
      const id = props.match.params.id;
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const url = `administration/cognitive_solutions/programs/academic_internships/${id}/`;
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      var imagefile = document.querySelector("#file");
      if (imagefile.files[0]) {
        formData.set("profile_pic", imagefile.files[0]);
        alert(formData.get("profile_pic"));
      } else {
        formData.delete("profile_pic");
      }

      axios
        .put(url, formData, headers)
        .then((res) => {
          console.log(res.data);
          setSuccessResponse("Form Submitted Successfully");
          setSuccessResponseModal(true);
          fetchData();
          // resetForm({ values: "" });
        })
        .catch((err) => {
          // console.log(err);
          console.log(err.message);
          setErrorResponse(err.response.data);
          setErrorResponseModal(true);
          //   setResponse(err)
        });
    },
  });

  const batchSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = batch;
    axios
      .post(
        "administration/cognitive_solutions/programs/batches/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        batches.push(res.data);
        setBatchModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const batchInputHandler = (event) => {
    setBatch({
      ...batch,
      [event.target.name]: event.target.value,
    });
  };

  const internshipSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = internship;
    axios
      .post(
        "administration/cognitive_solutions/programs/internships/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        internships.push(res.data);
        setInternshipModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const internshipInputHandler = (event) => {
    setInternship({
      ...internship,
      [event.target.name]: event.target.value,
    });
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

  const internshipChangeHandler = (event) => {
    internships.map((internship) => {
      if (internship.id == event.target.value) {
        setSelectedInternship(internship);
      }
    });
  };

  return (
    <div className="DetailView">
      <Modal
        modalOpen={successResponseModal}
        header="Success"
        setModalOpen={setSuccessResponseModal}
      >
        <center>
          <strong>{successResponse}</strong>
        </center>
      </Modal>
      <Modal
        modalOpen={errorResponseModal}
        header="Error"
        setModalOpen={setErrorResponseModal}
      >
        {Object.keys(errorResponse).map((key) => (
          <div style={{ color: "red" }}>
            <strong>
              {key} : {errorResponse[key]}
            </strong>
          </div>
        ))}
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
            <Label>
              Internship Program
              <AddBoxRoundedIcon onClick={() => setInternshipModal(true)} />
            </Label>
            <Input
              type="select"
              name="internship"
              onChange={batchInputHandler}
              // {...formik.getFieldProps("internship")}
              // onChange={(e) => {formik.handleChange(e); internshipChangeHandler(e)}}
            >
              <option selected></option>
              {internships.map((internship) => {
                return (
                  <option value={internship.id}>
                    {internship.name}{" "}
                    {frontends.map((frontend) =>
                      frontend.id === internship.frontend ? frontend.name : null
                    )}{" "}
                    {backends.map((backend) =>
                      backend.id === internship.backend ? backend.name : null
                    )}{" "}
                    {internship.actual_fees}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="">Start Date</Label>
            <Input
              type="date"
              name="start_date"
              onChange={internshipInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">End Date</Label>
            <Input
              type="date"
              name="end_date"
              onChange={internshipInputHandler}
            />
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
            <Input
              type="number"
              name="no_of_months"
              onChange={internshipInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Front End{" "}
              <AddBoxRoundedIcon
                onClick={() => {
                  setFrontendModal(true);
                }}
              />
            </label>
            <Input
              type="select"
              name="frontend"
              // onChange={internshipInputHandler}
              onChange={internshipInputHandler}
            >
              <option selected disabled></option>
              {frontends.map((frontend) => (
                <option value={frontend.id}>{frontend.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>
              Back End
              <AddBoxRoundedIcon onClick={() => setBackendModal(true)} />
            </label>
            <Input
              type="select"
              name="backend"
              onChange={internshipInputHandler}
            >
              <option selected disabled></option>
              {backends.map((backend) => (
                <option value={backend.id}>{backend.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="">Actual Fees</Label>
            <Input
              type="number"
              name="actual_fees"
              onChange={internshipInputHandler}
            />
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
        <Col md="4">
          <Card className="card-user ">
            <div className="image">
              <img
                alt="..."
                src="https://blogs.sas.com/content/sastraining/files/2015/03/black_background.png"
                width="100%"
                height="50px"
              />
            </div>
            <CardBody>
              <div className="author">
                <a>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={detail.profile_pic}
                    width="100%"
                    style={{
                      borderRadius: "100px",
                      cursor: "pointer",
                      marginBottom: "20px",
                    }}
                    height="200px"
                    width="200px"
                  />
                  <h5 className="title">{detail.name}</h5>
                </a>
                <p className="description" style={{ color: "black" }}>
                  Email: {detail.email}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Contact: {detail.contact_1}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Contact2: {detail.contact_2}
                </p>
                <p className="description" style={{ color: "black" }}>
                  {/* Total Fees: {batches.map(batch => batch.id === detail.batch && internships.map(internship => internship.id === batch.internship && setActualFees(internship.actual_fees) ))} */}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Paid Fees: {paidFees}
                </p>
                {/* <p className="description" style={{ color: "black" }}>
                  Internship Program: {internships.map(internship => internship.id === detail.internship ? internship.name : null)}
                </p> */}
                {/* <p className="description" style={{ color: "black" }}>
                  Backend: {detail.backend}
                </p> */}
              </div>
              {/* <p className="description text-center">
                "I like the way you work it <br />
                No diggity <br />I wanna bag it up"
              </p> */}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Edit Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Registration No</label>
                      <Input
                        defaultValue=""
                        disabled
                        placeholder="Register No."
                        type="text"
                        name="registerNo"
                        id="registerNo"
                        {...formik.getFieldProps("register_no")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="3">
                    <FormGroup>
                      <label>Date of Admission</label>
                      <Input
                        disabled
                        type="date"
                        value={detail.date_of_admission}
                        {...formik.getFieldProps("date_of_admission")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="3">
                    <FormGroup>
                      <label>
                        Course
                        <AddBoxRoundedIcon
                          onClick={() => setCourseModal(true)}
                        />
                      </label>
                      <Input
                        type="select"
                        name="course"
                        id="course"
                        {...formik.getFieldProps("course")}
                        onChange={(e) => {
                          formik.handleChange(e);
                          courseChangeHandler(e);
                        }}
                      >
                        {courses.map((course) => {
                          return detail.course === course.id ? (
                            <option value={course.id} selected>
                              {course.name}
                            </option>
                          ) : (
                            <option value={course.id}>{course.name}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="2">
                    <FormGroup>
                      <label>Semester</label>
                      <Input
                        type="select"
                        name="semester"
                        id="semester"
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
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Student Name</label>
                      <Input
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
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>
                        College Name
                        <AddBoxRoundedIcon
                          onClick={() => setCollegeModal(true)}
                        />
                      </label>
                      <Input
                        type="select"
                        name="collegeName"
                        id="collegeName"
                        {...formik.getFieldProps("college")}
                      >
                        {colleges.map((college) => {
                          return detail.frontend === college.id ? (
                            <option value={college.id} selected>
                              {college.name}
                            </option>
                          ) : (
                            <option value={college.id}>{college.name}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>College Place</label>
                      <Input
                        defaultValue=""
                        disabled
                        placeholder="College Place"
                        type="text"
                        {...formik.getFieldProps("college_place")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Overall percentage</label>
                      <Input
                        placeholder="Overall percentage"
                        type="text"
                        {...formik.getFieldProps("overall_percentage")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
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
                </Row> */}
                {/* <Row>
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
                      <label>Front End      <AddBoxRoundedIcon
                        onClick={() => {
                          console.log("frontend button pressed");
                          setFrontendModal(true);
                      }}
                      /></label>
                      <Input
                        type="select"
                        name="frontend"
                        id="frontend"
                        {...formik.getFieldProps("frontend")}
                      >
                        {frontends.map((frontend) => {
                          return detail.frontend === frontend.id ? (
                            <option value={frontend.id} selected>
                              {frontend.name}
                            </option>
                          ) : (
                            <option value={frontend.id}>{frontend.name}</option>
                          );
                        })}
                      </Input>
                     
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Back End 
                      <AddBoxRoundedIcon
                        onClick={() =>setBackendModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        name="backend"
                        id="backend"
                        {...formik.getFieldProps("backend")}
                      >
                        {backends.map((backend) => {
                          return detail.backend === backend.id ? (
                            <option value={backend.id} selected>
                              {backend.name}
                            </option>
                          ) : (
                            <option value={backend.id}>{backend.name}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col md="5" className="pr-1">
                    <FormGroup>
                      <label>
                        Internship Program
                        <AddBoxRoundedIcon
                          onClick={() => setInternshipModal(true)}
                        />
                      </label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("internship")}
                        onChange={(e) => {
                          formik.handleChange(e);
                          internshipChangeHandler(e);
                        }}
                      >
                        {internships.map((internship) => {
                          return detail.internship === internship.id ? (
                            <option value={internship.id} selected>
                              {internship.name}
                            </option>
                          ) : (
                            <option value={internship.id}>
                              {internship.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="5" className="pl-1 pr-1">
                    <FormGroup>
                      <Label for="">Internship Name</Label>
                      <Input
                        type="text"
                        value={selectedInternship.name}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="2" className="pl-1">
                    <FormGroup>
                      <Label for="">Months</Label>
                      <Input
                        type="number"
                        value={selectedInternship.no_of_months}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {/* <Col md="5" className="pl-1 pr-1 ">
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
            </Col> */}
                </Row>
                <Row>
                  <Col md="4" className="pr-1 ">
                    <FormGroup>
                      <Label for="">Frontend</Label>
                      <Input
                        type="text"
                        name="frontend"
                        value={frontends.map((frontend) => {
                          if (frontend.id === selectedInternship.frontend) {
                            return frontend.name;
                          }
                        })}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" className="pr-1 pl-1">
                    <FormGroup>
                      <Label for="">Backend</Label>
                      <Input
                        type="text"
                        name="backend"
                        value={backends.map((backend) => {
                          if (backend.id == selectedInternship.backend) {
                            return backend.name;
                          }
                        })}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" className="pl-1 ">
                    <FormGroup>
                      <Label for="">Actual Fees</Label>
                      <Input
                        type="number"
                        name="actual_fees"
                        value={selectedInternship.actual_fees}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>
                        Batch
                        <AddBoxRoundedIcon
                          onClick={() => setBatchModal(true)}
                        />
                      </label>
                      <Input type="select" {...formik.getFieldProps("batch")}>
                        {batches.map((batch) => {
                          if (batch.internship === selectedInternship.id) {
                            return detail.batch === batch.id ? (
                              <option value={batch.id} selected>
                                {batch.name} {batch.from_time} {batch.to_time}
                              </option>
                            ) : (
                              <option value={batch.id}>
                                {batch.name} {batch.from_time} {batch.to_time}
                              </option>
                            );
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
                        id="file"
                        type="file"
                        {...formik.getFieldProps("profile_pic")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Update Profile
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

export default AIDetailView;

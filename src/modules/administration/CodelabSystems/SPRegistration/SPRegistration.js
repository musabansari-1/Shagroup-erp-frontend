import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

import "./SPRegistration.css";

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

const SPRegistration = (props) => {
  const history = useHistory();
  const [detail, setDetail] = useState([]);
  const [degreeColleges, setDegreeColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [frontends, setFrontends] = useState([]);
  const [backends, setBackends] = useState([]);
  const [frontendModal, setFrontendModal] = useState(false);
  const [backendModal, setBackendModal] = useState(false);
  const [internshipModal, setInternshipModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [degreeCollegeModal, setDegreeCollegeModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [frontend, setFrontend] = useState("");
  const [school, setSchool] = useState("");
  const [puCollege, setPuCollege] = useState("");
  const [backend, setBackend] = useState("");
  const [course, setCourse] = useState({});
  const [degreeCollege, setDegreeCollege] = useState({});
  const [internship, setInternship] = useState({});
  const [maxSem, setMaxSem] = useState();
  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);
  const [schools, setSchools] = useState([]);
  const [puColleges, setPuColleges] = useState([]);
  const [streams, setStreams] = useState([]);
  const [stream, setStream] = useState({});
  const [streamModal, setStreamModal] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [companys, setCompanys] = useState([]);
  const [company, setCompany] = useState({});
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({});
  const [project, setProject] = useState({});
  const [trainerModal, setTrainerModal] = useState(false);
  const [trainerRoles, setTrainerRoles] = useState([]);
  const [trainerRole, setTrainerRole] = useState({});
  const [trainerRoleModal, setTrainerRoleModal] = useState(false);
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState([]);
  const [payment, setPayment] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState();
  const [schoolModal, setSchoolModal] = useState(false);
  const [puCollegeModal, setPuCollegeModal] = useState(false);


  const collegeId = props.match.params.collegeId;
  console.log('college id', collegeId);

  const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

  // useEffect(() => {
  //   let minId = Number.MAX_VALUE;
  //   let firstCourse = ""
  //   courses.map((course) => {
  //     if (minId > course.id) {
  //       minId = course.id;
  //       firstCourse = course.name
  //     }  
  //     axios.get(`administration/cognitive_solutions/programs/streams/?search=${firstCourse}`, headers)
  //     .then(res => {
  //       setStreams(res.data)
  //     }
  //       )
  //     .catch(err => console.log(err))  
  //   });


  // }, [courses]);
  
  // useEffect(() => {
  //   courses.map((course) => {
  //     if (course.id === detail.course) {
  //       setMaxSem(course.max_sem);
  //     }
  //   });
  // }, [courses, detail]);

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
    .get("accounts/all/fees/payment_type/", headers)
    .then((res) => {
      console.log(res.data);
      setPaymentType(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    axios
      .get(
        "administration/codelab_systems/student_projects/trainer_roles/",
        headers
      )
      .then((res) => {
        console.log(res.data);
        setTrainerRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    axios
      .get(
        "administration/codelab_systems/student_projects/trainers/",
        headers
      )
      .then((res) => {
        console.log(res.data);
        setTrainers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    axios
      .get(
        "administration/cognitive_solutions/programs/companys/",
        headers
      )
      .then((res) => {
        console.log(res.data);
        setCompanys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
    axios
      .get(
        "administration/codelab_systems/student_projects/projects/",
        headers
      )
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("administration/codelab_systems/student_projects/sslcs/", headers)
      .then((res) => {
        console.log(res.data);
        setSchools(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("administration/codelab_systems/student_projects/pucs/", headers)
      .then((res) => {
        console.log(res.data);
        setPuColleges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/colleges/", headers)
      .then((res) => {
        console.log(res.data);
        setDegreeColleges(res.data);
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
        `administration/cognitive_solutions/programs/academic_internships/${id}`,
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
      "name": "",
      "profile_pic": "",
      "address": "",
      "contact_1": "",
      "contact_2": "",
      "email": "",
      "guardian_name": "",
      "guardian_contact": "",
      "is_whatsapp_contact_1": false,
      "is_whatsapp_contact_2": false,
      "college_register_no": "",
      "sslc_percentage": null,
      "sslc_no_of_attempts": null,
      "puc_percentage": null,
      "puc_no_of_attempts": null,
      "degree_percentage": null,
      "degree_no_of_attempts": null,
      "additional_qualifications": "",
      "extracurricular_activities": "",
      // "concession": null,
      "course": null,
      "stream": null,
      "college": collegeId,
      "sslc": null,
      "puc": null,
      "degree": collegeId,
      "project": null,
      // "fees": ""
      "actual_fees": null,
      "concession": null
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
      // const url = 'https://jsonplaceholder.typicode.com/posts';
      const url =
        "administration/codelab_systems/student_projects/student_projects/";
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
          console.log("response", res.data);
          setSuccessResponse('Form Submitted Successfully')
          setSuccessResponseModal(true);
          handleInitialPayment(res.data);

          // resetForm({ values: "" });
          // history.push("/academic_internship");
        })
        .catch((err) => {
          console.log(err.response.data);
          setErrorResponse(err.response.data);
          setErrorResponseModal(true)
        });
    },
  });

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
        setFrontendModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const frontendInputHandler = (event) => {
    setFrontend(event.target.value);
  };


  const schoolSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: school,
    };
    axios
      .post(
        "administration/codelab_systems/student_projects/sslcs/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        schools.push(res.data);
        setSchoolModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const schoolInputHandler = (event) => {
    setSchool(event.target.value);
  };

  const puCollegeSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: puCollege,
    };
    axios
      .post(
        "administration/codelab_systems/student_projects/pucs/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        puColleges.push(res.data);
        setPuCollegeModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const puCollegeInputHandler = (event) => {
    setPuCollege(event.target.value);
  };


  const backendSubmitHandler = (event) => {
    event.preventDefault();
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
        setBackendModal(false);
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
        setCourseModal(false);
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
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = degreeCollege;
    axios
      .post(
        "administration/cognitive_solutions/programs/colleges/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        degreeColleges.push(res.data);
        setDegreeCollegeModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const collegeInputHandler = (event) => {
    setDegreeCollege({
      ...degreeCollege,
      [event.target.name]: event.target.value,
    });
  };

  const courseChangeHandler = (event) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    courses.map((course) => {
      if (event.target.value == course.id) {
        //  setMaxSem(course.max_sem);
        axios.get(`administration/cognitive_solutions/programs/streams/?search=${course.name}`, headers)
        .then(res => {
          setStreams(res.data)
        }
          )
        .catch(err => console.log(err))
      }
    });
  };

  const projectSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = project;
    axios
      .post(
        "administration/codelab_systems/student_projects/projects/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        projects.push(res.data);
        setProjectModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const projectInputHandler = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  };


  const streamSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = stream;
    axios
      .post(
        "administration/cognitive_solutions/programs/streams/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        streams.push(res.data);
        setStreamModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const streamInputHandler = (event) => {
    setStream({
      ...stream,
      [event.target.name]: event.target.value,
    });
  };

  const companySubmitHandler = (event) => {
    event.preventDefault();
      const token= localStorage.getItem('token')
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = company
      axios
      .post("administration/cognitive_solutions/programs/companys/",data , headers)
      .then((res) => {
        console.log(res.data);
        companys.push(res.data)
        setCompanyModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const companyInputHandler = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value
    })
  };

  const trainerSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: trainer,
    };
    axios
      .post(
        "administration/codelab_systems/student_projects/trainers/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        trainers.push(res.data);
        setTrainerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trainerInputHandler = (event) => {
    setTrainer(event.target.value);
  };

  const trainerRoleSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: trainerRole,
    };
    axios
      .post(
        "administration/codelab_systems/student_projects/trainer_roles/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        trainerRoles.push(res.data);
        setTrainerRoleModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trainerRoleInputHandler = (event) => {
    setTrainerRole(event.target.value);
  };

  const paymentSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      mode_of_payment: payment.mode_of_payment,
      amount: payment.amount,
      // amount_in_words: numToString(payment.amount),
      id: '345',
      received_from: parseInt(studentId),
    };
    console.log(data);
    axios
      .post("accounts/all/fees/student_project_fees/", data, headers)
      .then((res) => {
        console.log(res.data);
        setSuccessResponse('Form Submitted Successfully')
        setSuccessResponseModal(true);
        // fetchData();
        setPaymentModal(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(err.response.data);
          setErrorResponseModal(true)
      });
  };

  const paymentInputHandler = (event) => {
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });
  };

  

  const handleInitialPayment = (data) => {
    setPaymentModal(true);
    setStudentId(data.id);
    setStudentName(data.name);
  }

  return (
    <div className="spRegistration">
      <Modal
          header="Pay Now"
          modalOpen={paymentModal}
          setModalOpen={setPaymentModal}
        >
          <Form onSubmit={paymentSubmitHandler}>
            <FormGroup>
              <Label for="Mode of payment">Mode of Payment</Label>
              <Input
                type="select"
                name="mode_of_payment"
                onChange={paymentInputHandler}
              >
                <option selected></option>
                {paymentType.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Received From">Received From</Label>
              <Input
                type="text"
                name="received_from"
                onChange={paymentInputHandler}
                value={studentName}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label >Amount</Label>
              <Input
                type="number"
                name="amount"
                onChange={paymentInputHandler}
              />  
            </FormGroup>
            {/* <FormGroup>
              <Label >Amount in words</Label>
              <Input
                type="text"
                name="amount_in_words"
                onChange={paymentInputHandler}
              />  
            </FormGroup> */}
            <Button type="submit">PAY</Button>
          </Form>
        </Modal> 
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
        modalOpen={trainerRoleModal}
        header="Add Trainer Role"
        setModalOpen={setTrainerRoleModal}
      >
        <Form onSubmit={trainerRoleSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={trainerRoleInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Modal
        modalOpen={trainerModal}
        header="Add Trainer"
        setModalOpen={setTrainerModal}
      >
        <Form onSubmit={trainerSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={trainerInputHandler} />
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
              <Input type="text" name="name"  onChange={companyInputHandler} />
              </FormGroup>
              <FormGroup>
              <Label for="">Company Place</Label>
              <Input type="text" name="place"  onChange={companyInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">Company Website</Label>
              <Input type="text" name="website"  onChange={companyInputHandler} />
            </FormGroup>
            <Button type="submit">ADD</Button>
          </Form>
      </Modal>
      <Modal
        modalOpen={streamModal}
        header="Add Stream"
        setModalOpen={setStreamModal}
      >
          <Form onSubmit={streamSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={streamInputHandler} />
            </FormGroup>
            <FormGroup>
                      <label>Course</label>
                      <AddBoxRoundedIcon
                        onClick={() => setCourseModal(true)}
                      />
                      <Input type="select" name="course" onChange={streamInputHandler} >
                        <option selected></option>
                        {courses.map((course) => (
                          <option value={course.id}>{course.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
            <Button type="submit">ADD</Button>
          </Form>
      </Modal>
      <Modal
        modalOpen={projectModal}
        header="Add Project"
        setModalOpen={setProjectModal}
      >
        <Form onSubmit={projectSubmitHandler}>
          <FormGroup>
            <Label for="">Project Title</Label>
            <Input type="text" name="title" onChange={projectInputHandler} />
          </FormGroup>
          <FormGroup>
            <label>
                Company
              <AddBoxRoundedIcon
                onClick={() => {
                  setCompanyModal(true);
                }}
              />
            </label>
            <Input
              type="select"
              name="company"
              // onChange={internshipInputHandler}
              onChange={projectInputHandler}
            >
              <option selected disabled></option>
              {companys.map((company) => (
                <option value={company.id}>{company.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="">Client Name</Label>
            <Input
              type="text"
              name="client_name"
              onChange={projectInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">Client Contact No.</Label>
            <Input
              type="number"
              name="client_contact"
              onChange={projectInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">Client Email</Label>
            <Input
              type="email"
              name="client_email"
              onChange={projectInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">Project Description</Label>
            <Input
              type="textarea"
              name="description"
              onChange={projectInputHandler}
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
              onChange={projectInputHandler}
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
              onChange={projectInputHandler}
            >
              <option selected disabled></option>
              {backends.map((backend) => (
                <option value={backend.id}>{backend.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>
              Trainer 1 Name
              <AddBoxRoundedIcon onClick={() => setTrainerModal(true)} />
            </label>
            <Input
              type="select"
              name="trainer_1_name"
              onChange={projectInputHandler}
            >
              <option selected disabled></option>
              {trainers.map((trainer) => (
                <option value={trainer.id}>{trainer.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>
              Trainer 1 Role
              <AddBoxRoundedIcon onClick={() => setTrainerRoleModal(true)} />
            </label>
            <Input
              type="select"
              name="trainer_1_role"
              onChange={projectInputHandler}
            >
              <option selected disabled></option>
              {trainerRoles.map((trainerRole) => (
                <option value={trainerRole.id}>{trainerRole.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>
              Trainer 2 Name
              <AddBoxRoundedIcon onClick={() => setTrainerModal(true)} />
            </label>
            <Input
              type="select"
              name="trainer_2_name"
              onChange={projectInputHandler}
            >
              <option selected disabled></option>
              {trainers.map((trainer) => (
                <option value={trainer.id}>{trainer.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <label>
              Trainer 2 Role
              <AddBoxRoundedIcon onClick={() => setTrainerRoleModal(true)} />
            </label>
            <Input
              type="select"
              name="trainer_2_role"
              onChange={projectInputHandler}
            >
              <option selected disabled></option>
              {trainerRoles.map((trainerRole) => (
                <option value={trainerRole.id}>{trainerRole.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="">From Date</Label>
            <Input
              type="date"
              name="from_date"
              onChange={projectInputHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">To Date</Label>
            <Input
              type="date"
              name="to_date"
              onChange={projectInputHandler}
            />
          </FormGroup>
          {/* <FormGroup>
            <Label for="">Actual Fees</Label>
            <Input
              type="number"
              name="actual_fees"
              onChange={projectInputHandler}
            />
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
        modalOpen={degreeCollegeModal}
        header="Add Degree College"
        setModalOpen={setDegreeCollegeModal}
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
            <Label for="">College Place</Label>
            <Input
              type="text"
              name="place"
              // value={degreeCollege.value}
              onChange={collegeInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Modal
        modalOpen={schoolModal}
        header="Add School"
        setModalOpen={setSchoolModal}
      >
        <Form onSubmit={schoolSubmitHandler}>
          <FormGroup>
            <Label for="">School Name</Label>
            <Input
              type="text"
              name="name"
              // value={degreeCollege.name}
              onChange={schoolInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Modal
        modalOpen={puCollegeModal}
        header="Add P.U College"
        setModalOpen={setPuCollegeModal}
      >
        <Form onSubmit={puCollegeSubmitHandler}>
          <FormGroup>
            <Label for="">College Name</Label>
            <Input
              type="text"
              name="name"
              // value={degreeCollege.name}
              onChange={puCollegeInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Row>
        <Col md="12">
          <Card className="card-user spRegistration__card">
            <CardHeader>
              <CardTitle tag="h5">Student Project Registration</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <h5>PERSONAL DETAILS</h5>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Student Name</label>
                      <Input
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
                        type="tel"
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
                        type="tel"
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
                <h5>PRESENT COURSE/STREAM DETAILS</h5>
                <Row>
                  <Col className="pl-1" md="6">
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
                            <option >Select Course</option>
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
                  <Col className="pl-1" md="6">
                  <FormGroup>
                      <label>
                        Stream
                        <AddBoxRoundedIcon
                          onClick={() => setStreamModal(true)}
                        />
                      </label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("stream")}
                        // onChange={(e) => {
                        //   formik.handleChange(e);
                        //   courseChangeHandler(e);
                        // }}
                      >
                            <option >Select Stream</option>
                        {streams.map((stream) => {
                          
                          // detail.course === course.id ? (
                          //   <option value={course.id} selected>
                          //     {course.name}
                          //   </option>
                          // ) :
                          return  (
                            <option value={stream.id}>{stream.name}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>
                        College Name
                        <AddBoxRoundedIcon
                          onClick={() => setDegreeCollegeModal(true)}
                        />
                      </label>
                      <Input
                        type="select"
                        name="collegeName"
                        id="collegeName"
                        {...formik.getFieldProps("college")}
                        disabled
                      >
                        {degreeColleges.map((college) => {
                          return collegeId == college.id ? (
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
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>University Register No (USN)</label>
                      <Input
                        type="text"
                        {...formik.getFieldProps("college_register_no")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <h5>PROJECT DETAILS</h5>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Project</label>
                      <AddBoxRoundedIcon
                        onClick={() => setProjectModal(true)}
                      />
                      <Input type="select" {...formik.getFieldProps("project")}>
                      <option >Select Project</option>
                        {projects.map((project) => (
                          // detail.workshop === workshop.id ? (
                          //   <option selected value={workshop.id}>
                          //     {workshop.date_of_workshop} | {workshop.name} |{" "}
                          //     {workshop.technology} | {workshop.actual_fees}
                          //   </option>
                          // )
                          // :
                          <option value={project.id}>{project.title}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <h5>SCHEDULE DETAILS</h5>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>FROM DATE</label>
                      <Input
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

                <h5>ACADEMIC DETAILS</h5>
                <h6>SSLC</h6>
                <Row>
                  <Col md="6" className="pr-1">
                  <FormGroup>
                      <label>School</label>
                      <AddBoxRoundedIcon
                        onClick={() => setSchoolModal(true)}
                      />
                      <Input type="select" {...formik.getFieldProps("sslc")}>
                      <option >Select School</option>
                        {schools.map((school) => (
                          // detail.workshop === workshop.id ? (
                          //   <option selected value={workshop.id}>
                          //     {workshop.date_of_workshop} | {workshop.name} |{" "}
                          //     {workshop.technology} | {workshop.actual_fees}
                          //   </option>
                          // )
                          // :
                          <option value={school.id}>{school.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3" className="pr-1 pl-1">
                    <FormGroup>
                      <label>Percentage</label>
                      <Input
                        placeholder="Percentage"
                        type="number"
                        {...formik.getFieldProps("sslc_percentage")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3" className="pl-1">
                  <FormGroup>
                      <label>Backlogs</label>
                      <Input
                        placeholder="Backlogs"
                        type="number"
                        {...formik.getFieldProps("sslc_no_of_attempts")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <h6>PUC</h6>
                <Row>
                  <Col md="6" className="pr-1">
                  <FormGroup>
                      <label>College</label>
                      <AddBoxRoundedIcon
                        onClick={() => setPuCollegeModal(true)}
                      />
                      <Input type="select" {...formik.getFieldProps("puc")}>
                      <option >Select P.U College</option>
                        {puColleges.map((puCollege) => (
                          // detail.workshop === workshop.id ? (
                          //   <option selected value={workshop.id}>
                          //     {workshop.date_of_workshop} | {workshop.name} |{" "}
                          //     {workshop.technology} | {workshop.actual_fees}
                          //   </option>
                          // )
                          // :
                          <option value={puCollege.id}>{puCollege.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="3" className="pr-1 pl-1">
                    <FormGroup>
                      <label>Percentage</label>
                      <Input
                        placeholder="Percentage"
                        type="number"
                        {...formik.getFieldProps("puc_percentage")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3" className="pl-1">
                  <FormGroup>
                      <label>Backlogs</label>
                      <Input
                        placeholder="Backlogs"
                        type="number"
                        {...formik.getFieldProps("puc_no_of_attempts")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <h6>DEGREE</h6>
                <Row>
                  <Col md="6" className="pr-1">
                  <FormGroup>
                      <label>College</label>
                      <AddBoxRoundedIcon
                        onClick={() => setDegreeCollegeModal(true)}
                      />
                      <Input type="select" {...formik.getFieldProps("degree")} disabled>
                      <option >Select Degree College</option>
                      {degreeColleges.map((college) => {
                          return collegeId == college.id ? (
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
                  <Col md="3" className="pr-1 pl-1">
                    <FormGroup>
                      <label>Percentage</label>
                      <Input
                        placeholder="Percentage"
                        type="number"
                        {...formik.getFieldProps("degree_percentage")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3" className="pl-1">
                  <FormGroup>
                      <label>Backlogs</label>
                      <Input
                        placeholder="Backlogs"
                        type="number"
                        {...formik.getFieldProps("degree_no_of_attempts")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                <FormGroup>
                      <label>ADDITONAL QUALIFICATION/CERTIFICATION</label>
                      <Input
                        placeholder=""
                        type="textarea"
                        {...formik.getFieldProps("additional_qualifications")}
                      />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                  <Col>
                <FormGroup>
                      <label>EXTRA CURRICULAR ACTIVITIES</label>
                      <Input
                        placeholder=""
                        type="textarea"
                        {...formik.getFieldProps("extracurricular_activities")}
                      />
                    </FormGroup>
                    </Col>
                </Row>
                {/* <h5>INTERNSHIP DETAILS</h5> */}
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
                {/* <Row>
                  <Col className="pr-1" md="6">
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
                      >
                        {internships.map((internship) => {
                          return detail.internship === internship.id ? (
                            <option value={internship.id} selected>
                              {internship.name}{" "}
                              {frontends.map((frontend) =>
                                frontend.id === internship.frontend
                                  ? frontend.name
                                  : null
                              )}{" "}
                              {backends.map((backend) =>
                                backend.id === internship.backend
                                  ? backend.name
                                  : null
                              )}{" "}
                              {internship.actual_fees}
                            </option>
                          ) : (
                            <option value={internship.id}>
                              {internship.name}{" "}
                              {frontends.map((frontend) =>
                                frontend.id === internship.frontend
                                  ? frontend.name
                                  : null
                              )}{" "}
                              {backends.map((backend) =>
                                backend.id === internship.backend
                                  ? backend.name
                                  : null
                              )}{" "}
                              {internship.actual_fees}
                            </option>
                          );
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
                </Row> */}
                <Row>
                <Col md="6">
                <FormGroup>
            <Label for="">Actual Fees</Label>
            <Input
              type="number"
              {...formik.getFieldProps("actual_fees")}
            />
          </FormGroup>
                {/* <FormGroup>
            <Label for="">Fees</Label>
            <Input
              type="number"
              {...formik.getFieldProps("fees")}
            />
          </FormGroup> */}
                  </Col>
                  <Col md="6">
                  <FormGroup>
            <Label for="">Concession</Label>
            <Input
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

export default SPRegistration;

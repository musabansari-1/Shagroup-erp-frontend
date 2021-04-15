import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "../../../axios";
import {useLocation} from 'react-router-dom';
import numToString from '../../../numToString';

import "./Reciept.css";

const Reciept = (props) => {
  const [detail, setDetail] = useState({});
  const [receivedFrom, setReceivedFrom] = useState();
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [paymentType, setPaymentType] = useState();
  const [amountInWords, setAmountInWords] = useState();

  const fetch_academic_data = (id, headers) => {
    // axios
    //   .get("accounts/all/fees/academic_internship_fees/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.map((item) => {
    //       if (item.received_from == id) {
    //         setDetail(item);
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(
        `accounts/all/fees/academic_internship_fees/${id}`,
        headers
      )
      .then((res) => {
      setDetail(res.data);

        axios
      .get(
        `administration/cognitive_solutions/programs/academic_internships/${res.data.received_from}/`,
        headers
      )
      .then((res) => {
      // alert(res.data.name);
      setReceivedFrom(res.data.name)
      })
      .catch((err) => console.log(err));

  
       })
      .catch((err) => console.log(err));
      };
      

  const fetch_student_project_data = (id, headers) => {
    axios
      .get(
        `accounts/all/fees/student_project_fees/${id}`,
        headers
      )
      .then((res) => {
        setDetail(res.data);
        const amount = numToString(res.data.amount.toString());
        setAmountInWords(amount);
        axios
      .get(
        `administration/codelab_systems/student_projects/student_projects/${res.data.received_from}/`,
        headers
      )
      .then((res) => {
      // alert(res.data.name);
      setReceivedFrom(res.data.name)
      })
      .catch((err) => console.log(err));
      
       })
      .catch((err) => console.log(err));

  }
  const fetch_academic_workshop_data = (id, headers) => {
    // axios
    //   .get("accounts/all/fees/academic_internship_fees/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.map((item) => {
    //       if (item.received_from == id) {
    //         setDetail(item);
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(
        `accounts/all/fees/academic_workshop_fees/${id}`,
        headers
      )
      .then((res) => {
        setDetail(res.data);
        axios
      .get(
        `administration/cognitive_solutions/programs/academic_workshops/${res.data.received_from}/`,
        headers
      )
      .then((res) => {
      // alert(res.data.name);
      setReceivedFrom(res.data.name)
      })
      .catch((err) => console.log(err));
      
       })
      .catch((err) => console.log(err));

      

  };


  const fetch_cognitive_data = (id, headers) => {
    // axios
    //   .get("accounts/all/fees/cognitive_internship_fees/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.map((item) => {
    //       if (item.received_from == id) {
    //         setDetail(item);
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(
        `accounts/all/fees/cognitive_internship_fees/${id}`,
        headers
      )
      .then((res) => {
        // setReceivedFrom(res.data.name);
        console.log("detail" + res.data)
        setDetail(res.data);

        axios
      .get(
        `administration/cognitive_solutions/programs/cognitive_internships/${res.data.received_from}/`,
        headers
      )
      .then((res) => {
      // alert(res.data.name);
      setReceivedFrom(res.data.name)
      })
      .catch((err) => console.log(err));

      })
      .catch((err) => console.log(err));

    // axios
    //   .get(
    //     `administration/cognitive_solutions/programs/cognitive_internships/${id}`,
    //     headers
    //   )
    //   .then((res) => setReceivedFrom(res.data.name))
    //   .catch((err) => console.log(err));
  };

  const fetch_cognitive_workshop_data = (id, headers) => {
    // axios
    //   .get("accounts/all/fees/cognitive_internship_fees/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.map((item) => {
    //       if (item.received_from == id) {
    //         setDetail(item);
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(
        `accounts/all/fees/cognitive_workshop_fees/${id}`,
        headers
      )
      .then((res) => {
        // setReceivedFrom(res.data.name);
        setDetail(res.data);
        axios
      .get(
        `administration/cognitive_solutions/programs/cognitive_workshops/${res.data.received_from}/`,
        headers
      )
      .then((res) => {
      // alert(res.data.name);
      setReceivedFrom(res.data.name)
      })
      .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    // axios
    //   .get(
    //     `administration/cognitive_solutions/programs/cognitive_internships/${id}`,
    //     headers
    //   )
    //   .then((res) => setReceivedFrom(res.data.name))
    //   .catch((err) => console.log(err));
  };

  const fetch_employee_data = (id, headers) => {
    // axios
    //   .get("accounts/all/fees/employee_internship_fees/", headers)
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data.map((item) => {
    //       if (item.received_from == id) {
    //         setDetail(item);
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(
        `accounts/all/fees/employee_internship_fees/${id}`,
        headers
      )
      .then((res) => {
        // setReceivedFrom(res.data.name);
        setDetail(res.data);
        axios
      .get(
        `administration/cognitive_solutions/programs/employee_internships/${res.data.received_from}/`,
        headers
      )
      .then((res) => {
      // alert(res.data.name);
      setReceivedFrom(res.data.name)
      })
      .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const fetchData = () => {
    const id = props.match.params.id;
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    props.match.params.type === "ACADEMIC INTERNSHIP" &&
      fetch_academic_data(id, headers);

    props.match.params.type === "COGNITIVE INTERNSHIP" &&
      fetch_cognitive_data(id, headers);

    props.match.params.type === "EMPLOYEE INTERNSHIP" &&
      fetch_employee_data(id, headers);

    props.match.params.type === "ACADEMIC WORKSHOP" && 
      fetch_academic_workshop_data(id, headers);
      
      props.match.params.type === "COGNITIVE WORKSHOP" && 
      fetch_cognitive_workshop_data(id, headers);
      
      props.match.params.type === "STUDENT PROJECT" && 
      fetch_student_project_data(id, headers);

    axios
      .get(`/accounts/all/fees/payment_type/`, headers)
      .then((res) => {
        setPaymentTypes(res.data);
      })
      .catch((err) => console.log(err));

      // axios
      // .get(`accounts/all/fees/academic_internship_fees/${id}/`, headers)
      // .then((res) => {
      //   setDetail(res.data);
      // })
      // .catch((err) => console.log(err));

  };

  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    paymentTypes.map((item) => {
      if (item.id === detail.mode_of_payment) {
        setPaymentType(item.name);
      }
    });
  }, [detail, paymentTypes]);




  return (
    <div className="reciept" style={{ width: "100%" }}>
      <Row>
        <Col md="12">
          <Card
            className="reciept__card"
          >
            <CardBody>
              <Form id="printForm">
                <FormGroup>
                <Row>
                    <Col md="3" className="mr-auto">
                      <h1>SHA GROUP</h1>
                    </Col>
                    <Col md="3" className="ml-auto">
                     <strong> 5th Floor, Shalimar Complex,<br/>
                      Kankanady, Mangalore.<br/>
                      7349350390/0824-4283434  </strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" className="mr-auto">
                      Date: {detail.date}
                    </Col>
                    <Col md="3" className="ml-auto">
                      Receipt No: {detail.receipt_no}
                      {/* <Input disabled value={detail.receipt_no} /> */}
                    </Col>
                  </Row>
                </FormGroup>
                  <div className="receipt__info">
                  Received From : {receivedFrom}
                  </div>
                  {/* <Label>Recieved From</Label> */}
                  {/* <Input disabled value={receivedFrom} /> */}
                <div className="receipt__info">
                  Received For: {props.match.params.type}
                  </div>
                  {/* <Label>Recieved For</Label>
                  <Input value={props.match.params.type} readOnly /> */}
                {/* <Row>
                   <Col md="12" className="mr-auto">
                   <p>Purpose</p>
                   </Col>
                   <Col>
                   </Col>
                   <Col>
                   </Col>
               </Row>
               <Row style={{border: '1px solid #CED4DA', marginLeft: '5px',marginRight: '5px',marginBottom: '10px', padding: '10px'}}>
                   <Col md="6" >
                   <FormGroup check>
                    <Input type="checkbox" name="check" id="registrationCheck"/>
                    <Label for="registrationCheck" check>Registration</Label>
      </FormGroup>
      </Col>
      <Col md="6" >
                   <FormGroup check>
                    <Input type="checkbox" name="check" id="internshipCheck"/>
                    <Label for="internshipCheck" check>Internship</Label>
      </FormGroup>
                   </Col>
               </Row> */}
                  <div className="receipt__info">
                  Mode of Payment : {paymentType}
                  </div>

                  <div className="receipt__info">
                  Amount : {detail.amount}
                  </div>
                  {/* <Label>Mode of Payment</Label> */}
                  {/* <Input type="text" disabled value={paymentType} /> */}
                <Row >
                  <Col md="10">
                  <div className="receipt__info">
                  Amount in Words : {amountInWords} rupees only
                  </div>
                    {/* <Button
                      style={{
                        backgroundColor: "#00C99A",
                        color: "white",
                        width: "100%",
                      }}
                      onClick={() => {}}
                    >
                      <b>AMOUNT : {detail.amount}</b>
                    </Button> */}
                  </Col>
                  <Col md="2">
                    <div className="receipt__info">
                      Signature
                    {/* <hr style={{ backgroundColor: "black" }} /> */}
                    </div>
                  </Col>
                </Row>
              </Form>
              <Button
                id="printbtn"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  width: "100%",
                  marginTop: "35px",
                  marginBottom: "10px",
                }}
                onClick={() => window.print()}
              >
                PRINT
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reciept;

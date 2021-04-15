import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import { useHistory } from "react-router-dom";

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
  Form,
  FormGroup,
  Label,
} from "reactstrap";

import "../InternshipList/InternshipList.css";
import Modal from '../../../../components/Modal/Modal';
import numToString from '../../../../numToString';

const BatchesList = (props) => {
  // console.log(internshipId);

  const history = useHistory();
  const [batchwiseStudentsList, setBatchwiseStudentsList] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [payment, setPayment] = useState({});
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState("");
  const [paymentType, setPaymentType] = useState([]);
  const [batchId, setBatchId] = useState(props.match.params.batchId);
  const [studentRegisterNo, setStudentRegisterNo] = useState();

  let totalActualFees = 0,
    totalPaidFees = 0,
    totalBalance = 0;
  totalActualFees += batchwiseStudentsList.reduce((sum, obj) => {
    return sum + obj.actual_fees;
  }, 0);
  totalPaidFees += batchwiseStudentsList.reduce((sum, obj) => {
    return sum + obj.paid;
  }, 0);
  totalBalance += batchwiseStudentsList.reduce((sum, obj) => {
    return sum + obj.balance;
  }, 0);

  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      Authorization: ` Token ${token}`,
    },
  };

  const fetchData = () => {
    // // fetch academic internship students list
    // axios.get(`administration/cognitive_solutions/programs/academic_internships/?batch=${batchId}`, headers)
    // .then(res =>{
    //     console.log(res.data);
    //     setAiStudentsList(res.data)
    // })
    // .catch(err => console.log(err));

    // // fetch cognitive internship students list
    // axios.get(`administration/cognitive_solutions/programs/cognitive_internships/?batch=${batchId}`, headers)
    // .then(res =>{
    //     console.log(res.data);
    //     setCiStudentsList(res.data)
    // })
    // .catch(err => console.log(err));

    // // employee internship students list
    // axios.get(`administration/cognitive_solutions/programs/employee_internships/?batch=${batchId}`, headers)
    // .then(res =>{
    //     console.log(res.data);
    //     setEiStudentsList(res.data)
    // })
    // .catch(err => console.log(err));

    axios
      .get(`accounts/all/fees/batchwise_students/?batch=${batchId}`, headers)
      .then((res) => {
        console.log(res.data);
        setBatchwiseStudentsList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `administration/cognitive_solutions/programs/batches/${batchId}`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setBatchName(res.data.name);
      })
      .catch((err) => console.log(err));


      axios
      .get("accounts/all/fees/payment_type/", headers)
      .then((res) => {
        console.log(res.data);
        setPaymentType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      amount_in_words: numToString(payment.amount),
      id: "345",
      received_from: parseInt(studentId),
    };
    console.log(data);
    if(studentRegisterNo.substring(0, 2) === 'AI'){
      axios
      .post("accounts/all/fees/academic_internship_fees/", data, headers)
      .then((res) => {
        console.log(res.data);
        setSuccessResponse("Form Submitted Successfully");
        setSuccessResponseModal(true);
        fetchData();
        setStudentRegisterNo('');
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(err.response.data);
        setErrorResponseModal(true);
      });
    }

    if(studentRegisterNo.substring(0, 2) === 'CI'){
      axios
      .post("accounts/all/fees/cognitive_internship_fees/", data, headers)
      .then((res) => {
        console.log(res.data);
        setSuccessResponse("Form Submitted Successfully");
        setSuccessResponseModal(true);
        fetchData();
        setStudentRegisterNo('');
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(err.response.data);
        setErrorResponseModal(true);
      });
    }

    if(studentRegisterNo.substring(0, 2) === 'EI'){
      axios
      .post("accounts/all/fees/employee_internship_fees/", data, headers)
      .then((res) => {
        console.log(res.data);
        setSuccessResponse("Form Submitted Successfully");
        setSuccessResponseModal(true);
        fetchData();
        setStudentRegisterNo('');
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(err.response.data);
        setErrorResponseModal(true);
      });
    }
    
  };

  const paymentInputHandler = (event) => {
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="internshipList">
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
          header="Pay Now"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
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
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="table__header">
              <CardTitle tag="h4">Students of {batchName}</CardTitle>
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
              <h6>
                Number of students: {batchwiseStudentsList.length} &nbsp; Total
                Actual Fees: {totalActualFees} &nbsp; Total Paid Fees:{" "}
                {totalPaidFees} &nbsp; Total Balance = {totalBalance} &nbsp;
              </h6>
              <Table>
                <thead className="text-primary">
                  <tr>
                    <th>PROFILE PIC</th>
                    <th>REGISTER NO</th>
                    <th>NAME</th>
                    <th>CONTACT</th>
                    <th>ACTUAL FEES</th>
                    <th>PAID FEES</th>
                    <th>BALANCE</th>
                    <th>PAY</th>
                  </tr>
                </thead>
                <tbody>
                  {batchwiseStudentsList.map((listItem) => {
                    return (
                      <tr
                        className="tableRow"
                        // onClick={() => {
                        //   history.push(
                        //     history.push(
                        //       `/administration/cognitiveSolutions/studentsList/${listItem.id}`
                        //     )
                        //   );
                        // }}
                      >
                        <td>
                          <img
                            height="50px"
                            width="50px"
                            src={`http://localhost:8000${listItem.profile_pic}`}
                            alt=""
                          />
                        </td>
                        <td>{listItem.register_no}</td>
                        <td>{listItem.name}</td>
                        <td>{listItem.contact_1}</td>
                        <td>{listItem.actual_fees}</td>
                        <td>{listItem.paid}</td>
                        <td>{listItem.balance}</td>
                        <td>
                          {listItem.balance === 0 ? (
                            <p>paid</p>
                          ) : (
                            // <Button
                            //   onClick={() => {
                            //     history.push(`${url.url}/receipt/${'ACADEMIC INTERNSHIP'}/${listItem.id}`)
                            //   }
                            //   }
                            // >
                            //   VIEW DETAILS
                            // </Button>
                            <Button
                              onClick={() => {
                                setStudentId(listItem.id);
                                setStudentRegisterNo(listItem.register_no);
                                // axios
                                //   .get(
                                //     "accounts/all/fees/payment_type/",
                                //     headers
                                //   )
                                //   .then((res) => {
                                //     console.log(res.data);
                                //     setPaymentType(res.data);
                                //   })
                                //   .catch((err) => {
                                //     console.log(err);
                                //   });
                                setStudentName(listItem.name);
                                setModalOpen(true);
                              }}
                            >
                              PAY NOW
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* <h3>Students</h3>
            <h6>Number of students: {aistudentsList.length + cistudentsList.length + eistudentsList.length}</h6>
            {
                aistudentsList.map(aiStudentItem => 
                    <div className="internshipsList__item" onClick={() => history.push('')}>{aiStudentItem.name}</div>
                    ) 
            }
            {
            cistudentsList.map(ciStudentItem => 
                        <div className="internshipsList__item">{ciStudentItem.name}</div>
                ) 
            }  
            {
            eistudentsList.map(eiStudentItem => 
                        <div className="internshipsList__item" >{eiStudentItem.name}</div>
                ) 
            }   */}
    </div>
  );
};

export default BatchesList;

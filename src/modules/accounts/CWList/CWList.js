import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../axios";
import Modal from '../../../components/Modal/Modal';
import numToString from '../../../numToString';


import "./CWList.css";

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
  Label,
} from "reactstrap";

const CWList = ({url}) => {
  const history = useHistory();

  const [list, setList] = useState([]);
  const [frontends, setFrontends ] = useState([]);
  const [backends, setBackends] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [payment, setPayment] = useState({});
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState();
  const [paymentType, setPaymentType] = useState([]);
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);


  const fetchData = () => {
    const url = "administration/cognitive_solutions/programs/cognitive_workshops/";
    const token = localStorage.getItem('token');
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
    .get("administration/cognitive_solutions/programs/frontends/", headers)
    .then((res) => {
      console.log(res.data);
      const frontend = []
      for(const key in res.data){
        frontend[res.data[key].id] = res.data[key].name 
      }
      setFrontends(frontend);
    })
    .catch((err) => {
      console.log(err);
    });

    axios
    .get("administration/cognitive_solutions/programs/backends/", headers)
    .then((res) => {
      console.log(res.data);
      const backend = []
      for(const key in res.data){
        backend[res.data[key].id] = res.data[key].name 
      }
      setBackends(backend);
    })
    .catch((err) => {
      console.log(err);
    });


    axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
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
      id: '345',
      received_from: parseInt(studentId),
    };
    console.log(data);
    alert(JSON.stringify(data));
    axios
      .post("accounts/all/fees/cognitive_workshop_fees/", data, headers)
      .then((res) => {
        console.log(res.data);
        setSuccessResponse('Form Submitted Successfully')
        setSuccessResponseModal(true);
        fetchData();
      setModalOpen(false);
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
      [event.target.name]: event.target.value
    })
  };

  return (
    <>
      <div className="cognitiveList" >
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
                <CardTitle tag="h4">Students</CardTitle>
                {/* <form >
              <InputGroup className="no-border search">
                <Input  placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              </form> */}
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>PROFILE PIC</th>
                      <th>REGISTER NO</th>
                      <th>NAME</th>
                      <th>PAY</th>
                      <th>VIEW</th>
                      {/* <th>CONTACT</th>
                      <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((listItem) => {
                      return (
                        <tr
                          className="tableRow"
                        >
                          <td><img src={listItem.profile_pic} alt="PROFILE PIC" height="100px" width="100px" /></td>
                          <td>{listItem.register_no}</td>
                          <td>{listItem.name}</td>
                          <td>
                            {listItem.is_fees_paid ? (
                              <p>paid</p>
                              // <Button
                              //   onClick={() => { 
                              //     history.push(`${url.url}/receipt/${'ACADEMIC INTERNSHIP'}/${listItem.id}`)
                              //   }
                              //   }
                              // >
                              //   VIEW DETAILS
                              // </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  setStudentId(listItem.id);
                                  setStudentName(listItem.name);
                                  setModalOpen(true);
                                }}
                              >
                                PAY NOW
                              </Button>
                            )}
                          </td>
                          <td>
                           <Button
                                onClick={() => { 
                                  // history.push(`${url}/reciept_list/${'ACADEMIC INTERNSHIP'}/${listItem.register_no}`)
                                  history.push({
                                    pathname: `${url}/reciept_list/${'COGNITIVE WORKSHOP'}/${listItem.register_no}`,
                                    // search: '?query=abc',
                                    data: {url: url }
                                });
                                  // history.push(`${url.url}/receipt/${'ACADEMIC INTERNSHIP'}/${listItem.id}`)
                                }
                                }
                              >
                                VIEW DETAILS
                              </Button>
                          </td>
                          {/* <td>{listItem.contact_1}</td>
                          <td>{frontends[listItem.frontend]}</td>
                          <td>{backends[listItem.backend]}</td> */}
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
    </>
  );
};

export default CWList;

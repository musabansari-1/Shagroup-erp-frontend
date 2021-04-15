import React, {useState, useEffect} from 'react';
import axios from '../../../axios';

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

  import './RecieptList.css';
import { useRouteMatch, useHistory, useLocation } from 'react-router';

const RecieptList = (props) => {
  const location = useLocation();
    const [receiptList, setReceiptList] = useState([]);
    // const [url, setUrl] = useState('')
    const history = useHistory();
    let {path, url} = useRouteMatch();

    const type = props.match.params.type;
    const registerNo = props.match.params.register_no;
    // const url = location?.data?.url

    // const url = location?.data?.url;
    console.log("location.data.url is", location?.data?.url);
    // setUrl(data_url);
    // console.log('url from receipt list', url)
    console.log('url from receipts list' , location?.data?.url)

    const fetchData = () => {
        const token = localStorage.getItem("token");
        const headers = {
          headers: {
            Authorization: ` Token ${token}`,
          }
        };
        
        if(type === 'ACADEMIC INTERNSHIP')
        {    
        axios.get(`accounts/all/fees/academic_internship_fees/?search=${registerNo}`, headers)
        .then(res => setReceiptList(res.data))
        .catch(err => console.log(err));
        }

        if(type === 'COGNITIVE INTERNSHIP')
        {    
        axios.get(`accounts/all/fees/cognitive_internship_fees/?search=${registerNo}`, headers)
        .then(res => setReceiptList(res.data))
        .catch(err => console.log(err));
        }

        if(type === 'EMPLOYEE INTERNSHIP')
        {    
        axios.get(`accounts/all/fees/employee_internship_fees/?search=${registerNo}`, headers)
        .then(res => setReceiptList(res.data))
        .catch(err => console.log(err));
        }

        if(type === 'ACADEMIC WORKSHOP')
        {    
        axios.get(`accounts/all/fees/academic_workshop_fees/?search=${registerNo}`, headers)
        .then(res => setReceiptList(res.data))
        .catch(err => console.log(err));
        }

        if(type === 'COGNITIVE WORKSHOP')
        {    
        axios.get(`accounts/all/fees/cognitive_workshop_fees/?search=${registerNo}`, headers)
        .then(res => setReceiptList(res.data))
        .catch(err => console.log(err));
        }

        if(type === 'STUDENT PROJECT')
        {    
        axios.get(`accounts/all/fees/student_project_fees/?search=${registerNo}`, headers)
        .then(res => setReceiptList(res.data))
        .catch(err => console.log(err));
        }
        

    }

    useEffect(() => {
       fetchData();
    }, [])


    return (
        <div className="receiptList">
            <Row>
          <Col md="12">
            <Card className="receiptList__card">
              <CardHeader className="table__header">
                <CardTitle tag="h4">Reciepts</CardTitle>
                <form>
                  <InputGroup className="no-border search">
                    <Input placeholder="Search..." />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="nc-icon nc-zoom-split" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>RECEIPT NO</th>
                      <th>DATE</th>
                      <th>AMOUNT</th>
                      <th>VIEW</th>
                      {/* <th></th>
                      <th>VIEW</th> */}
                      {/* <th>CONTACT</th>
                      <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {receiptList.map((receipt) => {
                      return (
                        <tr className="tableRow">
                          <td>{receipt.receipt_no}</td>
                          <td>{receipt.date}</td>
                          <td>{receipt.amount}</td>
                          <td><Button onClick={() => {
                              
                              history.push(`/accounts/reciept_list/${type}/${registerNo}/${receipt.id}`)
                            //   history.push({
                            //     pathname: `accounts/receipt/${type}/${receipt.id}`,
                            //     // search: '?query=abc',
                            //     // data: { url: url }
                            // });
                          }}>View</Button></td>
                          {/* <td>
                            {listItem.is_fees_paid ? (
                              <p>paid</p>
                              // <Button
                              //   onClick={() => { 
                                //   history.push(`${url.url}/receipt/${'ACADEMIC INTERNSHIP'}/${listItem.id}`)
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
                                  history.push(`${url}/reciept_list/${listItem.register_no}`)
                                  // history.push(`${url.url}/receipt/${'ACADEMIC INTERNSHIP'}/${listItem.id}`)
                                }
                                }
                              >
                                VIEW DETAILS
                              </Button>
                          </td> */}
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
    )
}

export default RecieptList

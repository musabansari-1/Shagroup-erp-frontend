import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import Modal from "../../../components/Modal/Modal";
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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

// import "./Fees.css";

const CodeLabFees = ({url}) => {
  const history = useHistory();
  const [ailist, setAiList] = useState([]);
  const [ciList, setCiList] = useState([]);
  const [eiList, setEiList] = useState([]);
  const [awList, setAwList] = useState([]);
  const [cwList, setCwList] = useState([]);
  const [accountHeads, setAccountHeads] = useState([]);
  const [dates, setDates] = useState({});
  // let [totalFees, setTotalFees] = useState(0);
  let totalFees = 0;
  totalFees += ailist.reduce((sum, obj) => { return sum + obj.amount; }, 0);
  totalFees += ciList.reduce((sum, obj) => { return sum + obj.amount; }, 0);
  totalFees += eiList.reduce((sum, obj) => { return sum + obj.amount; }, 0);
  totalFees += awList.reduce((sum, obj) => { return sum + obj.amount; }, 0);
  totalFees += cwList.reduce((sum, obj) => { return sum + obj.amount; }, 0);


  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      Authorization: ` Token ${token}`,
    },
  };

  const fetchFeesList = () => {
    axios
      .get('accounts/all/fees/academic_internship_fees/', headers)
      .then((res) => {
        console.log(res.data);
        setAiList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get('accounts/all/fees/cognitive_internship_fees/', headers)
      .then((res) => {
        console.log(res.data);
        setCiList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
      axios
      .get('accounts/all/fees/employee_internship_fees/', headers)
      .then((res) => {
        console.log(res.data);
        setEiList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get('accounts/all/fees/academic_workshop_fees/', headers)
      .then((res) => {
        console.log(res.data);
        setAwList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get('accounts/all/fees/cognitive_workshop_fees/', headers)
      .then((res) => {
        console.log(res.data);
        setCwList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get('accounts/all/expenses/account_heads/', headers)
      .then((res) => {
        console.log(res.data);
        setAccountHeads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFeesList();
  }, []);

//   const paidStatusHandler = (listItem) => {
//     const url = `accounts/all/expenses/expenses/${listItem.id}/`;
//     axios.put(url, {...listItem, paid_status: true}, headers).then(response => getList()
//     )
//     .catch(err => console.log(err));
//   };

//   const deleteHandler = (id) => {
//     const url = `accounts/all/expenses/expenses/${id}`;
//     axios.delete(url, headers).then(response =>
//         getList()
//     ).catch(err => console.log(err))
//   };


  const dateSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };


    axios
      .get(`accounts/all/fees/academic_internship_fees/?date__range=${dates.from_date},${dates.to_date}`, headers)
      .then((res) => {
        console.log(res.data);
        setAiList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`accounts/all/fees/cognitive_internship_fees/?date__range=${dates.from_date},${dates.to_date}`, headers)
      .then((res) => {
        console.log(res.data);
        setCiList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
      axios
      .get(`accounts/all/fees/employee_internship_fees/?date__range=${dates.from_date},${dates.to_date}`, headers)
      .then((res) => {
        console.log(res.data);
        setEiList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`accounts/all/fees/academic_workshop_fees/?date__range=${dates.from_date},${dates.to_date}`, headers)
      .then((res) => {
        console.log(res.data);
        setAwList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`accounts/all/fees/cognitive_workshop_fees/date__range=${dates.from_date},${dates.to_date}`, headers)
      .then((res) => {
        console.log(res.data);
        setCwList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get('accounts/all/expenses/account_heads/', headers)
      .then((res) => {
        console.log(res.data);
        setAccountHeads(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  const dateInputHandler = (event) => {
    setDates({
      ...dates,
      [event.target.name]: event.target.value,
    });
  };

  
  return (
    <div className="fees">
      <Row>
        <Col md="12">
          <Card className="scrollableCard">
            <CardHeader className="table__header">
              <CardTitle tag="h4">Code Lab Fees</CardTitle>
              {/* <form>
                <InputGroup className="no-border search">
                  <Input placeholder="Search..." />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </form> */}
              <Form onSubmit={dateSubmitHandler} className="statement__form">
                <Label className="statement__label">From</Label>
                <Input
                  type="date"
                  name="from_date"
                  onChange={dateInputHandler}
                />
                <Label className="statement__label">To</Label>
                <Input type="date" name="to_date" onChange={dateInputHandler} />
                <Button>View</Button>
              </Form>
              {/* <Button
                onClick={() => {
                  history.push(`${url}/add_expenses`);
                }}
              >
                Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </Button> */}
            </CardHeader>
            <CardBody>
            <h6><strong>Total Fees Collected: {totalFees}</strong></h6>
            <Button
                id="printbtn"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  width: "10%",
                  marginTop: "10",
                  marginBottom: "10px",
                }}
                onClick={() => window.print()}
              >
                PRINT
              </Button>
              <Table>
                <thead className="text-primary">
                  <tr>
                    <th>DATE</th>
                    <th>RECEIPT NO</th>
                    <th>AMOUNT</th>
                    {/* <th>PAID BY</th>
                    <th>PAID AMOUNT</th>
                    <th>PAID STATUS</th>
                    <th>DELETE</th> */}
                    {/* <th>CONTACT</th>
                      <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                  </tr>
                </thead>
                <tbody>
                  {ailist.map((aiListItem) => {
                    totalFees += aiListItem.amount;
                    return (
                      <tr className="tableRow">
                        <td>{aiListItem.date}</td>
                        <td>{aiListItem.receipt_no}</td>
                        <td>{aiListItem.amount}</td>
                      </tr>
                    );
                  })}
                  {ciList.map((ciListItem) => {
                    totalFees += ciListItem.amount;
                    return (
                      <tr className="tableRow">
                        <td>{ciListItem.date}</td>
                        <td>{ciListItem.receipt_no}</td>
                        <td>{ciListItem.amount}</td>
                      </tr>
                    );
                  })}
                  {eiList.map((eiListItem) => {
                    totalFees += eiListItem.amount;
                    return (
                      <tr className="tableRow">
                        <td>{eiListItem.date}</td>
                        <td>{eiListItem.receipt_no}</td>
                        <td>{eiListItem.amount}</td>
                      </tr>
                    );
                  })}
                  {awList.map((awListItem) => {
                    return (
                      <tr className="tableRow">
                        <td>{awListItem.date}</td>
                        <td>{awListItem.receipt_no}</td>
                        <td>{awListItem.amount}</td>
                      </tr>
                    );
                  })}
                  {cwList.map((cwListItem) => {
                    return (
                      <tr className="tableRow">
                        <td>{cwListItem.date}</td>
                        <td>{cwListItem.receipt_no}</td>
                        <td>{cwListItem.amount}</td>
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
  );
};

export default CodeLabFees;


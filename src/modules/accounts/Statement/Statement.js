import React, { useState, useEffect } from "react";
import axios from "../../../axios";

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
  Label,
  Form,
} from "reactstrap";

import "./Statement.css";

const Statement = () => {
  const [statement, setStatement] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [openingBalance, setOpeningBalance] = useState();
  const [closingBalance, setClosingBalance] = useState();
  let [balance, setBalance] = useState();
  const [dates, setDates] = useState({});

  const fetchData = () => {
    const url = "accounts/all/expenses/statements/";
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setStatement(res.data.statements);
        setFromDate(res.data.from_date);
        setToDate(res.data.to_date);
        setOpeningBalance(res.data.opening_balance);
        setClosingBalance(res.data.closing_balance);
        setBalance(res.data.opening_balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dateSubmitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    //   axios({
    //     method: 'get',
    //     url: 'accounts/all/expenses/statements/',
    //     data: dates,
    //     headers: headers,
    //     ''
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setStatement(res.data.statements);
    //   setFromDate(res.data.from_date);
    //   setToDate(res.data.to_date);
    //   setOpeningBalance(res.data.opening_balance);
    //   setClosingBalance(res.data.closing_balance);
    //   setBalance(res.data.opening_balance)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .get(
        `accounts/all/expenses/statements/?from_date=${dates.from_date}&to_date=${dates.to_date}`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setStatement(res.data.statements);
        setFromDate(res.data.from_date);
        setToDate(res.data.to_date);
        setOpeningBalance(res.data.opening_balance);
        setClosingBalance(res.data.closing_balance);
        setBalance(res.data.opening_balance);
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
    <div className="statement">
      <Row>
        <Col md="12">
          <Card className="statement__card">
            <CardHeader className="table__header statement__header">
              <CardTitle tag="h4">Statement</CardTitle>
              <div className="statement__dates">
                <p >From: {fromDate}</p>
                <p >To: {toDate}</p>
              </div>
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
            </CardHeader>
            <CardBody>
                <div className="statement__balance">
              <p>Opening Balance: {openingBalance}</p>
              <p>Closing Balance: {closingBalance}</p>
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
              </div>
              <Table>
                <thead className="text-primary">
                  <tr>
                    <th>DATE</th>
                    <th>ACCOUNT HEAD</th>
                    <th>DESCRIPTION</th>
                    <th>DEBIT</th>
                    <th>CREDIT</th>
                    <th>BALANCE</th>
                    {/* <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                  </tr>
                </thead>
                <tbody>
                  {statement.map((statementItem) => {
                    balance = statementItem.debit
                      ? balance + statementItem.debit
                      : balance - statementItem.credit;
                    return (
                      <tr
                        className="tableRow"
                        //   onClick={() => {
                        //     history.push(`academic_internship/${listItem.id}`);
                        //   }}
                      >
                        <td>{statementItem.date}</td>
                        <td>{statementItem.account_head}</td>
                        <td>{statementItem.description}</td>
                        <td>{statementItem.debit ? statementItem.debit : 0}</td>
                        <td>
                          {statementItem.credit ? statementItem.credit : 0}
                        </td>
                        <td>{balance}</td>
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

export default Statement;

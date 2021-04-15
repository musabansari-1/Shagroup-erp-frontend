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

import "./ExpenseList.css";

const ExpenseList = ({url}) => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [accountHeads, setAccountHeads] = useState([]);
  const [dates, setDates] = useState({});
  const [divisions, setDivisions] = useState([]);


  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      Authorization: ` Token ${token}`,
    },
  };

  const getList = () => {
    const url = "accounts/all/expenses/expenses/";
    axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .options('accounts/all/expenses/expenses/', headers)
      .then((res) => {
        console.log(res.data);
        setDivisions(res.data.actions.POST.division.choices);
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
    getList();
  }, []);

  const paidStatusHandler = (listItem) => {
    const url = `accounts/all/expenses/expenses/${listItem.id}/`;
    axios.put(url, {...listItem, paid_status: true}, headers).then(response => getList()
    )
    .catch(err => console.log(err));
  };

  const deleteHandler = (id) => {
    const url = `accounts/all/expenses/expenses/${id}`;
    axios.delete(url, headers).then(response =>
        getList()
    ).catch(err => console.log(err))
  };


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
        `accounts/all/expenses/expenses/?paid_date__range=${dates.from_date},${dates.to_date}`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setList(res.data);
        // setStatement(res.data.statements);
        // setFromDate(res.data.from_date);
        // setToDate(res.data.to_date);
        // setOpeningBalance(res.data.opening_balance);
        // setClosingBalance(res.data.closing_balance);
        // setBalance(res.data.opening_balance);
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
    <div className="expenseList">
      <Row>
        <Col md="12">
          <Card className="expenseCard">
            <CardHeader className="table__header">
              <CardTitle tag="h4">Expenses</CardTitle>
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
              <Button
                onClick={() => {
                  history.push(`${url}/add_expenses`);
                }}
              >
                Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </Button>
            </CardHeader>
            <CardBody>
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
                    <th>ACCOUNT HEAD</th>
                    <th>DESCRIPTION</th>
                    <th>PAID BY</th>
                    <th>PAID AMOUNT</th>
                    <th>DIVISION</th>
                    <th>PAID STATUS</th>
                    <th>DELETE</th>
                    {/* <th>CONTACT</th>
                      <th>FRONTEND</th>
                      <th>BACKEND</th> */}
                  </tr>
                </thead>
                <tbody>
                  {list.map((listItem) => {
                    return (
                      <tr className="tableRow">
                        <td>{listItem.paid_date}</td>
                        <td>{accountHeads.map(accountHead => accountHead.id === listItem.account_head && accountHead.name)}</td>
                        <td>{listItem.description}</td>
                        <td>{listItem.paid_by}</td>
                        <td>{listItem.paid_amount}</td>
                        <td>{divisions.map(division => division.value == listItem.division && division.display_name)}</td>
                        <td>
                          {listItem.paid_status ? (
                            "Paid"
                          ) : (
                            <div className="expenseList__notPaid">
                              Not paid
                              <Button onClick={() => paidStatusHandler(listItem)}>
                                Pay
                              </Button>
                            </div>
                          )}
                        </td>
                        <td>
                          <Button onClick={() => deleteHandler(listItem.id)}>
                            Delete
                          </Button>
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
    </div>
  );
};

export default ExpenseList;

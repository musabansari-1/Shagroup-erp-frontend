import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Expenses.css";
import {useHistory} from 'react-router-dom';
import Modal from "../../../components/Modal/Modal";
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
  CardHeader,
  CardTitle,
} from "reactstrap";
import axios from "../../../axios";

const Expenses = () => {
  const history = useHistory();
  const [accountHeads, setAccountHeads] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);



  const token = localStorage.getItem("token");
  const headers = {
    headers: {
      Authorization: ` Token ${token}`,
    },
  };

  useEffect(() => {
    const url = "accounts/all/expenses/account_heads/";
    axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setAccountHeads(res.data);
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

  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: "",
      paid_by: "",
      paid_date: null,
      paid_amount: null,
      paid_status: false,
      account_head: null,
      division: null,
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
      const url = "accounts/all/expenses/expenses/";
      // const token = localStorage.getItem("token");
      // const headers = {
      //   headers: {
      //     Authorization: ` Token ${token}`,
      //   },
      // };
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
          resetForm({ values: "" });
          history.push('administration/expenses');
        })
        .catch((err) => {
          console.log(err);
          setErrorResponse(err.response.data);
          setErrorResponseModal(true)
        });
    },
  });

  return (
    <div className="expenses">
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
      <Row>
        <Col md="12">
          <Card className="expenses__card">
            <CardHeader>
              <CardTitle tag="h5">Expense</CardTitle>
            </CardHeader>
            <CardBody className="expenses__cardBody">
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Account Head</Label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("account_head")}
                      >
                        <option selected></option>
                        {accountHeads.map((accountHead) => (
                          <option value={accountHead.id}>
                            {accountHead.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  {/* {formik.touched.course && formik.errors.course ? (
          <div className="error">{formik.errors.course}</div>
        ) : null} */}
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Description</label>
                      <Input
                        placeholder="Description"
                        type="textarea"
                        {...formik.getFieldProps("description")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Division</Label>
                      <Input
                        type="select"
                        {...formik.getFieldProps("division")}
                      >
                        <option selected></option>
                        {divisions.map((division) => (
                          <option value={division.value}>
                            {division.display_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  {/* {formik.touched.course && formik.errors.course ? (
          <div className="error">{formik.errors.course}</div>
        ) : null} */}
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Paid By</label>
                      <Input
                        placeholder="Paid By"
                        type="text"
                        {...formik.getFieldProps("paid_by")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Paid To</label>
                      <Input
                        placeholder="Paid To"
                        type="text"
                        {...formik.getFieldProps("paid_to")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Paid Date</label>
                      <Input
                        type="date"
                        {...formik.getFieldProps("paid_date")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Paid Amount</label>
                      <Input
                        placeholder="Paid Amount"
                        type="number"
                        {...formik.getFieldProps("paid_amount")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>
                        <Input
                          type="checkbox"
                          {...formik.getFieldProps("paid_status")}
                        />{" "}
                        Paid Status
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  className="btn-round expenses__button"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Expenses;

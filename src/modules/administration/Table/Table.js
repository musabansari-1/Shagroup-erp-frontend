import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios";

import "./Table.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

const CustomTable = () => {
  const history = useHistory();

  const [list, setList] = useState([]);

  const fetchData = () => {
    const url = "cognitive_solutions/cognitive_internships/";
    const headers = {
      headers: {
        Authorization: " Token 176614547af0e4a06acddac6f3c435707f04ca85",
      },
    };
    axios
      .get(url)
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

  return (
    <>
      <div className="content" style={{ margin: "2%" }}>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Students</CardTitle>
                <Button
                  onClick={() => {
                    history.push("/airegister");
                  }}
                >
                  Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </Button>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>REGISTER NO</th>
                      <th>NAME</th>
                      <th>FRONTEND</th>
                      <th>BACKEND</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((listItem) => {
                      return (
                        <tr
                          className="tableRow"
                          onClick={() => {
                            history.push(`studentprofile/${listItem.id}`);
                          }}
                        >
                          <td>{listItem.register_no}</td>
                          <td>{listItem.name}</td>
                          <td>{listItem.frontend}</td>
                          <td>{listItem.backend}</td>
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

export default CustomTable;

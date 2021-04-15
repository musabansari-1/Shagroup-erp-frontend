import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import "./CognitiveSolution.css";
import SideBar from "../sidebar/sidebar";
import axios from "../../../axios";

const CognitiveSolution = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    axios
      .get("administration/cognitive_solutions/programs/overviews/", headers)
      .then((res) => {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <SideBar /> */}
      <div className="cognitive">
        <Card className="card cognitive__card">
          <Row className="cognitive__row1">
            <h2>COGNITIVE SOLUTION</h2>
            <div>
              <svg height="100" width="100">
                <svg height="100" width="100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="black"
                    stroke-width="3"
                    fill="#0093DD"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke="black"
                  stroke-width="3"
                  fill="white"
                />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div>
              <h3>{info.total}</h3>
            </div>
            <div>
              <h3>TOTAL</h3>
            </div>
          </Row>
          <Row
            className="cognitive__row2"
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Col
              xs="12"
              md="6"
              style={{ textAlign: "center" }}
              className="cognitive_row2_col1"
            >
              <div>
                <h4>COGNITIVE INTRENSHIP</h4>
              </div>
              <div className="cognitive_row1_col1_rows">
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.ci_students}</h4>
                  </div>
                  <div>
                    <h4>STUDENTS</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
              <h4>{info.ci_colleges}</h4>
                  </div>
                  <div>
                    <h4>COLLEGES</h4>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" style={{ textAlign: "center" }}>
              <div>
                <h4>ACADEMIC INTRENSHIP</h4>
              </div>
              <div className="cognitive_row1_col1_rows">
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
              <h4>{info.ai_students}</h4>
                  </div>
                  <div>
                    <h4>STUDENTS</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.ai_colleges}</h4>
                  </div>
                  <div>
                    <h4>COLLEGES</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row
            className="cognitive__row3"
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Col
              xs="12"
              md="6"
              style={{ textAlign: "center" }}
              className="cognitive_row2_col1"
            >
              <div>
                <h4>COGNITIVE WORKSHOP</h4>
              </div>
              <div className="cognitive_row1_col1_rows">
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.cw_students}</h4>
                  </div>
                  <div>
                    <h4>STUDENTS</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.cw_colleges}</h4>
                  </div>
                  <div>
                    <h4>COLLEGES</h4>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" style={{ textAlign: "center" }}>
              <div>
                <h4>COGNITIVE WORKSHOP</h4>
              </div>
              <div className="cognitive_row1_col1_rows">
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
              <h4>{info.cw_students}</h4>
                  </div>
                  <div>
                    <h4>STUDENTS</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.cw_colleges}</h4>
                  </div>
                  <div>
                    <h4>COLLEGES</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="cognitive__row4">
            <Col
              xs="12"
              md="4"
              className="ml-auto mr-auto"
              style={{ textAlign: "center" }}
            >
              <div>
                <h4>EMPLOYEE INTRENSHIP</h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <svg height="100" width="100">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill="#0093DD"
                    />
                    Sorry, your browser does not support inline SVG.
                  </svg>
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="black"
                    stroke-width="3"
                    fill="white"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: "20px",
                  }}
                >
                  <div>
                    <h4>{info.ei_employees}</h4>
                  </div>
                  <div>
                    <h4>EMPLOYEES</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                <h4>{info.ei_companys}</h4>
                  </div>
                  <div>
                    <h4>COMPANIES</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default CognitiveSolution;

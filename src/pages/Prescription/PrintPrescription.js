import React, { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GreenButton } from "../../components/Buttons";
import {
  Activity,
  Content,
  SidebarContainer,
  Wrapper,
} from "../../components/Common";
import Sidebar from "../../components/Sidebar";
import TextInput from "../../components/TextInput";
import TopBar from "../../components/TopBar";
import { getCookie } from "../../Utils/getCookie";
import "./printPrescription.css";

const PrintPrescription = forwardRef((props, ref, print) => {
  const { userRole } = props;
  const [patientId, setPatientId] = useState("");
  console.log(patientId);
  const [prescription, setPrescription] = useState(null);
  const [diagnoses, setDiagnosis] = useState(null);
  // console.log(prescription);
  const [singlePatient, setSinglePatient] = useState([]);
  const token = getCookie("access_token");
  useEffect(() => {
    fetch(`https://hospital-mangment.onrender.com/prescription/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPrescription(data));
  }, [patientId]);

  useEffect(() => {
    fetch(
      `https://hospital-mangment.onrender.com/patient/filter/${patientId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setSinglePatient(data));
  }, [patientId]);
  return (
    <Wrapper>
      <SidebarContainer>
        <Sidebar userRole={userRole} />
      </SidebarContainer>
      <Content>
        <TopBar title="Print Prescription" />
        <Activity id="prescription_container">
          <Link to="/prescription/2">
            <GreenButton>+ Add prescription</GreenButton>
          </Link>
          <TextInput
            onChange={(e) => setPatientId(e.target.value)}
            type="text"
            title="Enter your patient id"
          />
          <div ref={ref}>
            <section id="patintId">
              <p>
                <b>Patient ID: {patientId}</b>
              </p>
              <p>
                <b>Date{}</b>
              </p>
            </section>
            <section id="hospitalInfo">
              <div>
                <p>
                  <b>Robiul Hoque</b>
                </p>
                <p>Doctor</p>
                <p>Feni, Bangladesh</p>
              </div>
              <div>
                <p>
                  <b>Demo Hospital Lemited</b>
                </p>
                <p>
                  House#25, 4th Floor, Mannan Plaza, Khilkhet, Dhaka-1229,
                  Bangladesh.
                </p>
                <p>robiul@gmail.com</p>
                <p>4165446+456</p>
              </div>
            </section>

            {singlePatient.length ? (
              singlePatient.map((item) => (
                <section id="basicInfo">
                  <p>
                    <b>Patient Name: {item.fastName} </b>
                  </p>
                  <p>Age: 35</p>
                  <p>Sex:{item.sex} </p>
                  <p>Weight: 60 </p>
                </section>
              ))
            ) : (
              <>foo</>
            )}

            <section id="prescriptionInfoContainer">
              <div className="doctorComment">
                <p>
                  <b>Chief Complain:</b> motorbike accident
                </p>
                <p>
                  <b>Patient Notes:</b> eat evering thing, bed rest compulsory
                </p>
              </div>
              <div className="medicine_table">
                <table className="department_table medicine_headline">
                  <tr>
                    <th>Medicine Name</th>
                    <th>Type</th>
                    <th>Days</th>
                    <th>Instruction</th>
                  </tr>
                  {prescription ? (
                    prescription.map((items) =>
                      items.prescriptions.map((item) => (
                        <tr>
                          <td>{item.medicineName}</td>
                          <td>{item.medicineType}</td>
                          <td>{item.days}</td>
                          <td>{item.instruction}</td>
                        </tr>
                      ))
                    )
                  ) : (
                    <>null</>
                  )}
                </table>
                <table className="department_table diagonosis">
                  <tr>
                    <th>Diagnosis</th>
                    <th>Instruction</th>
                  </tr>
                  {prescription ? (
                    prescription.map((items) =>
                      items.diagnoses.map((item) => (
                        <tr>
                          <td>{item.diagnosis}</td>
                          <td>{item.instruction}</td>
                        </tr>
                      ))
                    )
                  ) : (
                    <>null</>
                  )}
                </table>
              </div>
            </section>
          </div>
        </Activity>
      </Content>
    </Wrapper>
  );
});
export default PrintPrescription;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GreenButton } from "../../components/Buttons";
import {
  Activity,
  Content,
  SidebarContainer,
  Wrapper,
} from "../../components/Common";
import { Loading } from "../../components/Loading";
import Message from "../../components/Message";
import Sidebar from "../../components/Sidebar";
import TextInput from "../../components/TextInput";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import usePostrequiest from "../../hooks/usePostrequiest";

function Appoinment({ userRole }) {
  const { departmentList, doctorList, tigger, setTigger } =
    useContext(DataContext);
  const [appoinment, setAppoinment] = useState({
    doctorName: "",
    department: "",
    date: "",
    problem: "",
    status: "active",
  });
  const hendleChange = (e) => {
    const updateAppoinment = { ...appoinment };
    updateAppoinment[e.target.name] = e.target.value;
    setAppoinment(updateAppoinment);
  };
  const [patientId, setPatientId] = useState("");

  const { loading, message, hendleSaveData } = usePostrequiest(
    `https://hospital-mangment.onrender.com/patient/appoinment/${patientId}`,
    appoinment,
    setTigger
  );
  if (tigger) {
    setInterval(() => {
      setTigger(false);
    }, 1000);
  }
  return (
    <Wrapper>
      <SidebarContainer>
        <Sidebar userRole={userRole} />
      </SidebarContainer>
      <Content>
        <TopBar title="Add Appoinment" />
        <Message message={message} />
        {loading ? (
          <Loading />
        ) : (
          <Activity>
            <Link to="/appoinment/1">
              <GreenButton>List Appoinment</GreenButton>
            </Link>
            <TextInput
              type="text"
              onChange={(e) => setPatientId(e.target.value)}
              title="Patient ID"
              placeholder="Patient ID"
            />
            <TextInput
              type="radio"
              onChange={hendleChange}
              name="department"
              title="Department Name "
              placeholder="Department Name"
              options={departmentList.map((item) => ({
                label: item.departmentName,
                value: item.departmentName,
              }))}
            />

            <TextInput
              type="radio"
              name="doctorName"
              onChange={hendleChange}
              title="Doctor Name "
              placeholder="Doctor Name"
              options={doctorList.map((item) => ({
                label:
                  appoinment.department === item.department
                    ? item.fastName
                    : null,
                value:
                  appoinment.department === item.department
                    ? item.fastName
                    : null,
              }))}
            />
            {doctorList.map((item) =>
              appoinment.doctorName === item.fastName
                ? item.schedule.map((items) => (
                    <li
                      style={{
                        marginLeft: "19rem",
                        listStyle: "none",
                        color: "green",
                      }}
                    >
                      {items.abailableDays + " " + items.availableTime}
                    </li>
                  ))
                : null
            )}

            <TextInput
              type="date"
              name="date"
              onChange={hendleChange}
              title="Appointment Date *"
              placeholder="Appointment Date *1"
            />
            <TextInput
              type="textarea"
              name="problem"
              onChange={hendleChange}
              title="Problem"
              placeholder="Problem"
            />
            <TextInput
              type="radio"
              name="status"
              onChange={hendleChange}
              title="Status"
              placeholder="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Deactive", value: "Deactive" },
              ]}
            />
            <GreenButton onClick={hendleSaveData}>Save</GreenButton>
          </Activity>
        )}
      </Content>
    </Wrapper>
  );
}
export default Appoinment;

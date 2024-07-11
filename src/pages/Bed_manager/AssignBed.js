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

function AssignBed({ userRole }) {
  const { bedList, tigger, setTigger } = useContext(DataContext);
  const [assainBed, setAssainBed] = useState({
    patientId: "",
    bedType: 0,
    assainDate: 0,
    dischargeDate: 0,
    description: "",
    status: "active",
  });

  const hendleChange = (e) => {
    const updateAssainBed = { ...assainBed };
    updateAssainBed[e.target.name] = e.target.value;
    setAssainBed(updateAssainBed);
  };

  const { loading, message, hendleSaveData } = usePostrequiest(
    "https://hospital-mangment.onrender.com/assainbed",
    assainBed,
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
        <TopBar title="Assain Bed" />
        <Message message={message} />
        {loading ? (
          <Loading />
        ) : (
          <Activity>
            <Link to="/bed/3">
              <GreenButton>Assain bed List</GreenButton>
            </Link>
            <TextInput
              name="patientId"
              onChange={hendleChange}
              title="Patient ID"
              type="text"
              placeholder="Patient Id"
            />
            <TextInput
              name="bedType"
              onChange={hendleChange}
              title="Bed Type"
              type="radio"
              options={
                bedList
                  ? bedList.map((item) => ({
                      label: item.bedType,
                      value: item.charge,
                    }))
                  : null
              }
              placeholder="Bed Type"
            />
            <TextInput
              name="assainDate"
              onChange={hendleChange}
              title="Assain Date"
              type="date"
              placeholder="Assain Date"
            />
            <TextInput
              name="dischargeDate"
              onChange={hendleChange}
              title="Discharge Date"
              type="date"
              placeholder="Discharge Date"
            />
            <TextInput
              name="description"
              onChange={hendleChange}
              title="Description"
              type="textarea"
              placeholder="Description"
            />
            <TextInput
              name="status"
              onChange={hendleChange}
              title="Status"
              type="radio"
              options={[
                { label: "Active", value: "Active" },
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
export default AssignBed;

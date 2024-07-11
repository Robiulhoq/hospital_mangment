import React, { useContext, useEffect, useState } from "react";
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
import usePutrequiest from "../../hooks/usePutrequiest";

function BedManager({ userRole }) {
  const { tigger, setTigger, editBedId, bedList } = useContext(DataContext);
  const [bed, setBed] = useState({
    bedType: "",
    description: "",
    bedCapacity: "",
    charge: 0,
    status: "active",
  });

  const hendleChange = (e) => {
    const updateBed = { ...bed };
    updateBed[e.target.name] = e.target.value;
    setBed(updateBed);
  };
  const bedApi = "https://hospital-mangment.onrender.com/bed";
  const { loading, message, hendleSaveData } = usePostrequiest(
    bedApi,
    bed,
    setTigger
  );

  useEffect(() => {
    if (editBedId && bedList) {
      const editBed = bedList.find((item) => item._id === editBedId);
      setBed({
        ...editBed,
      });
    }
  }, [editBedId]);

  const putBedApi = `https://hospital-mangment.onrender.com/bed/${editBedId}`;
  const { putLoading, putMessage, hendleEdit } = usePutrequiest(
    putBedApi,
    bed,
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
        <TopBar title="Add Bed" />
        <Message message={message || putMessage} />
        {loading || putLoading ? (
          <Loading />
        ) : (
          <Activity>
            <Link to="/bed/1">
              <GreenButton>Bed List</GreenButton>
            </Link>
            <TextInput
              defaultValue={bed.bedType}
              onChange={hendleChange}
              name="bedType"
              title="Bed Type"
              type="text"
              placeholder="Bed Type"
            />
            <TextInput
              defaultValue={bed.description}
              onChange={hendleChange}
              name="description"
              title="Description"
              type="textarea"
              placeholder="Description"
            />
            <TextInput
              defaultValue={bed.bedCapacity}
              onChange={hendleChange}
              name="bedCapacity"
              title="Bed Capacity "
              type="text"
              placeholder="Bed Capacity "
            />
            <TextInput
              defaultValue={bed.charge}
              onChange={hendleChange}
              name="charge"
              title="Charge"
              type="text"
              placeholder="Charge"
            />
            <TextInput
              defaultValue={bed.status}
              onChange={hendleChange}
              name="status"
              title="Status"
              type="radio"
              options={[
                { label: "Active", value: "Active" },
                { label: "Deactive", value: "Deactive" },
              ]}
            />
            <GreenButton onClick={editBedId ? hendleEdit : hendleSaveData}>
              Save
            </GreenButton>
          </Activity>
        )}
      </Content>
    </Wrapper>
  );
}
export default BedManager;

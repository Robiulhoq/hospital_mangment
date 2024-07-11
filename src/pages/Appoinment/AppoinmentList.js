import axios from "axios";
import React, { useContext, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GreenButton } from "../../components/Buttons";
import {
  Activity,
  Content,
  SidebarContainer,
  Wrapper,
} from "../../components/Common";
import DataFiltter from "../../components/DataFiltter";
import Message from "../../components/Message";
import Sidebar from "../../components/Sidebar";
import TextInput from "../../components/TextInput";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import { getCookie } from "../../Utils/getCookie";
function AppoinmentList({ userRole }) {
  const { patientList, setTigger, tigger } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const token = getCookie("access_token");
  const deleteAppoinment = async (patientId, apId) => {
    try {
      const response = await axios.delete(
        `https://hospital-mangment.onrender.com/patient/appoinment/${patientId}/${apId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setTigger(true);
        response.message = "Appoinment Delete successfull";
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        <TopBar title="Appoinment List" />
        <Message message={message} />
        <Activity>
          <DataFiltter>
            <Link to="/appoinment/0">
              <GreenButton>+ Add Appoinment</GreenButton>
            </Link>
            <div>
              <TextInput type="radio" title="Show" options={["10", "20"]} />
            </div>
            <div>
              <TextInput type="text" title="Search" />
            </div>
          </DataFiltter>
          <table className="department_table">
            <tr>
              <th>SL. NO</th>
              <th>Patient ID</th>
              <th>Doctor Name</th>
              <th>Appoinment Date</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {patientList.map((item, index) =>
              item.appoinment.map((ap) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>{ap.doctorName}</td>
                  <td>{ap.date}</td>
                  <td>{ap.department}</td>

                  <td>{ap.status}</td>
                  <td>
                    <AiFillDelete
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteAppoinment(item._id, ap._id)}
                      color="red"
                      size="1.5rem"
                    />
                  </td>
                </tr>
              ))
            )}
          </table>
        </Activity>
      </Content>
    </Wrapper>
  );
}
export default AppoinmentList;

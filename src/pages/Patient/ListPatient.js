import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
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
import useDelete from "../../hooks/useDelete";

function ListPatient({ userRole }) {
  const { patientList, hendleEditPatient, tigger, setTigger } =
    useContext(DataContext);
  const deletePatientApi = `https://hospital-mangment.onrender.com/patient/`;
  const { deleteloading, deleteMessage, hendleDelete } = useDelete(
    deletePatientApi,
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
        <TopBar title="Patient List" />
        <Message message={deleteMessage} />
        <Activity>
          <DataFiltter>
            <Link to="/patient/0">
              <GreenButton>+ Add Patient</GreenButton>
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
              <th>ID NO</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Address</th>
              <th>E-mail address</th>
              <th>Mobile No</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {patientList.length ? (
              patientList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src={item.picture}
                      alt="img"
                    />
                  </td>
                  <td>{item.fastName}</td>
                  <td>{item.address}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.mobileNo}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to="/patient/0">
                      <BiEdit
                        onClick={() => hendleEditPatient(item._id)}
                        size="1.5rem"
                        color="darkblue"
                      />
                    </Link>
                    <AiFillDelete
                      style={{ cursor: "pointer" }}
                      onClick={() => hendleDelete(item._id)}
                      color="red"
                      size="1.5rem"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </table>
        </Activity>
      </Content>
    </Wrapper>
  );
}

export default ListPatient;

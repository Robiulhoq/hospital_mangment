import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DataContext } from "../../ContextApi/DataContext";
import { GreenButton } from "../../components/Buttons";
import {
  Activity,
  Content,
  SidebarContainer,
  Wrapper,
} from "../../components/Common";
import DataFiltter from "../../components/DataFiltter";
import { Loading } from "../../components/Loading";
import Message from "../../components/Message";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import useDelete from "../../hooks/useDelete";

function DoctorList({ userRole }) {
  const { doctorList, handleEditDoctor, setTigger, tigger } =
    useContext(DataContext);

  const deleteApi = `https://hospital-mangment.onrender.com/doctor/`;
  const { deleteloading, deleteMessage, hendleDelete } = useDelete(
    deleteApi,
    setTigger
  );

  if (tigger) {
    setInterval(() => {
      setTigger(false);
    }, 100);
  }
  return (
    <Wrapper>
      <SidebarContainer>
        <Sidebar userRole={userRole} />
      </SidebarContainer>
      <Content>
        <TopBar title="Doctor List" />
        <Message message={deleteMessage} />
        {deleteloading ? (
          <Loading />
        ) : (
          <Activity>
            <DataFiltter>
              <Link to="/doctor/0">
                <GreenButton>+ Add Doctor</GreenButton>
              </Link>
            </DataFiltter>
            <table className="department_table">
              <tr>
                <th>SL. NO</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Department</th>
                <th>E-mail address</th>
                <th>Mobile No</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {doctorList.length ? (
                doctorList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ height: "100px", width: "100px" }}>
                      <img
                        style={{ height: "100px", width: "100px" }}
                        src={item.picture}
                      />
                    </td>
                    <td>{item.fastName}</td>
                    <td>{item.department}</td>
                    <td>{item.emailAddress}</td>
                    <td>{item.phoneNo}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to="/doctor/0">
                        {" "}
                        <BiEdit
                          onClick={() => handleEditDoctor(item._id)}
                          size="1.5rem"
                          color="darkblue"
                        />{" "}
                      </Link>
                      <AiFillDelete
                        onClick={() => hendleDelete(item._id)}
                        style={{ cursor: "pointer" }}
                        color="red"
                        size="1.5rem"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p>Loading......</p>
              )}
            </table>
          </Activity>
        )}
      </Content>
    </Wrapper>
  );
}

export default DoctorList;

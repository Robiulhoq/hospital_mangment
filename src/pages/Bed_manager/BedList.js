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

function BedList({ userRole }) {
  const { bedList, tigger, setTigger, hendleEditBed } = useContext(DataContext);
  const bedDeleteApi = `https://hospital-mangment.onrender.com/bed/`;
  const { deleteloading, deleteMessage, hendleDelete } = useDelete(
    bedDeleteApi,
    setTigger
  );

  if (tigger) {
    setInterval(() => {
      setTigger(false);
    }, 5000);
  }

  return (
    <Wrapper>
      <SidebarContainer>
        <Sidebar userRole={userRole} />
      </SidebarContainer>
      <Content>
        <TopBar title="Bed List" />
        <Message message={deleteMessage} />
        <Activity>
          <DataFiltter>
            <Link to="/bed/0">
              <GreenButton>+ Add Bed</GreenButton>
            </Link>
            <div>
              <TextInput type="radio" title="Show" options={["10", "20"]} />
            </div>
            <div>
              <TextInput type="text" title="Search" />
            </div>
          </DataFiltter>
          <h3 style={{ margin: "1rem" }}>Debit</h3>
          <table className="department_table">
            <tr>
              <th>SL. NO</th>
              <th>Bed Type</th>
              <th>Description</th>
              <th>Bed Capacity</th>
              <th>Charge</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {bedList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.bedType}</td>
                <td>{item.description}</td>
                <td>{item.bedCapacity}</td>
                <td>{item.charge}</td>
                <td>{item.status}</td>
                <td>
                  {" "}
                  <Link to="/bed/0">
                    <BiEdit
                      onClick={() => hendleEditBed(item._id)}
                      size="1.5rem"
                      color="darkblue"
                    />{" "}
                  </Link>
                  <AiFillDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => hendleDelete(item._id)}
                    color="red"
                    size="1.5rem"
                  />
                </td>
              </tr>
            ))}
          </table>
        </Activity>
      </Content>
    </Wrapper>
  );
}
export default BedList;

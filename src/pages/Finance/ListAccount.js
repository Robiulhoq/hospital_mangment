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

function ListService({ userRole }) {
  const { accountList, tigger, setTigger, hendleEditAccount } =
    useContext(DataContext);

  const deleteAccoutApi = `https://hospital-mangment.onrender.com/account/`;
  const { deleteloading, deleteMessage, hendleDelete } = useDelete(
    deleteAccoutApi,
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
        <TopBar title="List Account" />
        <Message message={deleteMessage} />
        <Activity>
          <DataFiltter>
            <Link to="/finance/2">
              <GreenButton>+ Add Account</GreenButton>
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
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {accountList ? (
              accountList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.accountName}</td>
                  <td>{item.accountType}</td>
                  <td>{item.drescription}</td>
                  <td>{item.status}</td>
                  <td>
                    {" "}
                    <Link to="/finance/2">
                      <BiEdit
                        onClick={() => hendleEditAccount(item._id)}
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
              ))
            ) : (
              <p>Loading</p>
            )}
          </table>
        </Activity>
      </Content>
    </Wrapper>
  );
}
export default ListService;

import axios from "axios";
import React, { useContext, useState } from "react";
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
import { getCookie } from "../../Utils/getCookie";

function ListPayment({ userRole }) {
  const { paymentList, hendlePaymentUI, hendleEditPayment } =
    useContext(DataContext);
  const [message, setMessage] = useState("");
  const token = getCookie("access_token");
  const hendleDeletePayment = async (id) => {
    try {
      const response = await axios.delete(
        `https://hospital-mangment.onrender.com/payment/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        response.message = "Payment delete successfull";
        setMessage(response.message);
        hendlePaymentUI(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (message) {
    setInterval(() => {
      setMessage("");
      hendlePaymentUI(false);
    }, 5000);
  }
  return (
    <Wrapper>
      <SidebarContainer>
        <Sidebar userRole={userRole} />
      </SidebarContainer>
      <Content>
        <TopBar title="List Payment" />
        <Message message={message} />
        <Activity>
          <DataFiltter>
            <Link to="/finance/4">
              <GreenButton>+ Add Payment</GreenButton>
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
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Pay to</th>
              <th>Action</th>
            </tr>
            {paymentList
              ? paymentList.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.accountName}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>{item.payTo}</td>
                    <td>
                      <Link to="/finance/4">
                        <BiEdit
                          onClick={() => hendleEditPayment(item._id)}
                          size="1.5rem"
                          color="darkblue"
                        />{" "}
                      </Link>
                      <AiFillDelete
                        onClick={() => hendleDeletePayment(item._id)}
                        color="red"
                        size="1.5rem"
                      />
                    </td>
                  </tr>
                ))
              : null}
          </table>
        </Activity>
      </Content>
    </Wrapper>
  );
}
export default ListPayment;

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
function AddService({ userRole }) {
  const { tigger, setTigger, editAccoutId, accountList } =
    useContext(DataContext);
  const [account, setAddAccount] = useState({
    accountName: "",
    accountType: "Dabit",
    drescription: "",
    status: "active",
  });

  const hendleChange = (e) => {
    const updateAccount = { ...account };
    updateAccount[e.target.name] = e.target.value;
    setAddAccount(updateAccount);
  };

  const accountApi = "https://hospital-mangment.onrender.com/account";
  const { loading, message, hendleSaveData } = usePostrequiest(
    accountApi,
    account,
    setTigger
  );

  useEffect(() => {
    if (editAccoutId) {
      const editAccount = accountList.find((item) => item._id === editAccoutId);
      setAddAccount({
        ...editAccount,
      });
    }
  }, [editAccoutId, accountList]);

  const accountPutApi = `https://hospital-mangment.onrender.com/account/${editAccoutId}`;
  const { putLoading, putMessage, hendleEdit } = usePutrequiest(
    accountPutApi,
    account,
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
        <TopBar title="Add Account" />
        <Message message={message || putMessage} />
        {loading || putLoading ? (
          <Loading />
        ) : (
          <Activity>
            <Link to="/finance/3">
              <GreenButton>List account</GreenButton>
            </Link>
            <TextInput
              name="accountName"
              defaultValue={account.accountName}
              onChange={hendleChange}
              title="Account Name"
              type="text"
              placeholder="Account name"
            />
            <TextInput
              name="accountType"
              onChange={hendleChange}
              title="Account Type"
              type="radio"
              options={[
                { label: "Dabit", value: "Dabit" },
                { label: "Credit", value: "Credit" },
              ]}
            />
            <TextInput
              name="drescription"
              defaultValue={account.drescription}
              onChange={hendleChange}
              title="Drescription"
              type="textarea"
              placeholder="Drescription"
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
            <GreenButton onClick={editAccoutId ? hendleEdit : hendleSaveData}>
              Save
            </GreenButton>
          </Activity>
        )}
      </Content>
    </Wrapper>
  );
}
export default AddService;

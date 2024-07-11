import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlueButton, GreenButton } from "../../components/Buttons";
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
import { getCookie } from "../../Utils/getCookie";

function Patient({ userRole }) {
  const { patientList, editPatientId, tigger, setTigger } =
    useContext(DataContext);
  const [image, setImage] = useState(null);
  const hendleSetImage = (img) => {
    setImage(img);
  };

  const [patient, setPatient] = useState({
    fastName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    mobileNo: "",
    bloodGroup: "A+",
    dathOfBirth: "",
    sex: "Male",
    picture: "",
    address: "",
    status: "active",
  });
  const hendleChange = (e) => {
    const updatePatient = { ...patient };
    updatePatient[e.target.name] = e.target.value;
    setPatient(updatePatient);
  };
  const [imgmessage, setImgMessage] = useState("");
  const [imgloading, setImgLoading] = useState(false);
  const handleImageUpload = async () => {
    try {
      if (!image) {
        setImgMessage("error");
        return;
      }
      setImgLoading(true);
      const formData = new FormData();
      formData.append("my_file", image);
      const response = await axios.post(
        "https://hospital-mangment.onrender.com/upload",
        formData
      );
      const updatePatient = { ...patient };
      updatePatient.picture = response.data.secure_url;
      setPatient(updatePatient);
      setImgLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const patientApi = "https://hospital-mangment.onrender.com/patient";
  const { loading, message, hendleSaveData } = usePostrequiest(
    patientApi,
    patient,
    setTigger
  );

  useEffect(() => {
    const handleSave = async () => {
      if (patient.picture && !editPatientId) {
        await hendleSaveData();
      }
    };

    handleSave();
  }, [patient.picture, editPatientId]);

  useEffect(() => {
    if (editPatientId && patientList) {
      const editPatient = patientList.find(
        (item) => item._id === editPatientId
      );

      setPatient((prevPatient) => ({
        ...prevPatient,
        fastName: editPatient.fastName,
        lastName: editPatient.lastName,
        emailAddress: editPatient.emailAddress,
        password: editPatient.password,
        mobileNo: editPatient.mobileNo,
        bloodGroup: editPatient.bloodGroup,
        dathOfBirth: editPatient.dathOfBirth,
        sex: editPatient.sex,
        picture: editPatient.picture,
        address: editPatient.address,
        status: editPatient.status,
      }));
      setEditMode(true);
    }
  }, [editPatientId]);

  const token = getCookie("access_token");
  //   const hendleSavePatient = async () => {
  //     try {
  //       const values = Object.values(patient);
  //       console.log(values);
  //       if (values.some((value) => !value.trim())) {
  //         setMessage("Please fill out all fields");
  //         return;
  //       }
  //       setLoading(true);
  //       const response = await fetch("https://hospital-mangment.onrender.com/patient", {
  //         method: "POST",
  //         body: JSON.stringify(patient),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         setLoading(false);
  //         setMessage("Patient save successful");
  //         hendlePatientUI(true);
  //         setPatient((prePatient) => ({
  //           ...prePatient,
  //           fastName: "",
  //           lastName: "",
  //           emailAddress: "",
  //           password: "",
  //           mobileNo: "",
  //           bloodGroup: "A+",
  //           dathOfBirth: "",
  //           sex: "Male",
  //           picture: "",
  //           address: "",
  //           status: "active",
  //         }));
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const [editMode, setEditMode] = useState(false);

  //   const hendleEditPatient = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://hospital-mangment.onrender.com/patient/${editPatientId}`,
  //         {
  //           method: "PUT",
  //           body: JSON.stringify(patient),
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       hendlePatientUI(true);
  //       response.message = "Patient edit successfull";
  //       setMessage(response.message);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //   };
  if (message) {
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
        <TopBar title="Add Patient" />
        <Message message={message || imgmessage} />
        {loading || imgloading ? (
          <Loading />
        ) : (
          <Activity>
            <Link to="/patient/1">
              <BlueButton>List patient</BlueButton>
            </Link>
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.fastName}
              type="text"
              name="fastName"
              title="Fast Name"
              placeholder="Fast name"
            />
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.lastName}
              type="text"
              name="lastName"
              title="Last Name"
              placeholder="Last name"
            />
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.emailAddress}
              type="text"
              name="emailAddress"
              title="Email address"
              placeholder="Email address"
            />
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.password}
              type="text"
              name="password"
              title="Password"
              placeholder="Password"
            />
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.mobileNo}
              type="text"
              name="mobileNo"
              title="Mobile No"
              placeholder="Mobile no"
            />
            <TextInput
              onChange={hendleChange}
              type="radio"
              name="bloodGroup"
              value={patient.bloodGroup}
              title="Blood group"
              placeholder="Blood group"
              options={[
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "o+", value: "o+" },
              ]}
            />
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.dathOfBirth}
              type="text"
              name="dathOfBirth"
              title="Date of birth"
              placeholder="Dath of birth"
            />
            <TextInput
              onChange={hendleChange}
              type="radio"
              value={patient.sex}
              name="sex"
              title="Sex"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
            <TextInput
              onChange={hendleSetImage}
              title="Picture"
              type="file"
              placeholder="Dath of birth"
            />
            <TextInput
              onChange={hendleChange}
              defaultValue={patient.address}
              title="Address"
              name="address"
              type="textarea"
              placeholder="Address"
            />
            <TextInput
              onChange={hendleChange}
              name="status"
              title="Status"
              type="radio"
              value={patient.status}
              options={[
                { label: "Active", value: "Active" },
                { label: "Deactive", value: "Deactive" },
              ]}
            />
            <GreenButton onClick={handleImageUpload}>Save</GreenButton>
          </Activity>
        )}
      </Content>
    </Wrapper>
  );
}

export default Patient;

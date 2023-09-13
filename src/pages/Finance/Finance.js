import React, { useContext, useEffect, useState } from "react";
import './Finance.css';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
import { Loading } from "../../components/Loading";
import { getCookie } from "../../Utils/getCookie";


function Finance({ userRole }) {
    const { patientList, accountList } = useContext(DataContext);

    const [totalInvoice, setTotalInvoice] = useState(1);
    const dabitAccount = accountList.filter(item => item.accountType === "Dabit");
    const defaultAccountName = dabitAccount.length > 0 ? dabitAccount[0].accountName : '';
    const [invoice, setInvoice] = useState([{
        accoutName: '',
        description: '',
        quantity: 0,
        price: 0,
        subTotal: 0
    }]); // Initial invoice state with one input
    console.log(invoice);
    const [fullInvoice, setFullInvoice] = useState({
        patientId: '',
        vat: 0,
        discount: 0,
        grandTotal: 0,
        paid: 0,
        due: 0
    });

    const handleAddInvoice = () => {
        setTotalInvoice(totalInvoice + 1);
        setInvoice([...invoice, {
            accoutName: '',
            description: '',
            quantity: '',
            price: '',
            subTotal: ''
        }]); // Add an empty invoice input
    };

    const handleRemoveInvoice = () => {
        if (totalInvoice > 1) {
            setTotalInvoice(totalInvoice - 1);
            setInvoice(invoice.slice(0, -1)); // Remove the last invoice input
        }
    };

    const handleInvoiceChange = (e, index) => {
        const { name, value } = e.target;
        const updatedInvoice = [...invoice];
        updatedInvoice[index][name] = value;
        updatedInvoice[index].subTotal = updatedInvoice[index].quantity * updatedInvoice[index].price;
        setInvoice(updatedInvoice);
    };
    const hendleChange = (e) => {
        const updateFullInvoice = { ...fullInvoice };
        updateFullInvoice[e.target.name] = e.target.value;
        setFullInvoice(updateFullInvoice);
    }
    // calculation

    const initialValue = 0;
    const subTotal = invoice.map(item => item.subTotal)
    const total = subTotal.reduce((cur, nxt) => cur + nxt, initialValue);

    const grandTotal = (total + (fullInvoice.vat / 100) * total) - (fullInvoice.discount / 100) * total;
    const due = grandTotal - fullInvoice.paid;
    useEffect(() => {
        setFullInvoice(prvInvoice => ({
            ...prvInvoice,
            due: due,
            grandTotal: grandTotal
        }));
    }, [ fullInvoice.paid])

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const token = getCookie('access_token');
    // console.log('full invoce', fullInvoice, 'invoice', invoice);
    const dueToSend = due === 0 ? null : due;

    const hendleSaveInvoice = async () => {
        const combinedInvoice = {
            ...fullInvoice,
            invoice: invoice
        };
    
        try {
            setLoading(true);
            const resp = await fetch('https://hospital-mangment.onrender.com/invoice', {
                method: 'POST',
                body: JSON.stringify(combinedInvoice),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (resp.status === 200) {
                resp.message = "Invoice add successful!";
                setMessage(resp.message);
                // ...
            } else {
                // Handle other HTTP response statuses, log or display the error message
                const errorData = await resp.json(); // If the server sends an error message
                console.error(`HTTP Error ${resp.status}: ${errorData.message}`);
            }
    
            setLoading(false);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    // Single patient
    const [singlePatient, setSinglePatient] = useState([]);
    // console.log(fullInvoice.patientId.length);
    // console.log(singlePatient);
    useEffect(() => {
        if (fullInvoice.patientId.length == 24) {
            
            fetch(`https://hospital-mangment.onrender.com/patient/filter/${fullInvoice.patientId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(res => res.json())
                .then(data => setSinglePatient(data));
        }

    }, [fullInvoice.patientId])

    // console.log(dabitAccount);
    if (message) {
        setInterval(() => {
            setMessage('');

        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Invoice' />
                <Message message={message} />
                {
                    loading == true ? <Loading /> :
                        <Activity id="invoice_container">
                            <section id="patientAndHospital">
                                <div className="patient_info_container">
                                    <TextInput className='custom_input' name='patientId' onChange={hendleChange} title="Patient Id" type='text' />
                                    <TextInput className='custom_input' value={singlePatient.length ? singlePatient[0].fastName : null} title="Full Name" type='text' />
                                    <TextInput className='custom_input' value={singlePatient.length && fullInvoice.patientId ? singlePatient[0].address : null} title="Address" type='text' />
                                </div>
                                <div className="hospital_info_container">
                                    <p><b>Demo Hospital Lemited</b></p>
                                    <p>House#25, 4th Floor, Mannan Plaza, Khilkhet, Dhaka-1229, Bangladesh.</p>
                                    <p>robiul@gmail.com</p>
                                    <p>4165446+456</p>
                                </div>
                            </section>
                            <section id="invoice_container">
                                <table className='invoice_table invoice_headline'>
                                    <tr>
                                        <th>Account Name</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Sub Calculation</th>
                                        <th>Add / Remove</th>
                                    </tr>
                                    {
                                        invoice.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <select name="accoutName" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input">
                                                    <option>Select</option>
                                                        {
                                                            dabitAccount.map(items => (
                                                                <option>{items.accountName}</option>
                                                            )
                                                            )
                                                        }

                                                    </select>
                                                </td>
                                                <td><input name="description" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                                <td><input name="quantity" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                                <td><input name="price" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                                <td><input value={invoice[index].subTotal} name="subTotal" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                                <td style={{ display: 'flex' }}><GreenButton onClick={handleAddInvoice} >Add</GreenButton>
                                                    <BlueButton onClick={handleRemoveInvoice}>Remove</BlueButton></td>
                                            </tr>
                                        ))
                                    }

                                </table>
                            </section>
                            <section id="calculation" className="total">
                                <>
                                    <h4>Total</h4>
                                    <input type="number" value={total} />
                                </>
                            </section>
                            <section id="calculation" className="vat">
                                <>
                                    <h4>Vat</h4>
                                    <input onChange={hendleChange} type="number" name="vat" placeholder="%" />
                                </>
                            </section>
                            <section id="calculation" className="discount">
                                <>
                                    <h4>Discount</h4>
                                    <input type="number" onChange={hendleChange} name="discount" placeholder="%" />
                                </>
                            </section>
                            <section id="calculation" className="grand">
                                <>
                                    <h4>Grand Total</h4>
                                    <input type="number" name="grandTotal" value={grandTotal} onChange={hendleChange} />
                                </>
                            </section>
                            <section id="calculation" className="paid">
                                <>
                                    <h4>Paid</h4>
                                    <input type="number" name="paid" onChange={hendleChange} />
                                </>
                            </section>
                            <section id="calculation" className="due">
                                <>
                                    <h4>Due</h4>
                                    <input type="number" name="due" value={due} />
                                </>
                            </section>

                            <section id="save_and_activity">

                                <div><BlueButton>Reset</BlueButton> <GreenButton onClick={hendleSaveInvoice}>Save</GreenButton></div>
                            </section>
                        </Activity>
                }

            </Content>
        </Wrapper>
    )
}
export default Finance;
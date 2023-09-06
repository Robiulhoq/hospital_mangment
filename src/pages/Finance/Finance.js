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


function Finance() {
    const { patientList, accountList } = useContext(DataContext);

    const [totalInvoice, setTotalInvoice] = useState(1);
    const [invoice, setInvoice] = useState([{
        accoutName: '',
        description: '',
        quantity: 0,
        price: 0,
        subTotal: 0
    }]); // Initial invoice state with one input

    const [fullInvoice, setFullInvoice] = useState({
        patientId: '',
        vat: '',
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
    }, [due, grandTotal])

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const hendleSaveInvoice = async () => {
        setLoading(true);
        const combinedInvoice = {
            ...fullInvoice,
            invoice: invoice
        };
        try {
            
            const resp = await fetch('http://localhost:5000/invoice', {
                method: 'POST',
                body: JSON.stringify(combinedInvoice),
                headers: { 'Content-Type': 'application/json' }
            });
            if (resp.status === 200) {
                setLoading(false)
                resp.message = "Invoice add successfull!";
                setMessage(resp.message);
                setFullInvoice(prvInvoice => ({
                    ...prvInvoice,
                    patientId: '',
                    vat: '',
                    discount: 0,
                    grandTotal: 0,
                    paid: 0,
                    due: 0
                }))

            }
        } catch (error) {
            console.log(error);
        }
    }
    // Single patient
    const [singlePatient, setSinglePatient] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:5000/patient/filter/${fullInvoice.patientId}`)
            .then(res => res.json())
            .then(data => setSinglePatient(data));
    }, [fullInvoice.patientId])

    if (message) {
        setInterval(() => {
            setMessage('');
            
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Invoice' />
                <Message message={message} />
                {
                    loading == true? <Loading /> :
                        <Activity id="invoice_container">
                            <section id="patientAndHospital">
                                <div className="patient_info_container">
                                    <TextInput className='custom_input' name='patientId' onChange={hendleChange} title="Patient Id" type='text' />
                                    <TextInput className='custom_input' defaultValue={singlePatient? singlePatient[0].fastName: null} title="Full Name" type='text' />
                                    <TextInput className='custom_input' defaultValue={singlePatient? singlePatient[0].address: null} title="Address" type='text' />
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
                                                        {
                                                            accountList.map(item => (
                                                                <option>{item.accountName}</option>
                                                            ))
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
                                    <input value={total} />
                                </>
                            </section>
                            <section id="calculation" className="vat">
                                <>
                                    <h4>Vat</h4>
                                    <input onChange={hendleChange} name="vat" placeholder="%" />
                                </>
                            </section>
                            <section id="calculation" className="discount">
                                <>
                                    <h4>Discount</h4>
                                    <input onChange={hendleChange} name="discount" placeholder="%" />
                                </>
                            </section>
                            <section id="calculation" className="grand">
                                <>
                                    <h4>Grand Total</h4>
                                    <input name="grandTotal" value={grandTotal} onChange={hendleChange} />
                                </>
                            </section>
                            <section id="calculation" className="paid">
                                <>
                                    <h4>Paid</h4>
                                    <input name="paid" onChange={hendleChange} />
                                </>
                            </section>
                            <section id="calculation" className="due">
                                <>
                                    <h4>Due</h4>
                                    <input name="due" value={due} onChange={hendleChange} />
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
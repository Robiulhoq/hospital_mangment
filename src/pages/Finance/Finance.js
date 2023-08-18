import React, { useState } from "react";
import './Finance.css';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";


function Finance() {
    const [totalInvoice, setTotalInvoice] = useState(1);
    const [invoice, setInvoice] = useState([{
        accoutName: '',
        description: '',
        quantity: '',
        price: '',
        subTotal: ''
    }]); // Initial invoice state with one input
console.log(invoice);
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
        setInvoice(updatedInvoice);
    };
    
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Invoice' />
                <Activity id="invoice_container">
                    <section id="patientAndHospital">
                        <div className="patient_info_container">
                            <TextInput className='custom_input' title="Patient Id" type='text' />
                            <TextInput className='custom_input' title="Full Name" type='text' />
                            <TextInput className='custom_input' title="Address" type='text' />
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
                                                <option>............................</option>
                                                <option>.....</option>
                                                <option>.....</option>
                                            </select>
                                        </td>
                                        <td><input name="description" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                        <td><input name="quantity" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                        <td><input name="price" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
                                        <td><input name="subTotal" onChange={(e) => handleInvoiceChange(e, index)} className="invoice_input" /></td>
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
                            <input />
                        </>
                    </section>
                    <section id="calculation" className="vat">
                        <>
                            <h4>Vat</h4>
                            <input placeholder="%" />
                        </>
                    </section>
                    <section id="calculation" className="discount">
                        <>
                            <h4>Discount</h4>
                            <input placeholder="%" />
                        </>
                    </section>
                    <section id="calculation" className="grand">
                        <>
                            <h4>Grand Total</h4>
                            <input />
                        </>
                    </section>
                    <section id="calculation" className="paid">
                        <>
                            <h4>Paid</h4>
                            <input />
                        </>
                    </section>
                    <section id="calculation" className="due">
                        <>
                            <h4>Due</h4>
                            <input />
                        </>
                    </section>

                    <section id="save_and_activity">
                        <TextInput type="radio" title="Status" options={['active', 'deactive']} />
                        <div><BlueButton>Reset</BlueButton> <GreenButton>Save</GreenButton></div>
                    </section>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Finance;
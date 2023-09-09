import React, { useEffect, useState, forwardRef } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { getCookie } from "../../Utils/getCookie";

const ListInvoice = forwardRef((props, ref, print) => {
    const { userRole } = props;
    const [patientId, setPatientId] = useState('');
    const [singlePatient, setSinglePatient] = useState(null);
    const [singleInvoice, setSingleInvoice] = useState(null);
    const token = getCookie('access_token');
    useEffect(() => {
        fetch(`http://localhost:5000/patient/filter/${patientId}`,{
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(data => setSinglePatient(data));
    }, [patientId]);

    useEffect(()=>{
        fetch(`http://localhost:5000/invoice/filter/${patientId}`,{
            headers:{'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(data => setSingleInvoice(data))
    },[patientId])
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='List Invoice' />
                            <TextInput onChange={(e)=> setPatientId(e.target.value)} type="text" title="Patient ID" name="Patient Id" placeholder="Enter your patient Id" />
                <Activity id="invoice_container">
                    {
                      singleInvoice?  singleInvoice.map(item => (
                            <div ref={ref}>
                            <section id="patientAndHospital">
                        <div className="patient_info_container">
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
                                <th>Sub Total</th>
                            </tr>
                            {
                                item.invoice.map(items =>(
                                    <tr className="tr">
                                    <td>{items.accoutName}</td>
                                    <td>{items.description}</td>
                                    <td>{items.quantity}</td>
                                    <td>{items.price}</td>
                                    <td>{items.subTotal}</td>
                                </tr>
                                ))
                            }
                           

                        </table>
                    </section>
                    <section id="calculation" className="vat invoice_cal">
                        <>
                            <h4>Vat</h4>
                            <b>{item.vat}</b>
                        </>
                    </section>
                    <section id="calculation" className="discount invoice_cal">
                        <>
                            <h4>Discount</h4>
                            <b>{item.discount}</b>
                        </>
                    </section>
                    <section id="calculation" className="grand invoice_cal">
                        <>
                            <h4>Grand Total</h4>
                            <b>{item.grandTotal}</b>
                        </>
                    </section>
                    <section id="calculation" className="paid invoice_cal">
                        <>
                            <h4>Paid</h4>
                            <b>{item.paid}</b>
                        </>
                    </section>
                    <section id="calculation" className="due invoice_cal">
                        <>
                            <h4>Due</h4>
                            <b>{item.due}</b>
                        </>
                    </section>
                    
                            </div>
                        )) : null
                    }
                    
                </Activity>
            </Content>
        </Wrapper>
    )
});
export default ListInvoice;
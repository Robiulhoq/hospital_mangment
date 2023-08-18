import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";

function ListInvoice(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='List Invoice' />
                <Activity id="invoice_container">
                <section id="patientAndHospital">
                        <div className="patient_info_container">
                        <p><b>Patient Id</b></p>
                            <p><b>Full Name:</b></p>
                            <p>Address: </p>
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
                            <tr className="tr">
                            <td>Ambulace service</td>
                            <td>Ac vip Ambulace service</td>
                            <td>2</td>
                            <td>300</td>
                            <td>600</td>
                        </tr>

                        </table>
                    </section>
                    <section id="calculation" className="total invoice_cal">
                        <>
                            <h4>Total</h4>
                            <b>425</b>
                        </>
                    </section>
                    <section id="calculation" className="vat invoice_cal">
                        <>
                            <h4>Vat</h4>
                            <b>425</b>
                        </>
                    </section>
                    <section id="calculation" className="discount invoice_cal">
                        <>
                            <h4>Discount</h4>
                            <b>425</b>
                        </>
                    </section>
                    <section id="calculation" className="grand invoice_cal">
                        <>
                            <h4>Grand Total</h4>
                            <b>425</b>
                        </>
                    </section>
                    <section id="calculation" className="paid invoice_cal">
                        <>
                            <h4>Paid</h4>
                            <b>425</b>
                        </>
                    </section>
                    <section id="calculation" className="due invoice_cal">
                        <>
                            <h4>Due</h4>
                            <b>425</b>
                        </>
                    </section>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default ListInvoice;
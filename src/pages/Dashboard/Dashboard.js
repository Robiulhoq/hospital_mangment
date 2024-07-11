import { ArcElement, BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import React, { useContext } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    AiFillCodepenCircle,
    AiFillIdcard,
    AiOutlineBook,
    AiOutlineCalendar, AiOutlineCheckSquare
} from "react-icons/ai";
import { FaBed, FaHospitalUser, FaMoneyBillWave } from 'react-icons/fa';
import { Content, SidebarContainer, Wrapper } from '../../components/Common';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { DataContext } from '../../ContextApi/DataContext';
import './Dashboard.css';
Chart.register(ArcElement, CategoryScale, LinearScale, BarController, BarElement);
export default function Dashboard({ userRole }) {
   
    const { doctorList, patientList, caseStudyList,
        labList, invoiceList, hrList, bedList, paymentList, setTigger} = useContext(DataContext);
        setTigger(false)
    //     if(userRole){
        
    //         setInterval(()=>{
    //             setTigger(true);
    //         }, 100);
        
    // }
    // const token = getCookie('access_token');
    // if(token){
    //     setTigger(false)
    // }
    const appoinmentList = patientList && patientList.map(item => item.appoinment.length);
    const apLength = appoinmentList && appoinmentList.reduce((current, next) => current + next, 0);
    
    const getMohthInvome = monthNo =>{
       const grandTotal = invoiceList && invoiceList.map(item => (new Date(item.createdAt).getMonth()+1 === monthNo) ? item.paid : 0);
       const total = grandTotal && grandTotal.reduce((current, nxt) => current + nxt, 0);
       return total;
        
    }
    const getMohthExpance = monthNo =>{
        const grandTotal = paymentList && paymentList.map(item => (new Date(item.date).getMonth()+1 === monthNo)? parseInt(item.amount): 0);
        
        const total = grandTotal && grandTotal.reduce((current, nxt) => current + nxt, 0);
        return total;
    }
    
    

    const chartdata = {
        labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'JULY', 'AUG', 'SEP', 'OCT', 'NUV', 'DEC'],
        datasets: [
            {
                label: '# of Votes',
                data: [getMohthInvome(1), getMohthInvome(2), getMohthInvome(3), getMohthInvome(4), getMohthInvome(5), getMohthInvome(6),
                    getMohthInvome(7), getMohthInvome(8), getMohthInvome(9), getMohthInvome(10), getMohthInvome(11), getMohthInvome(12)],
                backgroundColor: [
                    '#FFB61E',
                    '#FFB61E',
                    '#FFB61E',
                    '#FFB61E',
                    '#FFB61E',
                    '#FFB61E',

                ],
                borderColor: [
                    '#559E38',
                    '#559E38',
                    '#559E38',
                    '#559E38',
                    '#559E38',
                    '#559E38',
                ],
                borderWidth: 1,
            },
            {
                label: '# of Votes',
                data: [getMohthExpance(1), getMohthExpance(2), getMohthExpance(3), getMohthExpance(4), getMohthExpance(5), getMohthExpance(6), 
                    getMohthExpance(7), getMohthExpance(8), getMohthExpance(9), getMohthExpance(10), getMohthExpance(11), getMohthExpance(12)],
                backgroundColor: [
                    '#73B0D7',
                    '#73B0D7',
                    '#73B0D7',
                    '#73B0D7',
                    '#73B0D7',
                    '#73B0D7',

                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieDataChart = {
        labels: ['Appoinment', 'Doctor', 'Patient'],
        datasets: [
            {
                label: '# of Votes',
                data: [apLength, doctorList.length, patientList.length],
                backgroundColor: [
                    '#FFB61E',
                    '#FD3233',
                    '#2181FD'

                ],
            }
        ],
    };

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content>
                <TopBar title="Dashboard" />
                <div className="contant_area">
                    <div className="contant_length_box">
                        <FaHospitalUser color='lightgreen' size='3rem' />
                        <div>
                            <h1>{doctorList.length}</h1>
                            <h3>Doctor</h3>
                        </div>
                    </div>
                    <div className="contant_length_box">
                        <FaBed color='red' size='3rem' />
                        <div>
                            <h1>{patientList.length}</h1>
                            <h3>Patient</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiOutlineCheckSquare color='lightgreen' size='3rem' />
                        <div>
                            <h1>{apLength}</h1>
                            <h3>Appoinment</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiOutlineBook color='blue' size='3rem' />
                        <div>
                            <h1>5</h1>
                            <h3>Prescription</h3></div>
                    </div>
                </div>
                <div className="contant_area">
                    <div className="contant_length_box">
                        <AiFillCodepenCircle color='red' size='3rem' />
                        <div>
                            <h1>{hrList.length}</h1>
                            <h3>Employ</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiFillIdcard color='blue' size='3rem' />
                        <div>
                            <h1>{labList.length}</h1>
                            <h3>Lab Report</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiOutlineCalendar color='red' size='3rem' />
                        <div>
                            <h1>{caseStudyList.length}</h1>
                            <h3>Case study</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <FaMoneyBillWave color='lightgreen' size='3rem' />
                        <div>
                            <h1>{bedList.length}</h1>
                            <h3>Total Bed</h3></div>
                    </div>
                </div>
                <div className="chart_area">
                    <div className="income_expance">
                        <p>Per mounth <span style={{background: '#FFB61E', padding: '5px'}}>income</span> | <span style={{background: '#73B0D7', padding: '5px'}}>expance</span> in 2023</p>
                        <Bar data={chartdata} />
                    </div>
                    <div className="comparison">
                        <Pie data={pieDataChart} />
                        <p>Appoinment <div style={{ width: '50px', height: 'auto', backgroundColor: '#FFB61E' }}></div></p>
                        <p>Doctor <div style={{ width: '50px', height: 'auto', backgroundColor: '#FD3233' }}></div></p>
                        <p>Patient <div style={{ width: '50px', height: 'auto', backgroundColor: '#2181FD' }}></div></p>
                    </div>
                </div>
            </Content>
        </Wrapper>
    )
}

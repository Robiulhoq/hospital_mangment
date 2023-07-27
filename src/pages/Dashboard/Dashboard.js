import React from 'react';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar';
import { FaHospitalUser, FaBed, FaMoneyBillWave } from 'react-icons/fa';
import {
    AiFillAccountBook, AiFillCodepenCircle, AiFillMedicineBox, AiFillFrown,
    AiOutlineCalendar, AiOutlineCheckSquare, AiOutlineBook, AiFillIdcard, AiOutlineMail, AiOutlineLeft, AiOutlineDown
} from "react-icons/ai";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, BarController, BarElement);
export default function Dashboard() {
    const chartdata = {
        labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: '# of Votes',
                data: [120, 190, 130, 50, 80, 100],
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
                data: [90, 90, 30, 20, 20, 30],
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
                data: [120, 190, 130],
                backgroundColor: [
                    '#FFB61E',
                    '#FD3233',
                    '#2181FD'
                    
                ],
            }
        ],
    };
    
    return (
        <div className='dashboard'>
            <div className='dashboard_sidebar'>
                <Sidebar />
            </div>
            <div className='dashboard_containt'>
                <TopBar title="Dashboard" />
                <div className="contant_area">
                    <div className="contant_length_box">
                        <FaHospitalUser color='lightgreen' size='3rem' />
                        <div>
                            <h1>3</h1>
                            <h3>Doctor</h3>
                        </div>
                    </div>
                    <div className="contant_length_box">
                        <FaBed color='red' size='3rem' />
                        <div>
                            <h1>7</h1>
                            <h3>Patient</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiOutlineCheckSquare color='lightgreen' size='3rem' />
                        <div>
                            <h1>10</h1>
                            <h3>Appoinment</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiOutlineBook color='blue' size='3rem' />
                        <div>
                            <h1>0</h1>
                            <h3>Prescription</h3></div>
                    </div>
                </div>
                <div className="contant_area">
                    <div className="contant_length_box">
                        <AiFillCodepenCircle color='red' size='3rem' />
                        <div>
                            <h1>0</h1>
                            <h3>Case History</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiFillIdcard color='blue' size='3rem' />
                        <div>
                            <h1>0</h1>
                            <h3>Lab Report</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <AiOutlineCalendar color='red' size='3rem' />
                        <div>
                            <h1>0</h1>
                            <h3>Documents</h3></div>
                    </div>
                    <div className="contant_length_box">
                        <FaMoneyBillWave color='lightgreen' size='3rem' />
                        <div>
                            <h1>0</h1>
                            <h3>Payment Invoice</h3></div>
                    </div>
                </div>
                <div className="chart_area">
                    <div className="income_expance">
                        <p>Per mounth income/expance</p>
                        <Bar data={chartdata} />
                    </div>
                    <div className="comparison">
                    <Pie data={pieDataChart} />
                    <p>Appoinment <div style={{width: '50px', height: 'auto', backgroundColor: '#FFB61E'}}></div></p>
                    <p>Doctor <div style={{width: '50px', height: 'auto', backgroundColor: '#FD3233'}}></div></p>
                    <p>Pation <div style={{width: '50px', height: 'auto', backgroundColor: '#2181FD'}}></div></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalNotes: 0,
        upcomingEvents: 0,
        todayMeetings: [],
        todayEvents: [],
        recentNotes: []
    });

    const categoryChartData = {
        labels: ['Work', 'Personal', 'Ideas', 'Others'],
        datasets: [
            {
                data: [12, 19, 3, 5],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0'
                ],
                borderWidth: 1
            },
        ],
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dashboard?userId=1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDashboardData(data);
        } catch (error) {
            console.log('Error fetching dashboard data:', error);
            // Set default data in case of error
            setDashboardData({
                totalNotes: 0,
                upcomingEvents: 0,
                todayMeetings: [],
                todayEvents: [],
                recentNotes: []
            });
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Universe Agenda Dashboard</h1>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Notes</h3>
                    <p>{dashboardData.totalNotes}</p>
                </div>
                <div className="stat-card">
                    <h3>Upcoming Events</h3>
                    <p>{dashboardData.upcomingEvents}</p>
                </div>
                <div className="stat-card">
                    <h3>Today's Meetings</h3>
                    <p>{dashboardData.todayMeetings?.length || 0}</p>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="chart-container">
                    <h3>Category Distribution</h3>
                    <Pie data={categoryChartData} />
                </div>

                <div className="today-events">
                    <h3>Today's Schedule</h3>
                    {dashboardData.todayEvents?.map(event => (
                        <div key={event.id} className="event-card">
                            <h4>{event.title}</h4>
                            <p>{event.time}</p>
                        </div>
                    ))}
                </div>

                <div className="recent-notes">
                    <h3>Recent Notes</h3>
                    {dashboardData.recentNotes?.map(note => (
                        <div key={note.id} className="note-card">
                            <p>{note.content?.substring(0, 100)}...</p>
                            <span>{note.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React from 'react'
import NavBar from '../components/Header/NavBar'
import DashboardComp from '../components/Dashboard/DashboardComp'
import CreatePost from '../components/Feed/CreatePost'
import Feed from '../components/Feed/Feed'
import './style.css';

const Dashboard = () => {
    return (
        <div className='main'>
            <NavBar />
            <DashboardComp />
            <CreatePost />
            <Feed />
        </div>
    )
}

export default Dashboard;

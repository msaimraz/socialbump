import React from 'react'
// import { useParams } from 'react-router-dom';
import NavBar from '../components/Header/NavBar';
import UserComp from '../components/Header/Search/UserComp';
// import { db } from '../firebase/firebase';

const User = () => {

    return (
        <>
            <NavBar />
            <UserComp />
        </>
    )
}

export default User

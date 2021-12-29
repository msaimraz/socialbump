import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';

const DashboardComp = () => {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState({
        Name: "",
        Bio: "",
        Photo: "",
        uid: currentUser.uid,
    });

    const { Name, Bio, Photo } = profile;
    useEffect(() => {
        db.collection("Profile").doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                const { Bio, Name, Photo, uid } = doc.data();
                setProfile(prev => ({ ...prev, Bio, Name, Photo, uid }))
            }
            else {
                console.log("No Doc available");
            }
        })
    }, [])
    return (
        <div>
            <strong>Email:</strong> {currentUser.email}
            <strong>Name:</strong> {Name}
            <strong>Photo:</strong> {Photo.url}
            <strong>Uid:</strong> {currentUser.uid}

        </div>
    )
}

export default DashboardComp;

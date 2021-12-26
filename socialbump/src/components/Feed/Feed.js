import React, { useState, useEffect } from 'react'
import Post from './Post'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../context/AuthContext';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState({
        Name: "",
        Bio: "",
        Photo: "",
    });

    const { Name, Bio, Photo } = profile;
    useEffect(() => {
        db.collection("Profile").doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                const { Bio, Name, Photo } = doc.data();
                setProfile(prev => ({ ...prev, Bio, Name, Photo }))
            }
            else {
                console.log("No Doc available");
            }
        })
    }, [])
    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])
    return (
        <>
            {
                posts.map(post => {
                    return <Post
                        key={post.id}
                        profilePic={Photo.url}
                        username={Name}
                        timestamp={post.data.timestamp}
                        message={post.data.message}
                        image={post.data.image}
                    />
                })
            }
        </>
    )
}

export default Feed;

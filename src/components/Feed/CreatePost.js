import React, { useState, useEffect } from 'react'
import { Avatar, IconButton, Modal, TextField, } from '@mui/material';
// import {VideoCallIcon, PhotoLibraryIcon, EmojiEmotionsOutlinedIcon} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './style.css'
import { db, storage } from '../../firebase/firebase';
import firebase from 'firebase';
import { useAuth } from '../../context/AuthContext';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);
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
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleupload = () => {
        document.getElementById('imageFile').click();
    }
    const handleMessage = (event) => {
        setMessage(event.target.value);
    }
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (image === "") {
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: message,
                username: { Name },
                profilePic: { Photo }
            })
        }
        else {
            const uploadTask = storage.ref(`Images/${image.name}`).put(image);
            uploadTask.on("state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => { console.log(error); },
                () => {
                    storage
                        .ref("Images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                message: message,
                                image: url,
                                username: { Name },
                                profilePic: { Photo }
                            });
                            handleClose();
                            setMessage("");
                            setImage("");
                            setProgress(0);
                        })
                }
            )
        }
    }
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className='modal-pop'>
                    <form>
                        <div className='modalHeading'>
                            <h3>Create Post</h3>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div className='modalHeader-top'>
                            <Avatar src={Photo.url}/>
                            <h5>
                                {Name}
                            </h5>
                        </div>

                        <div className='modalBody'>
                            <TextField
                                onChange={handleMessage} multiline rows={5} type="text" autoFocus={true} color='secondary' placeholder={` What's on your mind, ? ${Name}`} value={message} />
                        </div>

                        <div className='modalFooter'>
                            <div className='modalFooterLeft'>
                                <h4>Add to your post</h4>
                            </div>
                            <div className='modalFooterRight'>
                                <IconButton onClick={handleupload}>
                                    <PhotoLibraryIcon style={{ color: '#45bd62' }} fontSize='large' />
                                </IconButton>
                                <input type='file' id='imageFile' onChange={handleChange} style={{ display: "none" }} />
                                <IconButton disabled>
                                    <VideoCallIcon style={{ color: '#f3425f' }} fontSize='large' />
                                </IconButton>
                                <IconButton disabled>
                                    <InsertEmoticonIcon style={{ color: '#f7b928' }} fontSize='large' />
                                </IconButton>
                            </div>
                        </div>
                        {
                            image !== "" &&
                            <h2>Image is added</h2>
                        }
                        {
                            progress != "" &&
                            <progress value={progress} max='100' style={{ "width": "100%", "marginBottom": "20px" }} />
                        }

                        <input type='submit' onClick={handleSubmit} className='post-submit' value="Post" />
                    </form>
                </div>
            </Modal>
            <div className='createPost'>
                <div className='createPost-main'>

                    <div className="createPost-top">
                        <Avatar src={Photo.url}/>

                        <form>
                            <input type="text" placeholder={` What's on your mind, ? ${Name}`} onClick={handleOpen} />
                        </form>
                    </div>

                    <div className="createPost-bottom">
                        <div className="createPost-option" >
                            <VideoCallIcon style={{ color: '#f3425f' }} fontSize='large' />
                            <p>Live Video</p>
                        </div>
                        <div className="createPost-option">
                            <PhotoLibraryIcon style={{ color: '#45bd62' }} fontSize='large' />
                            <p>Photo / video</p>
                        </div>
                        <div className="createPost-option">
                            <InsertEmoticonIcon style={{ color: '#f7b928' }} fontSize='large' />
                            <p>Feeling / activity</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost;

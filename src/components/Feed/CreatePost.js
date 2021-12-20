import React, { useState } from 'react'
import { Avatar, IconButton, Modal, TextField, } from '@mui/material';
// import {VideoCallIcon, PhotoLibraryIcon, EmojiEmotionsOutlinedIcon} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './style.css'

const CreatePost = () => {
    const [open, setOpen] = useState();
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
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
                            <Avatar />
                            <h5>
                                Muhammad
                            </h5>
                        </div>

                        <div className='modalBody'>
                            <TextField multiline rows={5} type="text" autoFocus={true} color='secondary' placeholder="What's on your mind, Muhammad?" />
                        </div>

                        <div className='modalFooter'>
                            <div className='modalFooterLeft'>
                                <h4>Add to your post</h4>
                            </div>
                            <div className='modalFooterRight'>
                                <IconButton>
                                    <PhotoLibraryIcon style={{ color: '#45bd62' }} fontSize='large' />
                                </IconButton>
                                <IconButton disabled>
                                    <VideoCallIcon style={{ color: '#f3425f' }} fontSize='large' />
                                </IconButton>
                                <IconButton disabled>
                                    <InsertEmoticonIcon style={{ color: '#f7b928' }} fontSize='large' />
                                </IconButton>
                            </div>
                        </div>

                        <input type='submit' className='post-submit' value="Post" />
                    </form>
                </div>
            </Modal>
            <div className='createPost'>
                <div className='createPost-main'>

                    <div className="createPost-top">
                        <Avatar />

                        <form>
                            <input type="text" placeholder="What's on your mind, Muhammad?" onClick={handleOpen}/>
                        </form>
                    </div>

                    <div className="createPost-bottom">
                        <div className="createPost-option" >
                            <VideoCallIcon  style={{ color: '#f3425f' }} fontSize='large' />
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

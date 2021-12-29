import { CssBaseline, Typography, TextField, Card, IconButton, Stack, Avatar, Box, Button, Modal } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; import CheckCircleIcon from '@mui/icons-material/CheckCircle'; import UploadIcon from '@mui/icons-material/Upload'; import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import '../../style.css'
import Post from '../../Feed/Post';
import Feed from '../../Feed/Feed';

const UserComp = () => {
    const { uid } = useParams()
    // console.log(uid)

    const [profile, setProfile] = useState({
        Name: "",
        Bio: "",
        Photo: "",
    });

    const { Name, Bio, Photo } = profile;
    db.collection('Profile').where('uid', '==', uid).onSnapshot((data) => {
        // const userData = [];
        data.forEach((doc) => {
            // if (data.doc) {
            // console.log(doc.data());
            // userData.push(doc.data());
            const { Bio, Name, Photo } = doc.data();
            setProfile(prev => ({ ...prev, Bio, Name, Photo }))
        })
        // else {
        //     console.log("No Doc available");
        // }
        // console.log(userData[0]);
    })
    return (
        <div>
            <CssBaseline>
                <div>
                    <Card sx={{ height: 'auto', width: '60%', m: 'auto' }} className='accountMain'>
                        <div className='accountDiv'>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <IconButton color="primary"  >
                                    <Stack>
                                        <Avatar
                                            src={Photo.url}
                                            sx={{ width: 150, height: 150 }}
                                        />
                                    </Stack>
                                </IconButton>

                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2, p: 1 }}>
                                <AccountCircleOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} className='iconBtn1' />
                                <TextField id="standard-basic" label="Name" variant="standard" value={Name} sx={{ width: "50%" }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2, p: 1 }}>
                                <InfoOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} className='iconBtn1' />
                                <TextField id="standard-basic" label="About" variant="standard" value={Bio} sx={{ width: "50%" }} />
                            </Box>
                        </div>
                    </Card>
                </div>

                <Feed className='accountMain ' />

            </CssBaseline>
        </div>
    )
}

export default UserComp

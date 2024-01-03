import { Avatar, Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import EmailIcon from '@mui/icons-material/Email';
import ContactPageIcon from '@mui/icons-material/ContactPage';

interface ProfileProps {
    show: boolean
    firstName: string,
    lastName: string,
    email: string
}

export const Profile: React.FC<ProfileProps> = React.memo(({ show, firstName, lastName, email }) => {

    if (!show) return <></>;

    return (
        (
            <>
                <Container component="main">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5" align="center" className="page-title">
                            Profile
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <List>
                            <ListItem >
                                <ListItemIcon>
                                    <ContactPageIcon />
                                </ListItemIcon>
                                <ListItemText primary={`${firstName} ${lastName}`} />
                            </ListItem>
                            <ListItem >
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={email} />
                            </ListItem>
                        </List>
                    </Box>
                </Container>

            </>));
})
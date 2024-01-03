import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";
import { supabase } from "./supabaseClient";

interface SetupProfileProps {
    show: boolean;
    session: Session | null;
    onSave: () => void;
}

export const SetupProfile: React.FC<SetupProfileProps> = React.memo(({ show, session, onSave }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    if (!show) return <></>;

    const handleSave = () => {
        addUserInfo();
    };


    const addUserInfo = async () => {
        const { error } = await supabase
            .from("users")
            .update({ first_name: firstName, last_name: lastName })
            .eq("user_id", session!.user.id);

        if (error) {
            alert("There was an error when attempting to finish your profile setup.")
        } else {
            onSave();
        }
    }

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
            <Typography component="h1" variant="h5" className="page-title">
                Finish Profile Setup
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={firstName === ""}
                            helperText={firstName === "" ? "First name must contain at least 1 character" : undefined}
                            required
                            fullWidth
                            autoFocus
                            placeholder="First Name"
                            label="First Name"
                            value={firstName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={lastName === ""}
                            helperText={lastName === "" ? "Last name must contain at least 1 character" : undefined}
                            required
                            fullWidth
                            placeholder="Last Name"
                            label="Last Name"
                            value={lastName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSave}
                    disabled={firstName === "" || lastName === "" || firstName === null || lastName == null}
                >
                    Save
                </Button>
            </Box>
        </Box>
    </Container>);
})
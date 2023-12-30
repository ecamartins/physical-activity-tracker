import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { supabase } from "./supabaseClient";

interface LoginProps {
    show: boolean
}

export const Login: React.FC<LoginProps> = React.memo(({ show }) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email: email })

        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    if (!show) return <></>;

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login / Register
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        Send magic link
                    </Button>
                </Box>
            </Box>
        </Container>
    )
})
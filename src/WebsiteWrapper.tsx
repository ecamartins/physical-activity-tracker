import { CssBaseline } from "@mui/material"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { ActivityLog } from "./ActivityLog"
import { HomePage } from "./HomePage"
import { LeaderBoard } from "./LeaderBoard"
import { Login } from "./Login"
import { Logout } from "./Logout"
import NavBar from "./NavBar"
import { Profile } from "./Profile"
import { supabase } from "./supabaseClient"

export enum AppPageType {
    HOME,
    PROFILE,
    LEADERBOARD,
    LOGIN,
    LOGOUT,
    LOG
}

function WebsiteWrapper() {
    const [session, setSession] = useState<Session | null>(null)
    const [page, setPage] = useState<AppPageType>(AppPageType.HOME);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <div className="app-wrapper">
            <CssBaseline />
            <NavBar showProfile={!!session} onNavBarClick={(newPage: AppPageType) => setPage(newPage)} />
            <HomePage show={page === AppPageType.HOME} onLinkClick={(newPage: AppPageType) => setPage(newPage)} />
            <Profile show={page === AppPageType.PROFILE} />
            <LeaderBoard show={page === AppPageType.LEADERBOARD} />
            <Login show={page === AppPageType.LOGIN} />
            <ActivityLog show={page === AppPageType.LOG} session={session} />
            <Logout show={page === AppPageType.LOGOUT} />
        </div>
    )
}

export default WebsiteWrapper
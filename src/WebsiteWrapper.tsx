import { CssBaseline } from "@mui/material"
import { Session } from "@supabase/supabase-js"
import { useEffect, useMemo, useState } from "react"
import { ActivityLog } from "./ActivityLog"
import { HomePage } from "./HomePage"
import { LeaderBoard } from "./LeaderBoard"
import { Login } from "./Login"
import NavBar from "./NavBar"
import { Profile } from "./Profile"
import { SetupProfile } from "./SetupProfile"
import { SetupProfileAlert } from "./SetupProfileAlert"
import { supabase } from "./supabaseClient"

export enum AppPageType {
    HOME,
    PROFILE,
    LEADERBOARD,
    LOGIN,
    LOGOUT,
    LOG,
    PROFILE_SETUP
}

function WebsiteWrapper() {
    const [session, setSession] = useState<Session | null>(null)
    const [page, setPage] = useState<AppPageType>(AppPageType.HOME);
    const [isValidProfile, setIsValidProfile] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const onProfileSetup = useMemo(() => page === AppPageType.PROFILE_SETUP, [page]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, []);

    useEffect(() => {
        if (session) {
            const validateUser = async () => {
                const { data: userInfo, error } = await supabase
                    .from("users")
                    .select("first_name, last_name")
                    .eq("user_id", session!.user.id);

                if (!error) {
                    if (userInfo[0].first_name === null || userInfo[0].last_name === null) {
                        setIsValidProfile(false);
                    } else {
                        setFirstName(userInfo[0].first_name);
                        setLastName(userInfo[0].last_name);
                        setIsValidProfile(true);
                    }
                } else {
                    alert("Error when attempting to validate your session.");
                    setIsValidProfile(false);
                }
            }
            validateUser();
        } else {
            setIsValidProfile(false);
        }

    }, [session, onProfileSetup]);

    useEffect(() => {
        if (page === AppPageType.LOGOUT) {
            const logOut = async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    alert("Error when attempting to log out.")
                } else {
                    setPage(AppPageType.HOME);
                };
            }

            logOut();
        }
    }, [page]);

    return (
        <div className="app-wrapper">
            <CssBaseline />
            <NavBar showProfile={!!session} validProfile={isValidProfile} onNavBarClick={(newPage: AppPageType) => setPage(newPage)} avatarLetter={firstName ? firstName.charAt(0).toLocaleUpperCase() : ""} />
            <SetupProfileAlert show={!!session && !isValidProfile && page !== AppPageType.PROFILE_SETUP} goToProfileSetup={() => setPage(AppPageType.PROFILE_SETUP)} />
            <HomePage show={page === AppPageType.HOME} onLinkClick={(newPage: AppPageType) => setPage(newPage)} />
            <SetupProfile show={page === AppPageType.PROFILE_SETUP} session={session} onSave={() => setPage(AppPageType.HOME)} />
            <Profile show={page === AppPageType.PROFILE} firstName={firstName} lastName={lastName} email={session?.user.email || ""} />
            <LeaderBoard show={page === AppPageType.LEADERBOARD} />
            <Login show={page === AppPageType.LOGIN} />
            <ActivityLog show={page === AppPageType.LOG} session={session} />
        </div>
    )
}

export default WebsiteWrapper
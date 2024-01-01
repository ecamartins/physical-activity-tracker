import { Container, Box, Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useMemo, useState } from "react";
import { Database } from "../database-types";
import { supabase } from "./supabaseClient";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddToLogDialog } from "./AddToLogDialog";

const columns: GridColDef[] = [
    { field: 'activity', headerName: 'Activity', flex: 1, align: "center", headerAlign: "center", headerClassName: 'activity-log-table-header' },
    { field: 'date', headerName: 'Date', flex: 1, align: "center", headerAlign: "center", headerClassName: 'activity-log-table-header' },
    { field: 'duration', headerName: 'Duration (min)', flex: 1, align: "center", headerAlign: "center", headerClassName: 'activity-log-table-header' },
];

interface ActivityLogProps {
    show: boolean;
    session: Session | null;
}

type UserRecord = Database["public"]["Views"]["user_records"]["Row"];
type LogRecord = Omit<UserRecord, "user_id">

export const ActivityLog: React.FC<ActivityLogProps> = ({ show, session }) => {
    const [logData, setLogData] = useState<LogRecord[]>([]);
    const [openAddToLogDialog, setAddToLogDialogVisibility] = useState<boolean>(false);


    useEffect(() => {
        // Only attempt to fetch log data if we have a valid session!
        if (session !== null) {
            const getLogData = async () => {
                const { data: logRecords, error } = await supabase
                    .from("user_records")
                    .select("activity_name, date, duration")
                    .eq("user_id", session!.user.id);

                if (!error) {
                    setLogData(logRecords ? logRecords : []);
                }
            }
            getLogData();
        }
    }, [openAddToLogDialog, session]);

    const getLogRows = () => {
        return logData.map((entry, idx) => ({ id: idx, activity: entry.activity_name, date: entry.date, duration: entry.duration }));

    }

    const totalMinutes = useMemo(() => {
        return logData.reduce(
            (accum, cur) => accum + cur.duration!, 0,
        );
    }, [logData])

    if (!show) return <></>;

    return (
        <Container component="main">
            <Box sx={{ margin: 2 }}>
                <Typography component="h1" variant="h5" align="center">
                    Activity Log
                </Typography>
            </Box>
            <div className="activity-log-add-wrapper">
                <span>Total: {totalMinutes}min</span>
                <Button
                    size="small"
                    variant="contained"
                    endIcon={<AddCircleOutlineIcon />}
                    onClick={() => setAddToLogDialogVisibility(true)}>
                    Add to log
                </Button>
            </div>
            <AddToLogDialog show={openAddToLogDialog} onCloseClick={() => setAddToLogDialogVisibility(false)} session={session} />
            <DataGrid
                rows={getLogRows()}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </Container>);
}
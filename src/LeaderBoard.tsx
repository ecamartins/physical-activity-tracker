
import React, { useEffect, useState } from "react";
import { Database } from "../database-types";
import { supabase } from "./supabaseClient";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Container, Typography } from "@mui/material";
import { DateRangeInfo, DateSelector } from "./DateSelector";
import { getStartOfWeek } from "./utils";
import { DateTime } from "luxon";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Position', flex: 1, align: "center", headerAlign: "center", headerClassName: 'leaderboard-header' },
    { field: 'name', headerName: 'User', flex: 3, align: "center", headerAlign: "center", headerClassName: 'leaderboard-header' },
    { field: 'total', headerName: 'Total (min)', flex: 1, align: "center", headerAlign: "center", headerClassName: 'leaderboard-header' },
];

interface LeaderBoardProps {
    show: boolean;
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ show }) => {
    const startOfWeek = getStartOfWeek(DateTime.now());
    const endOfWeek = startOfWeek.minus({ days: -7 });
    const [board, setBoardData] = useState<Database["public"]["Functions"]["get_leaderboard"]["Returns"]>([]);
    const [dateRange, setDateRange] = useState<DateRangeInfo>({ startDate: startOfWeek, endDate: endOfWeek })

    const getLeaderboardData = async () => {
        const { data: leaderboardInfo, error } = await supabase
            .rpc('get_leaderboard', { start_date: dateRange.startDate.toFormat("yyyy-MM-dd"), end_date: dateRange.endDate.toFormat("yyyy-MM-dd") })
        if (!error) {
            setBoardData(leaderboardInfo ? leaderboardInfo : []);
        }
    }
    useEffect(() => {
        getLeaderboardData();
    }, [show, dateRange]);

    const leaderBoardRows = () => {
        return board.map((entry, idx) => ({ id: idx + 1, name: `${entry.first_name} ${entry.last_name}`, total: entry.total }));

    }
    if (!show) return <></>;

    return (
        <>
            <Container component="main">
                <Box sx={{ margin: 2 }}>
                    <Typography component="h1" variant="h5" align="center" className="page-title">
                        LeaderBoard
                    </Typography>
                </Box>
                <DateSelector sendDateRange={(dateRange: DateRangeInfo) => setDateRange(dateRange)} />
                <DataGrid
                    rows={leaderBoardRows()}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Container>

        </>);
}
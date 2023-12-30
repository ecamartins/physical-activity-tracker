
import React, { useEffect, useState } from "react";
import { Database } from "../database-types";
import { supabase } from "./supabaseClient";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Container, Typography } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Position', flex: 1, align: "center", headerAlign: "center", headerClassName: 'leaderboard-header' },
    { field: 'name', headerName: 'User', flex: 3, align: "center", headerAlign: "center", headerClassName: 'leaderboard-header' },
    { field: 'total', headerName: 'Total (min)', flex: 1, align: "center", headerAlign: "center", headerClassName: 'leaderboard-header' },
];

interface LeaderBoardProps {
    show: boolean
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ show }) => {
    const [board, setBoardData] = useState<Database["public"]["Functions"]["get_leaderboard"]["Returns"]>([]);

    const getLeaderboardData = async () => {
        const { data: leader_board_info, error } = await supabase
            .rpc('get_leaderboard', { start_date: "2023-07-01", end_date: "2023-12-06" })
        if (!error) {
            setBoardData(leader_board_info ? leader_board_info : []);
        }
    }
    useEffect(() => {
        getLeaderboardData();
    }, []);

    const leaderBoardRows = () => {
        return board.map((entry, idx) => ({ id: idx + 1, name: `${entry.first_name} ${entry.last_name}`, total: entry.total }));

    }
    if (!show) return <></>;

    return (
        <>
            <Container component="main">
                <Box sx={{ margin: 4 }}>
                    <Typography component="h1" variant="h5" align="center">
                        LeaderBoard
                    </Typography>
                </Box>
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
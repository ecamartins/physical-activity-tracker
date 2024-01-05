import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Database } from "../database-types";
import { AddNewActivityDialog } from "./AddNewActivityDialog";
import { supabase } from "./supabaseClient";
import { formatDate, getStartOfWeek } from "./utils";

interface AddToLogDialogProps {
    show: boolean;
    session: Session | null;
    onCloseClick: () => void;
}

export type ActivityRecord = Database["public"]["Tables"]["activities"]["Row"];

const WEEK_LENGTH = 7;
const ADD_NEW_ACTIVITY = 0;

export const AddToLogDialog: React.FC<AddToLogDialogProps> = React.memo(({ show, session, onCloseClick }) => {
    const today = DateTime.now();
    const startOfWeek = getStartOfWeek(today);

    const [activities, setActivities] = useState<ActivityRecord[]>([]);
    const [selectedActivityId, setselectedActivityId] = useState<string>("");
    const [selectedDateOffset, setSelectedDateOffset] = useState<number>(today.weekday % WEEK_LENGTH);
    const [duration, setDuration] = useState<number>(1);
    const [addNewActivity, setAddNewActivity] = useState<boolean>(false);

    const getWeekdays = () => {
        let weekdays = [];
        var day: DateTime = startOfWeek
        var dayFormatted: string;
        for (let idx = 0; idx < WEEK_LENGTH; idx++) {
            dayFormatted = formatDate(day, idx);
            weekdays.push(<MenuItem key={idx} value={idx}>{dayFormatted}</MenuItem>)
        }
        return weekdays;
    }

    const getActivities = async () => {
        const { data: activityList, error } = await supabase
            .from("activities")
            .select("activity_id, activity_name");

        if (!error) {
            setActivities(activityList ? activityList : []);
        }
    }

    const insertLogEntry = async () => {
        const { error } = await supabase
            .from("records")
            .insert({ user_id: session!.user.id, activity_id: Number(selectedActivityId), duration: duration, date: startOfWeek.minus({ days: -selectedDateOffset }).toFormat("yyyy-MM-dd") });

        if (error) {
            alert("There was an error when attempting to add to your log.")
        }
    }

    useEffect(() => {
        getActivities();
    }, [addNewActivity]);

    const activityDropDownItems = () => {
        return activities.map((entry, idx) => <MenuItem key={idx + 1} value={entry.activity_id}>{entry.activity_name}</MenuItem>);

    }

    const handleActivitySelection = (event: SelectChangeEvent) => {
        if (String(ADD_NEW_ACTIVITY) == event.target.value) {
            setAddNewActivity(true);
        } else {
            setselectedActivityId(event.target.value);
        }
    }

    if (!show) return <></>;

    const onAddClick = () => {
        insertLogEntry();
        onCloseClick();
    }

    if (addNewActivity) return <AddNewActivityDialog onCloseClick={() => setAddNewActivity(false)} />

    return (
        <>
            <Dialog open={show} onClose={() => onCloseClick()} fullWidth>
                <DialogTitle>Add to log</DialogTitle>
                <DialogContent>
                    <><FormControl fullWidth sx={{ marginTop: 1 }}>
                        <InputLabel id="activity-select-label">Activity</InputLabel>
                        <Select
                            labelId="activity-select-label"
                            id="activity-select"
                            value={selectedActivityId}
                            label="Activity"
                            onChange={handleActivitySelection}
                        >
                            {activityDropDownItems()}
                            <MenuItem key={ADD_NEW_ACTIVITY} value={ADD_NEW_ACTIVITY}>--- add new activity ---</MenuItem>
                        </Select>
                    </FormControl>
                        <TextField
                            id="filled-number"
                            label="Duration (min)"
                            type="number"
                            InputProps={{ inputProps: { min: 1, max: 500 } }}
                            fullWidth
                            sx={{ marginTop: 2 }}
                            value={String(duration)}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setDuration(Number(event.target.value))
                            }}
                        />
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="date-select-label">Date</InputLabel>
                            <Select
                                labelId="date-select-label"
                                label="date-select"
                                id="date-select"
                                placeholder="Date"
                                value={String(selectedDateOffset)}
                                onChange={(e: SelectChangeEvent) => {
                                    setSelectedDateOffset(Number(e.target.value))
                                }}
                            >
                                {getWeekdays()}
                            </Select>
                        </FormControl></>
                </DialogContent>
                <DialogActions style={{ justifyContent: "space-between" }}>
                    <Button onClick={() => onCloseClick()}>Cancel</Button>
                    <Button disabled={!(Number(selectedActivityId) > ADD_NEW_ACTIVITY)} onClick={() => onAddClick()}>Add</Button>
                </DialogActions>
            </Dialog>
        </>);
})
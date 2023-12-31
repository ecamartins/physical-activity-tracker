import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import { supabase } from "./supabaseClient";

interface AddNewActivityDialogProps {
    onCloseClick: () => void;
}

export const AddNewActivityDialog: React.FC<AddNewActivityDialogProps> = React.memo(({ onCloseClick }) => {
    const [newActivity, setNewActivity] = useState<string>("");

    const insertNewActivity = async () => {
        const { error } = await supabase
            .from("activities")
            .insert({ activity_name: newActivity });

        if (error) {
            alert("There was an error when attempting to add your new activity.")
        }
    }

    const onAddClick = async () => {
        await insertNewActivity();
        onCloseClick();
    }


    return (<>
        <Dialog open={true} onClose={() => onCloseClick()} fullWidth>
            <DialogTitle>Add new activity</DialogTitle>
            <DialogContent>
                <TextField
                    label="New Activity"
                    type="text"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    value={newActivity}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewActivity(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-between" }}>
                <Button onClick={() => onCloseClick()}>Cancel</Button>
                <Button onClick={() => onAddClick()}>Add</Button>
            </DialogActions>
        </Dialog>
    </>);
})
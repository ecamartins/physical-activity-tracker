import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { formatDate, getStartOfWeek } from "./utils";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

export interface DateRangeInfo {
    startDate: DateTime;
    endDate: DateTime;
}

interface DateSelectorProps {
    sendDateRange: (dateRange: DateRangeInfo) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = React.memo(({ sendDateRange }) => {
    const startOfWeek = getStartOfWeek(DateTime.now());
    const endOfWeek = startOfWeek.minus({ days: -7 });
    const [open, setDialogVisibility] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<DateTime>(startOfWeek);
    const [endDate, setEndDate] = useState<DateTime>(endOfWeek);
    const [dateRangeError, setDateRangeError] = useState<boolean>(false);
    const [validStartDate, setValidStartDate] = useState<DateTime>(startDate);
    const [validEndDate, setValidEndDate] = useState<DateTime>(endDate);


    const handleStartDateChange = (newStartDate: DateTime) => {
        if (newStartDate.startOf("day") <= endDate.startOf("day")) {
            setDateRangeError(false);
        } else {
            setDateRangeError(true);
        }
        setStartDate(newStartDate);

    }

    const handleEndDateChange = (newEndDate: DateTime) => {
        if (startDate.startOf("day") <= newEndDate.startOf("day")) {
            setDateRangeError(false);
        } else {
            setDateRangeError(true);
        }

        setEndDate(newEndDate);
    }

    const onSaveClick = () => {
        if (!dateRangeError) {
            setValidStartDate(startDate);
            setValidEndDate(endDate);
            sendDateRange({ startDate: startDate, endDate: endDate });
        }
        setDialogVisibility(false);
    }

    const onCancelClick = () => {
        setStartDate(validStartDate);
        setEndDate(validEndDate);
        setDateRangeError(false);
        setDialogVisibility(false);
    }

    const maxDateError = useMemo(() => endDate.startOf("day") > endOfWeek.startOf("day"), [endDate])

    return (<>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 1 }}>
            <span>
                {`${formatDate(validStartDate)} to ${formatDate(validEndDate)}`}
            </span>
            <IconButton color="primary" aria-label="Edit date range" onClick={() => setDialogVisibility(true)} title="Edit date range">
                <EditCalendarIcon />
            </IconButton>
        </Box>
        <Dialog open={open} onClose={() => setDialogVisibility(false)}>
            <DialogTitle>Change Date Range</DialogTitle>
            <DialogContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en-us">
                    <DatePicker sx={{ marginTop: 1, marginBottom: 1 }} label="Start Date" value={startDate} onChange={(newStartDate) => handleStartDateChange(newStartDate!)} maxDate={endDate} />
                    <DatePicker sx={{ marginTop: 1, marginBottom: 1 }} label="End Date" value={endDate} onChange={(newEndDate) => handleEndDateChange(newEndDate!)} minDate={startDate} maxDate={endOfWeek} />
                </LocalizationProvider>
                {(dateRangeError || maxDateError) && <Alert severity="error" sx={{ maxWidth: 225 }}>
                    {dateRangeError && "End date cannot be before start date."}
                    {(dateRangeError && maxDateError) && <br />}
                    {maxDateError && "The end date can not exceed the end of the week."}
                </Alert>}
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-between" }}>
                <Button onClick={() => onCancelClick()} > Cancel</Button>
                <Button disabled={dateRangeError} onClick={() => onSaveClick()}>Save</Button>
            </DialogActions>
        </Dialog>
    </>);
})
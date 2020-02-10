export interface BookingModel {
    dateInput: {
        year: number;
        month: number;
        day: number;
    };
    date: Date;
    startTimeInput: {
        hour: number;
        minute: number;
        second: number;
    };
    startTime: Date;
    endTimeInput: {
        hour: number;
        minute: number;
        second: number;
    };
    endTime: Date;
}

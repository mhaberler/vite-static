import { useState } from 'react';
import { format, addHours } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const maxDays = 14;

const DateTimeSlider = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const startTime = new Date(); // Now
    const endTime = addHours(startTime, 24 * maxDays);

    return (

        <div style={{ width: '80vh', height: '90vw', margin: 20 }}>
            <DatePicker
                selected={selectedDate}
                onChange={(date : any) => {
                    if (date !== null) {
                        setSelectedDate(date);
                    }
                    setSelectedDate(date);
                    console.log('setSelectedDate', date?.getTime()) // unix timestamp
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={startTime}
                maxDate={endTime}
            />
            <div>
                Selected Date & Time: {format(selectedDate, 'MMMM d, yyyy h:mm aa')}
            </div>
        </div>

    );
};

export default DateTimeSlider;

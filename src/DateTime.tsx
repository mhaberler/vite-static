import { useState} from 'react';
import { format, addHours } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import { useContext} from 'react';

// import DateTimeContext from './DateTimeContext';


const maxDays = 14;


const DateTimeSlider = () => {

    // const { dateTime, setDateTime }  = useContext(DateTimeContext);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const startTime = new Date(); // Now
    const endTime = addHours(startTime, 24 * maxDays);

    return (
        <div>
            <div>
                Selected Date & Time: {format(selectedDate, 'MMMM d, yyyy h:mm aa')}
            </div>
            <DatePicker
                selected={selectedDate}
                onChange={(date: any) => {
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

        </div>

    );
};

export default DateTimeSlider;

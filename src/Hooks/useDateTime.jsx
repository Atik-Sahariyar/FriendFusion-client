import { useState, useEffect } from 'react';

const useDateTime = () => {
    const [dateObj, setDateObj] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateObj(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const formattedDateTime = {
        year: dateObj.getFullYear(),
        month: String(dateObj.getMonth() + 1).padStart(2, '0'),
        date: String(dateObj.getDate()).padStart(2, '0'),
        hours: String(dateObj.getHours()).padStart(2, '0'),
        minutes: String(dateObj.getMinutes()).padStart(2, '0'),
        seconds: String(dateObj.getSeconds()).padStart(2, '0')
    };

    return formattedDateTime;
};

export default useDateTime;





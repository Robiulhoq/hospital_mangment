import { useState } from 'react';
import { getCookie } from '../Utils/getCookie';

const usePutrequiest = (api, obj, setTigger) =>{
    const [putLoading, setPutloading] = useState(false);
    const [putMessage, setPutmessage] = useState('');
    const token = getCookie('access_token');

    if (putMessage) {
        setInterval(() => {
            setPutmessage('')
        }, 5000);
    }
    const hendleEdit = async () => {
        
        try {
            setPutloading(true)
            const response = await fetch(api, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            });
            setTigger(true);
            const responseData = await response.json();
            responseData.message = 'Doctor edit successfull';
            setPutmessage(responseData.message);
            setPutloading(false)
        } catch (error) {
            console.log(error, 'An error occurred in put requiest');
            setPutloading(false);
        }
    }
    return {putLoading, putMessage, hendleEdit}
}
export default usePutrequiest;
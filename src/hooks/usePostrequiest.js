import { useState } from 'react';
import { getCookie } from '../Utils/getCookie';

const usePostrequiest = (api, oj, setTigger) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');

    const hendleSaveDepartment = async () => {
        console.log('clicked');
        try {
            const values = Object.values(oj);
            if (values.some(value => !value.trim())) {
                setMessage("Please fill out all fields");
                return;
            }
            setLoading(true);
            let apiUrl = api;
            let method = 'POST';

            const response = await fetch(apiUrl, {
                method: method,
                body: JSON.stringify(oj),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            const responseData = await response.json();
            responseData.message = 'Department save successful';
            setMessage(responseData.message);
            setLoading(false);
            setTigger(true);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while saving the department');
            setLoading(false);
        }
    };

    return { loading, message, setMessage, hendleSaveDepartment };
};

export default usePostrequiest;

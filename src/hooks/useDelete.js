import axios from 'axios';
import { useState } from 'react';
import { getCookie } from '../Utils/getCookie';
const useDelete = (api, setTigger) =>{
    const [deleteMessage, setDeleteMessage] = useState('');
    const [deleteloading, setDeleteloading] = useState(false);
    const token = getCookie('access_token');
    const hendleDelete = async (id) => {
        try {

            const response = await axios.delete(api +id,{
                headers: {'Authorization': `Bearer ${token}`}
            });
            setDeleteMessage(response.data);
            setTigger(true);

        } catch (error) {
            setDeleteMessage('Error deleting department');
            throw error;
        }
    }
    if (deleteMessage) {
        setInterval(() => {
            setDeleteMessage('');

        }, 5000);
    }
    return {deleteloading, deleteMessage, hendleDelete}
}
export default useDelete;
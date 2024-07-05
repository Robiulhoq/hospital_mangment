import { useEffect, useState } from 'react';
import { getCookie } from '../Utils/getCookie';
const useFetch = (url, tigger) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = getCookie('access_token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, url, tigger]);

    return { data, loading, error };
};

export default useFetch;

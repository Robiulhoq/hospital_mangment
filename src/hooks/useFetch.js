import { useEffect, useState } from 'react';
import { getCookie } from '../Utils/getCookie';
const useFetch = (url, tigger, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = getCookie('access_token');
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError(new Error('No token provided'));
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
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

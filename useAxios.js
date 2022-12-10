import { useState, useEffect } from "react";

export const useAxios = (config) => {
    const { axiosInstance, method, url, requestConfig = {} } = config;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prev => prev + 1);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal,
                });

                setResponse(res.data);
                setError('');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [reload]);

    return [response, error, loading, refetch];
};
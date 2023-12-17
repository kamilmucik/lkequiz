import React, {useState, useEffect } from "react";

const UseFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        console.log('UseFetch ' + {url});

        const fetchData = async () => {
            try {
                const resp = await fetch(apiData);
                const data = await resp?.json;
                setApiData(data)
            } catch (error) {
                setServerError(error)
            }
            setIsLoading(false);
        }

        fetchData()
    }, [url])

    return {isLoading, apiData, serverError}
}
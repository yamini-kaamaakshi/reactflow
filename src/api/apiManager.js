// src/services/apiService.js
import axios from 'axios';

export const fetchData = async (url, setter, apiKey, setIsLoading) => {
    try {
        setIsLoading(true);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Fetched data from ${url}:`, result);

        setter(result?.data || []);
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
    } finally {
        setIsLoading(false);
    }
};

export const fetchTriggers = (apiServer, setTriggers, apiKey, setIsLoading) =>
    fetchData(`${apiServer}/api/lookup_automation/triggers`, setTriggers, apiKey, setIsLoading);

export const fetchActions = (apiServer, triggerCode, setActions, apiKey, setIsLoading) =>
    fetchData(`${apiServer}/api/lookup_automation/actions?triggerCode=${triggerCode}`, setActions, apiKey, setIsLoading);

export const fetchJobTypes = (apiServer, setJobTypes, apiKey, setIsLoading) =>
    fetchData(`${apiServer}/api/masterdata/jobTypes`, setJobTypes, apiKey, setIsLoading);

export const fetchTags = (apiServer, setTags, apiKey, setIsLoading) =>
    fetchData(`${apiServer}/api/masterdata/tags/v2`, setTags, apiKey, setIsLoading);

export const fetchUsers = async (setUsers, apiKey) => {
    try {
        const response = await axios.get(`https://api.recruitly.io/api/masterdata/candidatestatus`, {
            params: { apiKey },
        });

        const usersData = response.data.data;
        setUsers(usersData);
        console.log("usersData", usersData);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

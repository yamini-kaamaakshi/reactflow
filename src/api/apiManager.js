import axios from 'axios';

export const createApiService = (apiServer, apiKey, setIsLoading) => {
    const fetchData = async (url, setter) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${apiServer}${url}`, {
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

    return {
        fetchTriggers: (setTriggers) => fetchData(`/api/lookup_automation/triggers`, setTriggers),
        fetchActions: (triggerCode, setActions) => fetchData(`/api/lookup_automation/actions?triggerCode=${triggerCode}`, setActions),
        fetchJobTypes: (setJobTypes) => fetchData(`/api/masterdata/jobTypes`, setJobTypes),
        fetchTags: (setTags) => fetchData(`/api/masterdata/tags/v2`, setTags),
        fetchUsers: async (setUsers) => {
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
        },
    };
};

import axios from 'axios'
// util/api.js

export const checkEmailExists = async (email: string) => {
    try {
        const response = await fetch('/api/checkEmailExists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
};

export const fetcher = async (method: any, url: any, headers: any) =>
	await axios({
		method: method,
		url: url,
		headers: headers,
	}).then((res) => res)

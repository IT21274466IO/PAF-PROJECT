
export const sendPostRequest = async (url, {arg}) => {
    const authToken = localStorage.getItem('Token')
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        body: JSON.stringify(arg),
    });
    return await response.json();
};

export const sendPutRequest = async (url, {arg}) => {
    const authToken = localStorage.getItem('Token')
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
        body: JSON.stringify(arg),
    });
    return await response.json();
};

export const sendGetRequest = async (url) => {
    const authToken = localStorage.getItem('Token')
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
        },
    });
    return await response.json();
};

const requestTypes = {
    sendPostRequest,sendGetRequest,sendPutRequest
}

export default requestTypes

const fetchSinToken = (url, data, method = 'GET') => {

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })
}


const fetchConToken = (url, data, method = 'GET') => {

    if (method === 'GET') {
        return fetch(url, {
            method,
            mode: 'cors'
        })
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        });
    }

}

export {
    fetchSinToken,
    fetchConToken
}
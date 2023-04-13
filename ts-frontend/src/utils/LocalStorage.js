const getLoginData = (key) => {
    return localStorage.getItem(key);
}

const saveLoginData = (key, param) => {
    if(key && param)
        localStorage.setItem(key, param);
}

export {
    getLoginData,
    saveLoginData
}
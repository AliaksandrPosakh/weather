
function readFromLocalStorage(key) {
    const weatherDataList = localStorage.getItem(key);
    return (weatherDataList == null || weatherDataList === '')? []: JSON.parse(weatherDataList); 

}

function saveDataListToLocalStorage(dataList, key) {
    localStorage.setItem(key, JSON.stringify(dataList));
}

function addDataInLocalStorage(data, key) {
    const dataList = readFromLocalStorage(key);
    dataList.push(data);
    saveDataListToLocalStorage(dataList, key);
}

function deleteDataInLocalStorage(name, key) {
    const list = readFromLocalStorage(key);
    const newList = list.filter(item => item.city.toLowerCase() === name.toLowerCase());
    saveDataListToLocalStorage(newList, key);
}

export default {
    deleteDataInLocalStorage,
    readFromLocalStorage,
    saveDataListToLocalStorage,
    addDataInLocalStorage
}
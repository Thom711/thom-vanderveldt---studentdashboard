export const getValues = (data, value) => {
    return data.map((item) => {
        return item[value];
    });
};

export const getUnique = (data, value) => {
    return [...new Set(getValues(data, value))];
};

export const setNewSortingMethod = (method, a, b) => {
    switch(method) {
        case 'none':
            return a - b;
        case 'name-az':
            return a["Wie ben je?"].toUpperCase() === b["Wie ben je?"].toUpperCase() 
                ? 0
                : a["Wie ben je?"].toUpperCase() > b["Wie ben je?"].toUpperCase()
                ? 1
                : -1;
        case 'name-za':
            return a["Wie ben je?"].toUpperCase() === b["Wie ben je?"].toUpperCase() 
                ? 0
                : a["Wie ben je?"].toUpperCase() < b["Wie ben je?"].toUpperCase()
                ? 1
                : -1;
        case 'assignment-az':
            return a["Welke opdracht of welk project lever je nu in?"].toUpperCase() === b["Welke opdracht of welk project lever je nu in?"].toUpperCase() 
                ? 0
                : a["Welke opdracht of welk project lever je nu in?"].toUpperCase() > b["Welke opdracht of welk project lever je nu in?"].toUpperCase()
                ? 1
                : -1;
        case 'assignment-za':
            return a["Welke opdracht of welk project lever je nu in?"].toUpperCase() === b["Welke opdracht of welk project lever je nu in?"].toUpperCase() 
                ? 0
                : a["Welke opdracht of welk project lever je nu in?"].toUpperCase() < b["Welke opdracht of welk project lever je nu in?"].toUpperCase()
                ? 1
                : -1;
        case 'diff-lowhigh':
            return a["Hoe moeilijk vond je deze opdracht?"] - b["Hoe moeilijk vond je deze opdracht?"];
        case 'diff-highlow':
            return b["Hoe moeilijk vond je deze opdracht?"] - a["Hoe moeilijk vond je deze opdracht?"];
        case 'fun-lowhigh':
            return a["Hoe leuk vond je deze opdracht?"] - b["Hoe leuk vond je deze opdracht?"];
        case 'fun-highlow':
            return b["Hoe leuk vond je deze opdracht?"] - a["Hoe leuk vond je deze opdracht?"];
        default :
            return a - b; 
    };
};
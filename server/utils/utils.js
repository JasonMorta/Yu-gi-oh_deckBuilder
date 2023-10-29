
//returns the current date and time when called
function getCurrentDate() {
    const date = new Date(); // replace this with your actual date
    const formattedDate = date.toLocaleString(); // Adjust options for locale and formatting as needed
    console.log('formattedDate', formattedDate)
    return formattedDate;
}

//byte converter
const formatBytes = async (bytes) => {
    console.log('bytes', bytes)
    if (bytes < 1000) {
        return await bytes + 'B';
    } else if (bytes < 1000000) {
        return await (bytes / 1000).toFixed(2) + 'KB';
    } else {
        return await (bytes / 1000000).toFixed(2) + 'MB';
    }
};

function log(message) {
    return console.log(message)
}


//expert as object incase we want to add more properties
module.exports = {
    getCurrentDate,
    formatBytes,
    log
}
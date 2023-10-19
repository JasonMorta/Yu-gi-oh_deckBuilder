
//returns the current date and time when called
function getCurrentDate(){
    const date = new Date(); // replace this with your actual date
    const formattedDate = date.toLocaleString(); // Adjust options for locale and formatting as needed
    console.log('formattedDate', formattedDate)
    return formattedDate;
}


//expert as object incase we want to add more properties
module.exports = {
    getCurrentDate
}
let mergedArray = []

function getDBArray(){
const array1 = db.array //[55,33,22,44];
mergedArray = [...array1];

// Merging two arrays and removing duplicates
 mergedArray = Array.from(new Set([...mergedArray, ...array1]));

// Logging the merged array with duplicates removed
 console.log("Merged Array with Duplicates Removed:", mergedArray);
}

getDBArray()
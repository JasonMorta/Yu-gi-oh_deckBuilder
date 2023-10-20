//*============================================ UPDATE ============================================*//

//updateOne can take up to 3 arguments: filter, update, options

// $set: is used to replace a value in an existing document 
db.coll.updateOne({ "_id": 1 }, // Find the document with _id: 1
    { // initial object {..."year": 2015, name: "Max"}
        $set: { "year": 2016, name: "Max" }
    } // updated object {"year": 2016, name: "Max"}
)

// $unset: removes a field from a document
db.coll.updateOne({ "_id": 1 },
    { // initial object {..."year": 2015, name: "Max"}
        $unset: { "year": 1 } // 1 removes the field, 0 keeps the field
    } // updated object {name: "Max"}
)

// $rename: renames a field/property
db.coll.updateOne({ "_id": 1 },
    { // initial object {..."year": 2015, name: "Max"}
        $rename: { "year": "date" }
    } // updated object {date: 2015, name: "Max"}
)

// $inc: increments a value
db.coll.updateOne({ "_id": 1 },
    { // initial object {..."year": 2015, name: "Max"}
        $inc: { "year": 5 } // $inc = increment | $dec = decrement
    } // updated object {year: 2020, name: "Max"}
)

// $mul: multiplies a value
db.coll.updateOne({ "_id": 1 },
    { // initial object { ..."price": NumberDecimal("5.00"), "qty": 4 }
        $mul: {
            price: NumberDecimal("1.25"), // The value of the "price" field is multiplied by 1.25 
            qty: 2
        } // The value of the "qty" field is multiplied by 2
    } // updated object {..."price": NumberDecimal("6.25"), "qty": 8 }
    /* 
    NumberDecimal is a data type used in MongoDB to represent decimal128 values.
    Its a constructor used to create a BSON Decimal128 instance.
    It is specifically designed to handle precise decimal calculations and is commonly 
    used in cases where accurate floating-point arithmetic is required, 
    such as in financial calculations or other scenarios where precision is critical.
    */
)


// $min: only updates the field if the specified value is less than the existing field value
db.coll.updateOne({ "_id": 1 },
    { // initial object {..."imdb": 7 }
        $min: { "imdb": 5 } // is the specified value is already less than the existing field value, no update occurs
    } // updated object {imdb: 5}
)

// $max: only updates the field if the specified value is greater than the existing field value
db.coll.updateOne({ "_id": 1 }, { $max: { "imdb": 8 } })

// $currentDate: sets the value of a field to current date
db.coll.updateOne({ "_id": 1 },
    {  // initial object {..."lastModified": ISODate("2017-03-14T01:42:36.615Z") } // ISODate is a data type used in MongoDB to represent a date value.
        $currentDate: { "lastModified": true } // $currentDate : updates the value of the "lastModified" field to the current date.
    } // updated object {... "lastModified": ISODate("2020-12-14T01:42:36.615Z") }
)

// $currentDate: sets the value of a field to current date
db.coll.updateOne({ "_id": 1 },
    { // initial object {..."lastModified": ISODate("2017-03-14T01:42:36.615Z") }
        $currentDate: {
            "lastModified": {
                $type: "timestamp" // $type: "timestamp" is used to specify the type of the field to be updated.
            }
        }
    } // updated object {... "lastModified": Timestamp(1607902956, 1) } 
)

//*** Update Array

// $push: adds an element to an array
db.coll.updateOne({ "_id": 1 }, {
    // initial "array": [1, 2, 3, 4, 5]
    $push: { "array": 1 } // The $push operator appends the value 1 to the array field
} // updated "array": [1, 2, 3, 4, 5, 1]
)

// $pull: removes all matching values from an array
db.coll.updateOne({ "_id": 1 }, {
    // initial "array": [1, 2, 3, 1, 4, 5, 1]
    $pull: { "array": 1 }  // The $pull operator removes all elements/values that match the value 1 from the array field
})

// $addToSet: adds an element to an array if it doesn't exist
db.coll.updateOne({ "_id": 1 },
    {  // initial "array": [1, 2, 3, 4, 5]
        $addToSet: { "array": 2 } // The $addToSet operator adds the value 2 to the array field if the value doesn't exist
    } // updated "array": [1, 2, 3, 4, 5] ; no change because 2 already exists
)

// $pop: removes the first or last element of an array
db.coll.updateOne({ "_id": 1 },
    {  // initial "array": [1, 2, 3, 4, 5]
        $pop: { "array": 1 } // 1 removes the first element. -1 removes the last element
    } // updated "array": [1, 2, 3, 4] ; removes the last element
)


// $pushAll: adds multiple elements to an array
db.coll.updateOne({ "_id": 1 },
    { // initial "array": [1, 2, 3, 4, 5]
        $pullAll: { "array": [3, 4, 5] }
    } // updated "array": [1, 2] ; removes all elements that match the values 3, 4, 5
)

// $push & $each: adds multiple elements to an array - this example pushes 2 elements into the scores array
db.coll.updateOne({ "_id": 1 },
    { // initial "scores": [ 80, 85, 92 ]
        $push: { "scores": { $each: [{ name: "Jason" }, 92] } } // $each allows multiple values to be added to the array
    } // updated "scores": [ 80, 85, 92,{name: "Jason"}, 92 ]
)// if values already exist, they are added again

// $addToSet & $each: adds multiple elements to an array if they 'don't exist' - if values already exist, they are not added.
db.coll.updateOne({ "_id": 1 },
    {  // initial "scores": [ 80, 85, 92 ]
        $addToSet: { "scores": { $each: [{ name: "Jason" }, 92] } }
    } // updated "scores": [ 80, 85, 92,{name: "Jason"} ]
) // if values already exist, they are not added

// $each & $sort: adds multiple elements to an array and sorts them. $sort: 1 = ascending, -1 = descending
db.coll.updateOne({ "_id": 2 }, { $push: { "scores": { $each: [40, 60], $sort: 1 } } }) // array sorted

// $set: replaces an element in an array at the specified position - grades.$ refers to the first element called grades if there are multiple
// To replace the second element, use grades.1: 
// .$ us used to update the first element that matches the query condition
//.0 refers to the first element in the array
db.coll.updateOne({
    "_id": 1, // find the document with _id: 1 and grades that contains 80
    "grades": 80
}, { // initial "grades": [ 80, 85, 92 ]
    $set: { "grades.$": 82 } // grades.$ is similar to grades[0], referring to the first value in the array.
} // updated "grades": [ 82, 85, 92 ]
)

// updateMany can take up to 3 arguments: filter, update, options

// $[] is a placeholder for all elements in the array - this example increments all elements called grades by 10
db.coll.updateMany({}, { $inc: { "grades.$[]": 10 } })

// {}, // An empty filter condition ({}) indicates that all documents in the collection will be updated.
// Here grades is an array.
// $[element] is used to identify the specific element within the 'grades' array that matches the condition specified in the arrayFilters.
db.coll.updateMany({}, { $set: { "grades.$[element]": 100 } }, { multi: true, arrayFilters: [{ "element": { $gte: 100 } }] })
// multi: true, // The multi option allows updating multiple documents that match the filter condition.
// The arrayFilters option filters the elements in the "grades" array based on the specified condition, 
// where the element value is greater than or equal to 100.


//findOneAndUpdate can take up to 3 arguments: filter, update, options

// $inc: increments the value of the specified field by the specified amount
// returnNewDocument: true, // The returnNewDocument option specifies whether to return the updated document or not.
db.coll.findOneAndUpdate(
    { "name": "Max" }, 
{ $inc: { "points": 5 } }, 
{ returnNewDocument: true }
)

// updateOne can take up to 3 arguments: filter, update, options

db.coll.updateOne({ "_id": 1 },
    {
        $set: { item: "apple" }, // The $set operator sets the value of the 'item' field to 'apple' in the matched document
        $setOnInsert: { defaultQty: 100 }// The $setOnInsert operator sets the value of the 'defaultQty' field to 100 only if an upsert operation creates a new document. "Adds a new property to this document only if the document is inserted as a result of this operation."
    }, { upsert: true } // The upsert option allows the operation to insert a new document if no document matches the query condition. If a document is inserted, the $setOnInsert operator will be applied to the newly inserted document.
)

// updateMany can take up to 3 arguments: filter, update, options

// Replace all fields in a document except for the _id field.
db.coll.replaceOne({ "name": "Max" },
    { // initial object {"_id":...,"name": "Max",  "name": "Max", "age": 30 }
        "firstname": "Maxime", "surname": "Beugnet"
    } // updated object { "_id":...,"firstname": "Maxime", "surname": "Beugnet" }
)

// Write concern
db.coll.updateMany({}, {
    $set: { "x": 1 } // The $set operator sets the value of the 'x' field to 1 in the matched document
}, {
    "writeConcern": { // writeConcern is mainly used to specify the level of acknowledgment requested from MongoDB for write operations to a standalone mongod or to replica sets or to sharded clusters.
        "w": "majority", // The write concern option specifies that acknowledgment is requested from a majority of the replica set members
        "wtimeout": 5000 // The wtimeout option sets a timeout of 5 seconds for the write concern
    }
}
)


//* Collection Methods

//Return a specific collection in the database using the mongoose.connection object
//This is done after the connection has been established
const db = mongoose.connection.db;// gives us access to the database
const coll = db.collection("collectionName");

//can only be used in the mongo shell/terminal. Not in the application code(sometimes).
coll.stats() // returns statistics about the collection
coll.storageSize() // returns the total size in bytes of the data in the collection
coll.totalIndexSize() // returns the total size in bytes of all indexes created on the collection
coll.validate({full: true}) // validates the collection, returning statistics that reflect the extent of corruption
coll.renameCollection() // renames the collection = db.coll.renameCollection("newName")
//↑↑↑↑ Above methods are deprecated as of MongoDB 4.0. ↑↑↑↑

//use $collStats instead
coll.aggregate([{ $collStats: {} }]) // returns statistics about the collection

//get the collection size in bytes. *🚩.toArray() is required to return the results as an array
coll.aggregate([{ $collStats: { storageStats: { scale: 1 } } }]).toArray()
// storageStats gives gives you access to the storage statistics of the collection.
// scale: 1 returns the size in bytes. 
// scale: 1024 returns the size in kilobytes. 
// scale: 1048576 returns the size in megabytes.

// OR use

// db[0].storageStats.size : returns the size of the collection in bytes
// log(db[0].storageStats): to see all the properties available

// Rename a collection
coll.renameCollection("oldName", "newName", { dropTarget: true }); // Set dropTarget to true to drop the target collection if it already exists

//*============================================ DELETE ============================================*//
// deletes the first document that matches the filter condition
db.coll.deleteOne({ name: "Max" })

// deletes all the documents that match the filter condition
db.coll.deleteMany({ name: "Max" },
    { "writeConcern": { "w": "majority", "wtimeout": 5000 } }
)

// WARNING! Deletes all the docs but not the collection itself and its index definitions
db.coll.deleteMany({})


// findOneAndDelete can take up to 3 arguments: filter, options

// deletes the first document that matches the filter condition and returns the deleted document
db.coll.findOneAndDelete({ "name": "Max" })



//* Comparison
// returns all documents where the value of the "year" property meets the specified condition
db.coll.find({ "year": { $gt: 1970 } })          // $gt = greater than
db.coll.find({ "year": { $gte: 1970 } })         // $gte = greater than or equal to
db.coll.find({ "year": { $lt: 1970 } })          // $lt = less than
db.coll.find({ "year": { $lte: 1970 } })         // $lte = less than or equal to
db.coll.find({ "year": { $ne: 1970 } })          // $ne = not equal to
db.coll.find({ "year": { $in: [1958, 1959] } })  // $in = in array
db.coll.find({ "year": { $nin: [1958, 1959] } }) // $nin = not in array



//* Logical

// returns all documents where the value of the "name" property is not equal to "Max"
db.coll.find({ name: { $not: { $eq: "Max" } } })

// $or : returns selects all documents where the value of the "year" property is either 1958 or 1959
db.coll.find({ $or: [{ "year": 1958 }, { "year": 1959 }] })

//$nor: returns all documents where the value of the "price" property is not equal to 1.99 and the value of the "sale" property is not equal to true
db.coll.find({ $nor: [{ price: 1.99 }, { sale: true }] })

// $and / $or: returns all documents where the value of the "qty" property is less than 10 or greater than 50 
// and the value of the "sale" property is true or the value of the "price" property is less than 5
db.coll.find({
    $and: [
        { $or: [{ qty: { $lt: 10 } }, { qty: { $gt: 50 } }] },
        { $or: [{ sale: true }, { price: { $lt: 5 } }] }
    ]
})


//*============================================ READ ============================================*//
// $exists: returns all documents where the "name" property exists
db.coll.find({ name: { $exists: true } })

// $type: returns all documents where the "zipCode" property is of BSON type = string
db.coll.find({ "zipCode": { $type: 2 } }) // 2 = string | 16 = int | 18 = array

// "string" is an alias for 2 | "int" is an alias for 16 | "array" is an alias for 18
db.coll.find({ "zipCode": { $type: "string" } })


//* Text search with a "text" index
//$text is used to perform text search queries on a collection with a text index
//$search is used to specify the search string
db.coll.find({ $text: { $search: "cake" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } })

db.coll.find({ $text: { $search: "cake" } },
    /*
    This part of the query is using the $text operator to perform a text search within the collection. 
    The $search operator specifies the search term "cake". MongoDB's text search is capable of 
    searching for specified words or phrases in a text index. 
     */
    { score: { $meta: "textScore" } }
    /* 
    This part of the query is used to project the text search score for each document. 
    The $meta operator is used to access the metadata associated with the text search score. 
    This allows you to include the text search score in the query results.
    */
).sort({ score: { $meta: "textScore" } }
    /* 
     This part of the query is sorting the results based on the text search score. 
     By sorting the documents based on the text search score, you can retrieve the
      most relevant documents first, according to their relevance to the search term "cake".
    */
)
/* 
    Before
{
    "_id" : 1,
    "item" : "cake",
    "type" : "chocolate"
}
    After
{
    "_id" : 1,
    "item" : "cake",
    "type" : "chocolate",
    "score" : 1.5 // A hypothetical text search score
} 
*/


//* Regex
// /^Max/: returns all documents where the value of the "name" property starts with "Max"
db.coll.find({ name: /^Max/ })
db.coll.find({ name: /^Max$/i }) // i: case-insensitive


// $regex: returns all documents where the value of the "name" property matches the specified regular expression.
db.coll.find({ name: { $regex: /^Max/ } })
db.coll.find({ name: /^Max/ }) // is a shorthand for {name: {$regex: /^Max/}}


//* Find in Arrays
// $all: returns all documents where the "tags" property contains all the specified array elements
db.coll.find({ tags: { $all: ["Realm", "Charts"] } })

// $size: returns all documents where the "tags" property is an array that contains 2 elements
db.coll.find({ field: { $size: 2 } }) // 2 refers to the number of elements in the array, not the index

// $elemMatch: returns all documents where the "results" property contains a product whose field "product" equals "xyz" and whose field "score" is greater than or equal to 8
db.coll.find({ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } })


//* Sort, skip, limit

// sort(): sorts the documents in ascending order by the value of the "year" property; 1 = ascending, -1 = descending
db.coll.find({}).sort({ "year": 1, "rating": -1 })

// skip(): skips the first 10 documents and returns the remaining documents
db.coll.find({}).skip(10)

// limit(): returns only 3 documents
db.coll.find({}).limit(3)

//.toArray(): returns all the documents in an array
db.coll.find({}).toArray()

db.coll.find({}).sort({ "year": 1, "rating": -1 }).skip(10).limit(3) // all the above combined.


//*============================================ CREATE ============================================*//

// insertOne(): inserts a single document into a collection
db.coll.insertOne({ name: "Max" })

// insertMany(): inserts multiple documents into a collection
db.coll.insertMany([{ name: "Max" }, { name: "Alex" }]) // ordered bulk insert

// unordered bulk insert
db.coll.insertMany([{ name: "Max" }, { name: "Alex" }], { ordered: false })// default is true

// insert(): inserts a single document into a collection
db.coll.insertOne({ date: ISODate() })
db.coll.insertOne({ name: "Max" }, { "writeConcern": { "w": "majority", "wtimeout": 5000 } })
// The second argument is the write concern. In short: how many nodes need to confirm the write operation before it is considered successful. Not required.

//save a new document
db.coll.save({ name: "Max" })

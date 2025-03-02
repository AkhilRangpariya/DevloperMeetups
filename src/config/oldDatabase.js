// connection using direct mongodb
// const { MongoClient } = require("mongodb");

const url =
    "mongodb+srv://akhilrangpariya9494:Jr6QpDq8OnUxYI5i@devmeetupsdbsystem.ogsp8.mongodb.net/?retryWrites=true&w=majority&appName=DevmeetupsDBSystem";

const client = new MongoClient(url);

const dbName = 'DeevMeetUps';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    const findResult = await collection.find({}).toArray();
    console.log('Found document => ', findResult);


    return 'done.';

}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());


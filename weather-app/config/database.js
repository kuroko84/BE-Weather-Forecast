const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://tranphonglq:mynameisphong8@cluster0.xbgbcns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getClient() {
  return client;
}

async function testConnection() {
  try {
    // Kết nối tới MongoDB
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    // Ping MongoDB để xác nhận kết nối
    const database = client.db("<database>");
    const pingResult = await database.command({ ping: 1 });
    console.log("MongoDB ping result:", pingResult);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    // Đóng kết nối
    await client.close();
  }
}

module.exports = { connect, getClient, testConnection };

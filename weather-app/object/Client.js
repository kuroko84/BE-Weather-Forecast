const db = require("../config/database");

class Client {
  constructor(email, key, isActivated, location) {
    this.email = email;
    this.key = key;
    this.isActivated = isActivated;
    this.location = location;
  }

  async insertClient() {
    const client = db.getClient();
    try {
      // Kết nối tới MongoDB
      await client.connect();
      console.log("Connected to MongoDB");

      // Thêm client vào cơ sở dữ liệu
      const database = client.db("test");
      const clientsCollection = database.collection("clients");
      const clientData = {
        email: this.email,
        key: this.key,
        isActivated: this.isActivated,
        location: this.location,
      };
      const result = await clientsCollection.insertOne(clientData);
      console.log(`$client inserted with id: ${result.insertedId}`);
    } catch (error) {
      console.error("Error inserting client:", error);
    } finally {
      // Đóng kết nối
      await client.close();
      console.log("Connection to MongoDB closed");
    }
  }

  async verifyClient(verificationCode) {
    const client = db.getClient();
    try {
      // Kết nối tới MongoDB
      await client.connect();
      console.log("Connected to MongoDB");

      // Tìm kiếm client với mã xác minh và chuyển trạng thái isActivated thành true
      const database = client.db("test");
      const clientsCollection = database.collection("clients");
      const query = { key: verificationCode };
      const update = { $set: { isActivated: true } };
      const result = await clientsCollection.updateOne(query, update);

      // Kiểm tra xem có bản ghi nào được cập nhật không
      if (result.modifiedCount === 1) {
        console.log("Client verified successfully");
        return true;
      } else {
        console.log(
          "Verification failed: Client not found or already verified"
        );
        return false;
      }
    } catch (error) {
      console.error("Error verifying client:", error);
      return false;
    } finally {
      // Đóng kết nối
      await client.close();
      console.log("Connection to MongoDB closed");
    }
  }

  async findAllClients() {
    const client = db.getClient();
    try {
      // Kết nối tới MongoDB
      await client.connect();
      console.log("Connected to MongoDB");

      // Tìm tất cả các client trong cơ sở dữ liệu
      const database = client.db("test");
      const clientsCollection = database.collection("clients");
      const clients = await clientsCollection.find({}).toArray();
      return clients;
    } catch (error) {
      console.error("Error finding all clients:", error);
      return [];
    } finally {
      // Đóng kết nối
      await client.close();
      console.log("Connection to MongoDB closed");
    }
  }
}

module.exports = Client;

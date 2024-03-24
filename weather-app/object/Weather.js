const nodemailer = require("nodemailer");
const db = require("../config/database");

class Weather {
  constructor(
    date,
    name,
    country,
    condition,
    icon_url,
    avgtemp_c,
    maxwind_mph,
    avghumidity
  ) {
    this.date = date;
    this.name = name;
    this.country = country;
    this.condition = condition;
    this.icon_url = icon_url;
    this.avgtemp_c = avgtemp_c;
    this.maxwind_mph = maxwind_mph;
    this.avghumidity = avghumidity;
  }

  // Save weather data to database

  async insertWeather() {
    const client = db.getClient();
    try {
      // Kết nối tới MongoDB
      await client.connect();
      console.log("Connected to MongoDB");

      // Thêm weather vào cơ sở dữ liệu
      const database = client.db("test");
      const weatherCollection = database.collection("weathers");

      // Kiểm tra xem có weather nào trùng name và country không
      const existingWeather = await weatherCollection.findOne({
        name: this.name,
        country: this.country,
      });

      if (existingWeather) {
        // Nếu đã tồn tại weather, cập nhật lại thông tin
        const result = await weatherCollection.findOneAndUpdate(
          { name: this.name, country: this.country },
          {
            $set: {
              date: this.date,
              condition: this.condition,
              icon_url: this.icon_url,
              avgtemp_c: this.avgtemp_c,
              maxwind_mph: this.maxwind_mph,
              avghumidity: this.avghumidity,
            },
          },
          { returnOriginal: false }
        );
        console.log(`Weather updated`);
      } else {
        // Nếu chưa có, thêm mới weather vào cơ sở dữ liệu
        const result = await weatherCollection.insertOne({
          date: this.date,
          name: this.name,
          country: this.country,
          condition: this.condition,
          icon_url: this.icon_url,
          avgtemp_c: this.avgtemp_c,
          maxwind_mph: this.maxwind_mph,
          avghumidity: this.avghumidity,
        });
        console.log(`Weather inserted with id: ${result.insertedId}`);
      }
    } catch (error) {
      console.error("Error inserting weather:", error);
    } finally {
      // Đóng kết nối
      await client.close();
      console.log("Connection to MongoDB closed");
    }
  }
}

module.exports = Weather;

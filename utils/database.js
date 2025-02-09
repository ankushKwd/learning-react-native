import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

// const database = await SQLite.openDatabaseAsync("places.db");
// const db = await SQLite.openDatabaseAsync("places.db");

export async function init() {
  try {
    console.log("Database opened successfully");

    // Create table if not exists
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );`
    );

    // // Insert some data
    // const insertData = async () => {
    //   await db.runAsync("INSERT INTO users (name, age) VALUES (?, ?);", [
    //     "John Doe",
    //     28,
    //   ]);
    //   console.log("Data inserted successfully");
    // };

    // // Query data
    // const fetchData = async () => {
    //   try {
    //     const results = await db.getAllAsync("SELECT * FROM users;");
    //     console.log(results);
    //     const rows = results;
    //     console.log("Data fetched:", rows);
    //     setData(rows);
    //   } catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // };

    // // Insert data and then fetch data
    // // await insertData();
    // // await fetchData();

    // // Close the database when done
    // return () => {
    //   db.close()
    //     .then(() => {
    //       console.log("Database closed successfully");
    //     })
    //     .catch((error) => {
    //       console.error("Error closing database: ", error);
    //     });
    // };
  } catch (error) {
    console.log("Error opening database: ", error);
  }
}

export const openDb = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("places.db");
    console.log("Database opened successfully");

    // Create table if not exists
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );`
    );

    // Insert some data
    // const insertData = async () => {
    //   await db.runAsync("INSERT INTO users (name, age) VALUES (?, ?);", [
    //     "John Doe",
    //     28,
    //   ]);
    //   console.log("Data inserted successfully");
    // };

    // Query data
    // Insert data and then fetch data
    // await insertData();
    // await fetchData();

    // Close the database when done
    return () => {
      db.close()
        .then(() => {
          console.log("Database closed successfully");
        })
        .catch((error) => {
          console.error("Error closing database: ", error);
        });
    };
  } catch (error) {
    console.log("Error opening database: ", error);
  }
};

export async function insertPlace(place) {
  const db = await SQLite.openDatabaseAsync("places.db");

  try {
    const res = await db.runAsync(
      "INSERT INTO places (title, imageUri, address, lat,lng) VALUES (?, ?, ?, ?, ?);",
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    return () => {
      db.close()
        .then(() => {
          console.log("Database closed successfully");
        })
        .catch((error) => {
          console.error("Error closing database: ", error);
        });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchPlaces() {
  try {
    const db = await SQLite.openDatabaseAsync("places.db");
    const results = await db.getAllAsync("SELECT * FROM places;");
    const places = [];
    for (const dp of results) {
      places.push(
        new Place(
          dp.title,
          dp.imageUri,
          { address: dp.address, lat: dp.lat, lng: dp.lng },
          dp.id
        )
      );
    }
    return places;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

export async function fetchPlaceDetails(id) {
  try {
    const db = await SQLite.openDatabaseAsync("places.db");
    const results = await db.getAllAsync("SELECT * FROM places WHERE id = ?;", [
      id,
    ]);

    return results[0];
  } catch (error) {
    console.log(error);
  }
}

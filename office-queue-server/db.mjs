// Database

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db", (error) => {
  if (error) throw error;
});

export default db;


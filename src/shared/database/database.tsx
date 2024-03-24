import mysql, { PoolOptions } from 'mysql2'

const dbConfig: PoolOptions = {
  connectionLimit : 20,
  host: "topkolesa.com.ua",
  port: 3306,
  user: "u_topkolesa_vn",
  database: "shina5e",
  password: "m9gAkCp8Zog4"
};

let db = mysql.createPool(dbConfig);
                                 // process asynchronous requests in the meantime.

export default db;
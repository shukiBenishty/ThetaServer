import mysql from 'promise-mysql';

const config = {
  host: "sql125.main-hosting.eu",
  user: "u143806214_elamy",
  password: "Day1!2111",
  database: "u143806214_elamy"
};

class Database {

  constructor() {
  }


  async getEmployees() {

    try {

      const conn = await mysql.createConnection(config);

      const sqlQuery = 'SELECT * from u143806214_elamy.elamayan_class';

      var startTime = process.hrtime();
      const result = await conn.query(sqlQuery);
      const elapsed = process.hrtime(startTime)[1] / 1000000;  // divide by a million to get nano to milli);
      console.log(result.length);
      console.log(`MySQL Executed for ${elapsed.toFixed(3)} ms`);
      await conn.end();

    } catch ( err ) {

      console.error(err);
    }
    return [{}];
  }
};

export default Database;

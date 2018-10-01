import Client from 'mariasql'
import MariaSQL from 'mariasql-promise'
//import mysql from 'mysql';
import mysql from 'promise-mysql';

const config = {
  host: "sql125.main-hosting.eu",
  user: "u143806214_elamy",
  password: "Day1!2111",
  database: "u143806214_elamy"
};

// const config = {
//   server: 'sql125.main-hosting.eu',
//   database: 'u143806214_elamy',
//   user: 'u143806214_elamy',
//   password: 'Day1!2111',
//   // insecureAuth : false,
//   // schema: 'u143806214_elamy'
//   // options: {
//   //   encrypt: false
//   // }
// };

const localConfig = {
  host: 'localhost',
  database: 'snaps',
  schema: 'snaps',
  user: 'gql',
  password: 'dfnc94^*',
  insecureAuth : true
};

const CNT = 10;
const sqlQuery = 'SELECT * from u143806214_elamy.elamayan_class';

// MariaDB
( async() => {

  let totalTime = 0;

  try {

    for(let i = 0; i < CNT; i++) {
      var startTime = process.hrtime();

      const db = new MariaSQL()
      await db.connect(config);
      const rows = await db.query(sqlQuery);
      //console.log(`Got ${rows.length} rows`);
      const elapsed = process.hrtime(startTime)[1] / 1000000;  // divide by a million to get nano to milli);
      console.log(`MariaDb Executed for ${elapsed.toFixed(3)} ms`);
      totalTime += elapsed;
      await db.dispose();
    }

  } catch ( err ) {
    console.log(err);
    process.exit(-1);
  }

  console.log(`MariaDB average execution time: ${totalTime/CNT}`);

})();


//MySQL
(async() => {

  let totalTime = 0;

  try {

    for(let i =0; i < CNT; i++) {

      const conn = await mysql.createConnection(config);

      var startTime = process.hrtime();

      const result = await conn.query(sqlQuery);
      //console.log(result.length);
      const elapsed = process.hrtime(startTime)[1] / 1000000;  // divide by a million to get nano to milli);
      console.log(`MySQL Executed for ${elapsed.toFixed(3)} ms`);
      totalTime += elapsed;
      await conn.end();
    }

  } catch( err ) {
    console.log(err);
    process.exit(-1);
  }

  console.log(`MySQL average execution time: ${totalTime/CNT}`);

})();

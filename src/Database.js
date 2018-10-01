import mysql from 'promise-mysql';
import moment from 'moment';

import Employee from './Employee';
import Group from './Group';
import Schedule from './Schedule';

const config = {
  host: "sql125.main-hosting.eu",
  user: "u143806214_elamy",
  password: "Day1!2111",
  database: "u143806214_elamy"
};

const localConfig = {
  host: 'localhost',
  user: 'thetaWeb',
  password: 'Day1!2$$',
  database: 'theta'
  //insecureAuth : true
};

class Database {

  constructor() {
  }

  async getGroup(groupSymbol) {

    try {

        const conn = await mysql.createConnection(config);

        const sqlQuery = `SELECT * FROM elamayan_class WHERE groupSymbol = ${groupSymbol}`;
        const result = await conn.query(sqlQuery);
        await conn.end();

        return new Group(groupSymbol, result[0].description);

    } catch( err ) {

      console.err(err);
    }
  }

  async getGroups() {

      try {

        const conn = await mysql.createConnection(config);

        const sqlQuery = 'SELECT * from u143806214_elamy.elamayan_class';

        // var startTime = process.hrtime();
        const result = await conn.query(sqlQuery);
        // const elapsed = process.hrtime(startTime)[1] / 1000000;  // divide by a million to get nano to milli);
        // console.log(result.length);
        // console.log(`MySQL Executed for ${elapsed.toFixed(3)} ms`);
        await conn.end();

        const groups = [];
        for(let i = 0; i < 2; i++) {
          const group = new Group(result[i].groupSymbol, result[i].description);
          groups.push(group);
        }

        return groups;

    } catch (err) {
      console.error(err);
    }
  }

  async getEmployees() {

    try {

      const conn = await mysql.createConnection(localConfig);

      const sqlQuery = `SELECT e.id, e.name, e.phone, g.roleName FROM theta.employees as e
                        join groupRoles as g
                        on e.id = g.employeeId`;
      //var startTime = process.hrtime();
      const result = await conn.query(sqlQuery);
      //const elapsed = process.hrtime(startTime)[1] / 1000000;  // divide by a million to get nano to milli);
      // console.log(result.length);
      // console.log(`MySQL Executed for ${elapsed.toFixed(3)} ms`);
      await conn.end();

      const employees = [];
      result.map( packet => {
        const employee = new Employee(packet.id, packet.name, packet.phone, packet.roleName);
        employees.push(employee);
      })

      return employees;

    } catch ( err ) {

      console.error(err);
    }
  }

  async getSchedules(groupSymbol) {
    const schedules = [];

    try {
      const conn = await mysql.createConnection(localConfig);
      const sqlQuery = `select d.display as display, e.name, e.id, g.roleName from schedules as s
                        join days as d
                        on s.dayId = d.dayOfYear and s.year = d.year
                        join employees as e
                        on s.employeeId = e.id
                        join groupRoles as g
                        on e.id = g.employeeId
                        where s.groupSymbol = ${groupSymbol}`;
      const result = await conn.query(sqlQuery);
      //console.log(result);
      await conn.end();

      const group = await this.getGroup(groupSymbol);

      result.map( packet => {
        const employee = new Employee(packet.id, packet.name, packet.roleName);
        const date = moment(packet.display, 'DD-MM-YYYY');
        const schedule = new Schedule(groupSymbol, employee, date, group);
        schedules.push( schedule );
      });



    } catch( err ) {
      console.error(err);
    }

    return schedules;
  }
};

export default Database;

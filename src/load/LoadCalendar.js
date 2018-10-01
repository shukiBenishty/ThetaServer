import moment from 'moment';
import mysql from 'promise-mysql';
import rp from 'request-promise';

const config = {
  host: "localhost",
  user: "thetaWeb",
  password: "Day1!2$$",
  database: "theta"
};

let dt = moment('01-01-2018', 'DD-MM-YYYY');

(async() => {

  try {
    const conn = await mysql.createConnection(config);
    let _month = 0; // force initial request
    let holidays = [];

    while( dt.isBefore( moment('01-01-2020', 'DD-MM-YYYY') ) ) {

      const year = dt.year();
      const month = dt.month() + 1;
      if( month != _month ) {
          _month = month;

          // See https://www.hebcal.com/home/195/jewish-calendar-rest-api
          // for documentation
          const _url = `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=onf&year=${year}&month=${_month}`;
          const _res = await rp(_url);
          const __res = JSON.parse(_res);
          holidays = __res.items;

      };

      const date = dt.date();
      const dayOfYear = dt.dayOfYear();
      const dayOfWeek = dt.day();

      const dayToComapre = dt.format('YYYY-MM-DD');

      let found = holidays.find( holiday => {
        //console.log(`Holiday date: ${holiday.date} Date: ${dayToComapre}`);
        return holiday.date === dayToComapre;
      });
      let isHoliday = found ? true : false;
      let holidayName = found ? `N'${found.hebrew}'` : 'NULL';

      // See https://www.hebcal.com/home/219/hebrew-date-converter-rest-api
      // for docuentation
      const url = `https://www.hebcal.com/converter/?cfg=json&gy=${year}&gm=${month}&gd=${date}&g2h=1`;
      const res = await rp(url);
      const _res = JSON.parse(res);
      const hebrewDisplay = _res.hebrew;
      const display = dt.format('DD-MM-YYYY');

      console.log(`Year: ${year} DOY: ${dayOfYear} Display: ${display} Heb: ${hebrewDisplay}`);

      const sqlQuery = `insert into days (year, dayOfYear, dayOfWeek, display, display_he, isHoliday, holidayName) values(${year}, '${dayOfYear}', ${dayOfWeek}, '${display}', '${hebrewDisplay}', ${isHoliday}, ${holidayName})`;
      //console.log(sqlQuery);
      await conn.query(sqlQuery);

      dt.add(1, 'days'); // moment is mutable
    }

    await conn.end();

  } catch( err ) {
    console.log(err);
    // console.log(`Error`);
  }



})();

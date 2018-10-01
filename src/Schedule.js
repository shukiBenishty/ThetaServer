import casual from 'casual';

class Schedule {

  constructor(groupSymbol, employee, date, group) {
    this.id = casual.uuid;
    this.groupSymbol;
    this.employee = employee;
    this.date = date;
    this.group = group;
  }

};

export default Schedule;

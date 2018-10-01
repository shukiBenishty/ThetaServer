import casual from 'casual';

class Group {

  constructor(symbol, name) {
    this.id = casual.uuid;
    this.symbol = symbol;
    this.name = name;
  }

};

export default Group;

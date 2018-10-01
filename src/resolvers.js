import { ApolloError, PubSub } from 'apollo-server';
import Database from './Database';

export let resolvers = {
  Query: {

    employees: (_) => {

      const db = new Database();
      db.getEmployees();
      return [{}];
    }
  },
  Employee: {
    name: (_) => {
      return 'Oleg Kleiman';
    }
  }
}

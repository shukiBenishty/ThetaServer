import { ApolloError, PubSub } from 'apollo-server';
import Database from './Database';

export let resolvers = {
  Query: {

    employees: (_) => {

      const db = new Database();
      return db.getEmployees();
    },
    schedules: (_, {groupSymbol}) => {
      const db = new Database();
      return db.getSchedules(groupSymbol);
    }
  }
  // Employee: {
  //   name: (_) => {
  //     return 'Oleg Kleiman';
  //   }
  // }
}

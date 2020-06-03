import { register, login, logout } from '../entities/userResolver';
import { getHistory, createHistory } from '../entities/historyResolver';
import {
  checkInfo,
  checkCondition,
  diagnoseSymptoms,
  chatFinalResponse,
  checkTriage,
  searchObservations,
} from '../entities/symptomsResolver';

const resolvers = {
  Query: {
    checkInfo,
    checkCondition,
    getHistory,
    searchObservations,
  },
  Mutation: {
    diagnoseSymptoms,
    chatFinalResponse,
    checkTriage,

    register,
    login,
    logout,

    createHistory,
  },
};

export default resolvers;

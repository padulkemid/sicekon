import {
  checkInfo,
  checkCondition,
  diagnoseSymptoms,
  chatFinalResponse,
  checkTriage,
} from '../entities/symptomsResolver';

import { register, login, logout } from '../entities/userResolver';

const resolvers = {
  Query: {
    checkInfo,
    checkCondition,
  },
  Mutation: {
    diagnoseSymptoms,
    chatFinalResponse,
    checkTriage,

    register,
    login,
    logout,
  },
};

export default resolvers;

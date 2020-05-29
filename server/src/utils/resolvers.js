import {
  checkInfo,
  checkCondition,
  diagnoseSymptoms,
  chatFinalResponse,
  checkTriage,
} from '../entities/symptomsResolver';

const resolvers = {
  Query: {
    checkInfo,
    checkCondition,
  },
  Mutation: {
    diagnoseSymptoms,
    chatFinalResponse,
    checkTriage,
  },
};

export default resolvers;

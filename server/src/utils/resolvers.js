import {
  checkInfo,
  diagnoseSymptoms,
  chatFinalResponse,
} from '../entities/symptomsResolver';

const resolvers = {
  Query: {
    checkInfo,
  },
  Mutation: {
    diagnoseSymptoms,
    chatFinalResponse,
  },
};

export default resolvers;

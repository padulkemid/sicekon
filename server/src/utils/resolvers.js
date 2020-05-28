import { checkInfo, diagnoseSymptoms } from '../entities/symptomsResolver';

const resolvers = {
  Query: {
    checkInfo,
  },
  Mutation: {
    diagnoseSymptoms,
  },
};

export default resolvers;

import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { typeDefs, resolvers } from '../utils';
import { checkInfo, checkCondition, getHistory } from './query';
import {
  diagnoseSymptoms,
  checkTriage,
  chatFinalResponse,
  register,
  login,
  logout,
  createHistory,
} from './mutation';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { query, mutate } = createTestClient(server);

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

describe('GraphQL and Mongoose Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/jest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    const conn = mongoose.createConnection('mongodb://localhost:27017/jest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await conn.dropDatabase();
  });

  it('should connect to mongodb and apollo server', async () => {
    const res = await query({
      query: checkInfo,
    });
    const { updated_at, symptoms_count, conditions_count } = res.data.checkInfo;

    expect(res.errors).toBeUndefined();
    expect(res.data).not.toBeUndefined();
    expect(res.data).toBeDefined();
    expect(updated_at).toBeDefined();
    expect(updated_at).toEqual(expect.any(String));
    expect(symptoms_count).toBeDefined();
    expect(symptoms_count).toEqual(expect.any(Number));
    expect(conditions_count).toBeDefined();
    expect(conditions_count).toEqual(expect.any(Number));
  });

  describe('GraphQL query tests', () => {
    describe('API Queries', () => {
      it('should check for given condition', async () => {
        const res = await query({
          query: checkCondition,
          variables: {
            id: 'c_563',
          },
        });
        const {
          id,
          name,
          common_name,
          categories,
          prevalence,
          acuteness,
          severity,
          extras,
        } = res.data.checkCondition;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(id).toBeDefined();
        expect(id).toMatch(/c_563/);
        expect(id).toEqual(expect.any(String));
        expect(name).toBeDefined();
        expect(name).toMatch(/Bacterial meningitis/);
        expect(name).toEqual(expect.any(String));
        expect(common_name).toBeDefined();
        expect(common_name).toMatch(/Bacterial meningitis/);
        expect(common_name).toEqual(expect.any(String));
        expect(categories).toBeDefined();
        expect(categories).toEqual(expect.arrayContaining(['Infectiology']));
        expect(prevalence).toBeDefined();
        expect(prevalence).toEqual(expect.any(String));
        expect(prevalence).toMatch(/very_rare/);
        expect(acuteness).toBeDefined();
        expect(acuteness).toEqual(expect.any(String));
        expect(acuteness).toMatch(/acute/);
        expect(severity).toBeDefined();
        expect(severity).toEqual(expect.any(String));
        expect(severity).toMatch(/severe/);
        expect(extras).toBeDefined();
        expect(extras).toEqual(
          expect.objectContaining({
            hint: expect.any(String),
          })
        );
      });
    });

    describe('API Mutation', () => {
      const mockDiagnosis = {
        sex: 'male',
        age: 20,
        evidence: [
          {
            id: 's_1193',
            choice_id: 'present',
            initial: true,
          },
          {
            id: 's_488',
            choice_id: 'present',
          },
          {
            id: 's_418',
            choice_id: 'present',
          },
          {
            id: 's_98',
            choice_id: 'present',
          },
        ],
        extras: {
          disable_groups: true,
        },
      };

      it('should output diagnosis based on symptoms given', async () => {
        const res = await mutate({
          mutation: diagnoseSymptoms,
          variables: {
            diagnosis: mockDiagnosis,
          },
        });
        const { question, conditions, should_stop } = res.data.diagnoseSymptoms;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(question).toBeDefined();
        expect(question).toEqual(
          expect.objectContaining({
            type: expect.any(String),
          })
        );
        expect(conditions).toBeDefined();
        expect(conditions).toContainObject({
          id: expect.any(String),
          name: expect.any(String),
        });
        expect(should_stop).toBeDefined();
        expect(should_stop).not.toBeTruthy();
        expect(should_stop).toBeFalsy();
      });

      it('should output triage based on given diagnosis', async () => {
        const res = await mutate({
          mutation: checkTriage,
          variables: {
            diagnosis: mockDiagnosis,
          },
        });
        const { triage_level, serious } = res.data.checkTriage;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(triage_level).toBeDefined();
        expect(triage_level).toMatch(/emergency/);
        expect(triage_level).toEqual(expect.any(String));
        expect(serious).toBeDefined();
        expect(serious).toContainObject({ id: 's_1193' });
        expect(serious).toContainObject({ name: 'Stiff neck' });
        expect(serious).toContainObject({ common_name: expect.any(String) });
      });

      it('should output chat final condition reply based on user complaint', async () => {
        const text =
          'I have a severe headache and nausea, also my stomach is hurt';

        const res = await mutate({
          mutation: chatFinalResponse,
          variables: {
            complaint: {
              text,
            },
          },
        });
        const { mentions, obvious } = res.data.chatFinalResponse;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(obvious).toBeFalsy();
        expect(obvious).not.toBeTruthy();
        expect(mentions).toContainObject({ id: 's_156' });
        expect(mentions).toContainObject({ name: expect.any(String) });
      });
    });
  });

  describe('Mongoose [mongoDb] data test', () => {
    describe('User', () => {
      it('should create new User based on given mock data', async () => {
        const input = {
          sex: 'male',
          age: 20,
          username: 'test',
          email: 'test@testing.com',
          password: '123456',
        };

        const res = await mutate({
          mutation: register,
          variables: {
            input,
          },
        });

        const { result } = res.data.register;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(result).toBeDefined();
        expect(result).toEqual(expect.any(String));
      });

      it('should login after test user is been created', async () => {
        const input = {
          email: 'test@testing.com',
          password: '123456',
        };

        const res = await mutate({
          mutation: login,
          variables: {
            input,
          },
        });

        const { username, email, sex, age, result } = res.data.login;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(username).toBeDefined();
        expect(username).toMatch(/test/);
        expect(username).toEqual(expect.any(String));
        expect(email).toBeDefined();
        expect(email).toMatch(/test@testing.com/);
        expect(email).toEqual(expect.any(String));
        expect(sex).toBeDefined();
        expect(sex).toMatch(/male/);
        expect(sex).toEqual(expect.any(String));
        expect(age).toBeDefined();
        expect(age).toEqual(expect.any(Number));
        expect(result).toBeDefined();
        expect(result).toEqual(expect.any(String));
      });

      it('should create conditions history based on user symptom diagnosis', async () => {
        const input = {
          conditions: ['c_671', 'c_55'],
          date: '2020-05-30T17:43:18.793Z',
        };

        const res = await mutate({
          mutation: createHistory,
          variables: {
            input,
          },
        });

        const { email, conditions, date } = res.data.createHistory;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(email).toBeDefined();
        expect(email).toMatch(/test@testing.com/);
        expect(email).toEqual(expect.any(String));
        expect(conditions).toBeDefined();
        expect(conditions).toEqual(expect.arrayContaining(['c_671', 'c_55']));
        expect(date).toBeDefined();
        expect(date).toEqual(expect.any(String));
      });

      it('it should get users history conditions', async () => {
        const res = await query({
          query: getHistory,
        });

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(res.data.getHistory).toBeDefined();
        expect(res.data.getHistory).toContainObject({
          email: 'test@testing.com',
        });
        expect(res.data.getHistory).toContainObject({
          date: expect.any(String),
        });
      });

      it('should logout the user after logged in', async () => {
        const res = await mutate({
          mutation: logout,
        });

        const { result } = res.data.logout;

        expect(res.errors).toBeUndefined();
        expect(res.data).not.toBeUndefined();
        expect(res.data).toBeDefined();
        expect(result).toBeDefined();
        expect(result).toEqual(expect.any(String));
      });
    });
  });
});

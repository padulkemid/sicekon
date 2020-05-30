import jwt from 'jsonwebtoken';
import redis from '../utils/redis';
import { History } from '../models';

// Verify email with token
let parentEmailCheck = null;
const verify = async () => {
  const token = await redis.get('token');
  if (!token) {
    parentEmailCheck = null;
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (_, decoded) => {
      parentEmailCheck = decoded.email;
    });
  }
};

// Queries

const getHistory = async () => {
  await verify();
  const userHistory = await History.find({ email: parentEmailCheck });
  return userHistory;
};

export { getHistory };

// Mutations

const createHistory = async (_, { input }) => {
  await verify();
  const { conditions, date } = input;
  let returnedHistory = null;

  if (!parentEmailCheck) {
    returnedHistory = null;
  } else {
    const struct = {
      email: parentEmailCheck,
      conditions,
      date,
    };

    const newHistory = new History(struct);
    await newHistory.save();
    returnedHistory = newHistory;
  }

  return returnedHistory;
};

export { createHistory };

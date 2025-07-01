import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

const createSessionTokens = (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email is already exists');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const sessionData = createSessionTokens(newUser._id);
  const newSession = await SessionsCollection.create(sessionData);

  return { user: newUser, session: newSession };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
  const isMatch = await bcrypt.compare(payload.password, user.password);

  if (!isMatch) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const sessionData = createSessionTokens(user._id);
  const session = await SessionsCollection.create(sessionData);

  return { user, session };
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    throw createHttpError(404, 'User not found during session refresh');
  }

  const newSessionData = createSessionTokens(session.userId);
  const updatedSession = await SessionsCollection.create(newSessionData);

  return { user, session: updatedSession };
};

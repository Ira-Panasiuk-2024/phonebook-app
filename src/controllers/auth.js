import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from '../services/auth.js';

import { THIRTY_DAYS } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
};

export const registerUserController = async (req, res) => {
  const { user, session } = await registerUser(req.body);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      accessToken: session.accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const loginUserController = async (req, res) => {
  const { user, session } = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { user, session } = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

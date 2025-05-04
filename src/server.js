import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '9393'));

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    origin: [
      'http://localhost:5173',
      'https://phonebook-five-gules.vercel.app',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return server;
};

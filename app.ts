import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net';
import { join } from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import {
  errorHandler,
  logger,
  notFoundHandler,
} from './handlers/generic';
import {
  EvaluationFormHandler,
  EvaluationHandler,
  EvaluationLogHandler,
  GroupHandler,
  GroupScoringHandler,
  GroupScoringLogHandler,
  LoginHandler,
  LogoutHandler,
  QuestionHandler,
  StudentHandler,
  UserHandler,
  UserScoringHandler,
  UserScoringLogHandler,
} from './handlers/v1';
import { jwtGuard } from './middlewares';

const centaurus = express();
const logDir = join(__dirname, 'logs');

centaurus.disable('x-powered-by');
centaurus.set('etag', 'strong');
centaurus.set('port', process.env.PORT || 8000);

centaurus.use(logger(logDir));
centaurus.use(bodyParser.json({ 'strict': true }));
centaurus.use(cors({
  allowedHeaders: ['x-total-count', 'Content-Type', 'Authorization'],
  exposedHeaders: ['x-total-count', 'Content-Type', 'Authorization'],
}));

// Main Handler
centaurus.use('/api/user', UserHandler);
centaurus.use('/api/group', jwtGuard, GroupHandler);
centaurus.use('/api/student', jwtGuard, StudentHandler);
centaurus.use('/api/user_scoring', jwtGuard, UserScoringHandler);
centaurus.use('/api/group_scoring', jwtGuard, GroupScoringHandler);
centaurus.use('/api/eval', jwtGuard, EvaluationHandler);
centaurus.use('/api/question', jwtGuard, QuestionHandler);
centaurus.use('/api/user_scoring_log', jwtGuard, UserScoringLogHandler);
centaurus.use('/api/group_scoring_log', jwtGuard, GroupScoringLogHandler);
centaurus.use('/api/eval_log', jwtGuard, EvaluationLogHandler);
centaurus.use('/api', EvaluationFormHandler);
centaurus.use('/api/login', LoginHandler);
centaurus.use('/api/logout', LogoutHandler);

// Catch 404 error
centaurus.use(notFoundHandler);

// Handle Error
centaurus.use(errorHandler);

createConnection().then(result => {
  const server = http.createServer(centaurus).listen(centaurus.get('port'), () => {
    server.setTimeout(300000);
    const now = new Date().toISOString();
    const listeningPort = (server.address() as AddressInfo).port;
    console.log(`Server started in [${now}], listening to port ${listeningPort}.`);
    console.log('Database Status:', result.isConnected ? 'Connected' : 'Disconnected');
  });
}).catch(err => {
  console.error('Error in DB:', err);
  process.exit();
});

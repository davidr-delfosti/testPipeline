import { appRouter } from './router';
import { ENV } from './common/config';
import { logger } from './common/helpers';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import { dataSource } from './data-source';

(async () => {
  let isDbConnected = false;
  try {
    const dataSources = await dataSource.initialize();
    if (dataSources) {
      logger.info('Database connected');
      isDbConnected = true;
    } else logger.warn('Database not connected');
  } catch (error) {
    logger.error(error);
    logger.warn('Error connecting to database');
  }

  const app = express();

  // add middlewares
  app.set('port', ENV.PORT);
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(cookieParser());

  // register express routes from defined application routes
  app.use('/', appRouter.routes);

  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (_: Request, res: Response) => {
    res.status(200).json({
      message:
        'This is the API for Auth Module application, please use the endpoints.',
      is_db_connected: isDbConnected,
    });
  });

  // start express server
  app.listen(app.get('port'), () => {
    logger.info(`Server ready at http://localhost:${app.get('port')}`);
  });

  logger.info('Express server has started');
})();

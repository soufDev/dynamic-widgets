import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from './core/logger/app-logger';
import config from './core/config/config.dev';
import widget from './routes/widget.route';
import connectToDb from './db/connect';

const port = config.serverPort;
logger.stream = {
  write(message, encoding) {
    logger.info(message);
    logger.info(encoding);
  },
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

app.use('/api/v1', widget);

// Index route
app.get('/', (req, res) => {
  res.send({ message: 'hello wold!' });
});

app.listen(port, () => {
  logger.info('server started - ', port);
});

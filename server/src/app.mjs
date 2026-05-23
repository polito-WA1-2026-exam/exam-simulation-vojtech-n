import express  from 'express';
import cors     from 'cors';
import session from 'express-session';
import passport from './config/passport.mjs';
import routes from './routes/index.routes.mjs';
import { errorHandler } from './middlewares/error-handling.mjs';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: 'app',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());   // ← passport ready
app.use(passport.session()); 

app.use('/api/v1', routes);

app.use(errorHandler)

export default app;
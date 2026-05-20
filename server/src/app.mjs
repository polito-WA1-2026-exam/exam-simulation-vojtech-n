// src/app.mjs
import express  from 'express';
import cors     from 'cors';
// import session  from 'express-session';
// import passport from 'passport';
// import '../config/passport.config.mjs';
import routes   from './routes/index.routes.mjs';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/api/v1', routes);

export default app;
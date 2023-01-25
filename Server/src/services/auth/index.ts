import type { Application } from "express";
import type { MongoClient } from "mongodb";
import User from "../../models/User";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import localStrategy from "./localStrategy";


const setupAuthSvc = (app: Application, dbClient: Promise<MongoClient>) => {

  // Express Session
  /* @ts-ignore */
  app.use(
    /* @ts-ignore */
    session({
      secret: "devsecret",
      resave: false,
      saveUninitialized: false,
      /* @ts-ignore */
      store: MongoStore.create({
        clientPromise: dbClient,
        dbName: "bearmax",
        collectionName: "sessions"
      })
    })
  );

  // Setup passport
  /* @ts-ignore */
  app.use(passport.initialize());
  /* @ts-ignore */
  app.use(passport.session());

  /* @ts-ignore */
  passport.serializeUser((user, done) => {
    /* @ts-ignore */
    done(null, user._id);
  });

  /* @ts-ignore */
  passport.deserializeUser((id: string, done) => {
    User.findById(id, null, (err, user) => {
      done(err, user);
    });
  });

  passport.use(localStrategy);

};

export default setupAuthSvc;

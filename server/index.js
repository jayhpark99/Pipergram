require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const authorizationMiddleWare = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/auth/sign-up', uploadsMiddleware, (req, res, next) => {
  const { fullName, username, password } = req.body;
  let profilePicture = '/images/image-1640645696721.jpeg';
  if (req.file) {
    profilePicture = '/images/' + req.file.filename;
  }
  if (!profilePicture || !fullName || !username || !password) {
    throw new ClientError(400, 'profilePicture, fullName, username, and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("fullName", "username", "hashedPassword", "profilePicture")
      values ($1 ,$2, $3, $4)
      returning *
      `;
      const params = [fullName, username, hashedPassword, profilePicture];
      return db.query(sql, params);
    })
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
  select "userId",
         "hashedPassword"
    from "users"
   where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
  select "posts".*,
  "users"."profilePicture",
  "users"."username"
  from "posts"
  join "users" using ("userId")
  order by "photoId" desc
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/posts', authorizationMiddleWare, uploadsMiddleware, (req, res, next) => {
  const { location, caption } = req.body;
  const userId = req.user.userId;
  const postPicture = '/images/' + req.file.filename;
  if (!userId || !postPicture || !location || !caption) {
    throw new ClientError(400, 'postPicture, location, and caption are required fields');
  }
  const sql = `
      insert into "posts" ("location", "caption", "postPicture", "userId")
      values ($1 ,$2, $3, $4)
      returning *
      `;
  const params = [location, caption, postPicture, userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/likes', (req, res, next) => {
  const { userId, photoId } = req.body;
  const params = [userId, photoId];
  const sql = `
  insert into "likes" ("userId", "photoId")
  values($1, $2)
  returning *`;
  db.query(sql, params)
    .catch(err => next(err));
});

app.delete('/api/likes', (req, res, next) => {
  const { userId, photoId } = req.body;
  const params = [userId, photoId];
  const sql = `
  delete from "likes"
  where "userId" = $1
  and "photoId" = $2`;
  db.query(sql, params)
    .catch(err => next(err));
});

// app.put('/api/likes', (req, res, next) => {
//   const { userId } = req.body;
//   const params = [userId];
//   const sql = `
//   select "photoId"
//   from "likes"
//   where "userId" = $1`;
//   db.query(sql, params)
//     .then(result => {
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

const Koa = require('koa');
const User = require('./models/user');

const app = new Koa();

app.use(async (ctx) => {
  const users = await User.findAll();

  // eslint-disable-next-line no-console
  console.log(users);

  ctx.body = 'Hello World';
});

const serverPort = process.env.PORT || 3000;
app.listen(serverPort);

// eslint-disable-next-line no-console
console.log(`Start listening on http://0.0.0.0:${serverPort}`);

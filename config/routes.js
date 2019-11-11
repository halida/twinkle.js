import KoaRouter from 'koa-router'
import { User } from '../models/user.js'

export const router = new KoaRouter()

router.get('/users', async (ctx, next) => {
  const users = await User.findAll()
  console.log(users)
  ctx.body = 'Hello World'
})

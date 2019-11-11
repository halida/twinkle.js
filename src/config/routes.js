import KoaRouter from 'koa-router'

export const router = new KoaRouter()

router.get('/health', async (ctx, next) => {
  ctx.body = 'Twinkle is OK'
})

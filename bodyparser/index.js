const Koa=require('koa');
const app=new Koa();
const bodyparser=require('koa-bodyparser');
app.use(require('koa-static')(__dirname+'/'));
app.use(bodyparser());
const router=require('koa-router')();
router.post('/add',async (ctx,next)=>{
    console.log('body', ctx.request.body);
    ctx.body=ctx.request.body
});
app.use(router.routes());
app.listen(3000);
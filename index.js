/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-03 14:23:05
 * @LastEditTime: 2019-10-04 12:14:47
 * @LastEditors: Please set LastEditors
 */
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const parser = require('koa-bodyparser');

const koa = new Koa();
const router = new Router();
koa.use(cors());
koa.use(parser());
const userData = [];

router.get('/:date', async (ctx, next) => {
    let date = ctx.params.date;
    ctx.response.status = 200;
    ctx.response.type = 'json';
    let event = [];
    for(let i = 0; i<userData.length; i++) {
        if(userData[i].id === date) {
            event.push(userData[i].form);
        }
    }
    ctx.response.body = event;
    await next();
});
router.post('/', async (ctx, next) => {
    userData.push(ctx.request.body);
    ctx.response.status = 200;
    await next();
});
koa.use(router.routes());

koa.listen(3000);

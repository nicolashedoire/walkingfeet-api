const { verifyJwt } = require('../services/jwt');

const controlAccess = () => async(ctx, next) => {
  let jwt = ctx.query.jwt ? ctx.query.jwt : null;
  if (jwt !== null) {
    const profile = await verifyJwt(jwt);

    // attach userId to this context
    ctx.userId = profile.user.id;
    return await next();
  }
};

const controlToken = async (ctx, token) => {
  if (token !== null) {
    const profile = await verifyJwt(token);
    // attach userId to this context
    ctx.userId = profile.user.id;
    return ctx;
  }
};

module.exports = {
  controlAccess,
  controlToken
};

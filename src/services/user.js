const validationError = require('../errors/validationErrors');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const save = async (user) => {
    if(!user.name) throw new validationError ('Nome é um atributo obrigatório');
    if(!user.mail) throw new validationError ('Email é um atributo obrigatório');
    if(!user.passwd) throw new validationError ('Senha é um atributo obrigatório');

    const userDb = await findAll({ mail: user.mail });
    if(userDb && userDb.length > 0) throw new validationError('Já existe um usuário com esse email');

    return app.db('users').insert(user, '*');
  };

  return { findAll, save };
};
const validationError = require('../errors/validationErrors');

module.exports = (app) => {
  const save = (account) => {
    if (!account.name) throw new validationError ('Nome é um atributo obrigatório');

    return app.db('accounts').insert(account, '*');
  };

  const findAll = () => {
    return app.db('accounts');
  };

  const find = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const update = (id, account) => {
    return app.db('accounts').where({id}).update(account, '*');
  };

  const remove = (id) => {
    return app.db('accounts').where({id}).del();
  };

  return { save, findAll, find, update, remove };
};
const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

test('Deve listar todos os usuários', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir usuário com sucesso', () => {
  return request(app).post('/users')
    .send({ name: 'Leandro Tartarini', mail: `${Date.now()}@mail.com`, passwd: '280693' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Leandro Tartarini');
      expect(res.body).not.toHaveProperty('passwd');
    });
});

test('Deve armazenar senha criptografada', async () => {
  const res = await request(app).post('/users')
    .send({ name: 'Leandro Tartarini', mail: mail, passwd: '280693' });
  expect(res.status).toBe(201);

  const { id } = res.body;
  const userDB = await app.services.user.findOne({id});
  expect(userDB.passwd).not.toBeUndefined();
  expect(userDB.passwd).not.toBe('280693');
});

test('Não deve inserir usuário sem nome', () => {
  return request(app).post('/users')
    .send({ mail: 'leandro@mail.com', passwd: '280693' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

//COM ASYNC AWAIT
test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users')
    .send({ name: 'Leandro Tartarini', passwd: '20693' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

//PASSANDO DONE COMO PARAMETRO
test('Não deve inserir usuário sem senha', (done) => {
  request(app).post('/users')
    .send({ name: 'Leandro Tartarini', mail: 'leandro@mail.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done();
    });
});

test('Não deve inserir usuário com email existente', () => {
  return request(app).post('/users')
    .send({ name: 'Leandro Tartarini', mail: mail, passwd: '280693' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse email');
    });
});
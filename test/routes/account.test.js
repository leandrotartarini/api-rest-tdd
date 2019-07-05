const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'User Account', mail: `${Date.now()}@mail.com`, passwd: '123456' });
  user = { ...res[0] };
});

// test('Deve inserir uma conta com sucesso', () => {
//   return request(app).post(MAIN_ROUTE)
//     .send({ name: 'Acc #1', user_id: user.id })
//     .then((result) => {
//       expect(result.status).toBe(201);
//       expect(result.body.name).toBe('Acc #1');
//     });
// });

//com async await
test('Deve inserir uma conta com sucesso', async () => {
  const result = await request(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #2', user_id: user.id })
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #2');
});

// test('Não deve inserir uma conta sem nome', () => {
//   return request(app).post(MAIN_ROUTE)
//     .send({ user_id: user.id })
//     .then((result) => {
//       expect(result.status).toBe(400);
//       expect(result.body.error).toBe('Nome é um atributo obrigatório');
//     });
// });

test('Não deve inserir uma conta sem nome', async () => {
  const result = await request(app).post(MAIN_ROUTE)
    .send({ user_id: user.id })
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatório');
})

// test('Deve listar todas as contas', () => {
//   return app.db('accounts')
//     .insert({ name: 'Acc list', user_id: user.id })
//     .then(() => request(app).get(MAIN_ROUTE))
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
// });

test.skip('Não deve inserir uma conta de nome duplicado para o mesmo usuário', () => {});

test('Deve listar todas as contas', async () => {
  await app.db('accounts').insert({ name: 'Acc list', user_id: user.id });
  const result = await request(app).get(MAIN_ROUTE);
  expect(result.status).toBe(200);
  expect(result.body.length).toBeGreaterThan(0);
});

test.skip('Deve listar apenas as contas do usuário', () => {});

// test('Deve retornar uma conta por Id', () => {
//   return app.db('accounts')
//     .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
//     .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.name).toBe('Acc By Id');
//       expect(res.body.user_id).toBe(user.id);
//     });
// });

test('Deve retornar uma conta por Id', async () => {
  const acc = await app.db('accounts').insert({ name: 'Acc By Id', user_id: user.id }, ['id']);
  const result = await request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)
    expect(result.status).toBe(200);
    expect(result.body.name).toBe('Acc By Id');
    expect(result.body.user_id).toBe(user.id);
});

test.skip('Não deve retornar uma conta de outro usuário', () => {});

// test('Deve alterar uma conta', () => {
//   return app.db('accounts')
//     .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
//     .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
//       .send({ name: 'Acc Updated' }))
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body.name).toBe('Acc Updated');
//     });
// });

test('Deve alterar uma conta', async () => {
  const acc = await app.db('accounts').insert({ name: 'Acc To Update', user_id: user.id }, ['id']);
  const result = await request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).send({ name: 'Acc Updated' });
  expect(result.status).toBe(200);
  expect(result.body.name).toBe('Acc Updated');
});

test.skip('Não deve alterar uma conta de outro usuário', () => {});

// test('Deve remover uma conta', () => {
//   return app.db('accounts')
//     .insert({ name: 'Acc to remove', user_id: user.id }, ['id'])
//     .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
//     .then((res) => {
//       expect(res.status).toBe(204);
//     });
// });

test('Deve remover uma conta', async () => {
  const acc = await app.db('accounts').insert({ name: 'Acc to remove', user_id: user.id }, ['id']);
  const result = await request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`).send({ name: 'Acc to remove' });
  expect(result.status).toBe(204);
});

test.skip('Não deve remover uma conta de outro usuário', () => {});
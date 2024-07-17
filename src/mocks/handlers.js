/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { items } from '../items';

const handlers = [
  rest.get('/api/items', (req, res, ctx) => res(ctx.json(items))),
  rest.get('/api/auth/current-user', (req, res, ctx) => console.log(res(ctx.json({ access: 'associate', username: 'Tester' })))),
];

export default handlers;

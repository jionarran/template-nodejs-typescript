import request from 'supertest';
import mongoose from 'mongoose';
import app from '@src/server';

beforeAll(() => {
  global.testRequest = request(app);
});

afterAll(async () => {
  await mongoose.connection.close();
});

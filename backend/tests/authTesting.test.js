const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const { connectDB, disconnectDB } = require('../db');

jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');

const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

const email = `${formattedDate}@example.com`;
const googleEmail = `${formattedDate}198789987987987987@example.com`;

describe('AUTH LOGIN AND REGISTER', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await request(app).delete(`/auth/delete-user/${email}`).expect(200);
    await request(app).delete(`/auth/delete-user/${googleEmail}`).expect(200);
    await disconnectDB();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'password123',
      email,
    });

    expect(response.status).toBe(201);
    const _id = response.body._id;
    expect(response.body).toEqual({
      username: 'testuser',
      email,
      _id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });
  });

  it('should return 409 if email already in use', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'password123',
      email,
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe('{"error":"Email already in use"}');
  });

  it('should login a user successfully', async () => {
    const response = await request(app).post('/auth/login').send({
      password: 'password123',
      email,
    });

    expect(response.status).toBe(201);
    const _id = response.body._id;
    expect(response.body).toEqual({
      username: 'testuser',
      email,
      _id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });
  });

  it('should login error invalid creds', async () => {
    const response = await request(app).post('/auth/login').send({
      password: 'passwords123',
      email,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid Credential' });
  });

  it('should register a google user successfully', async () => {
    const response = await request(app).post('/auth/google-login').send({
      username: 'testuser',
      email: googleEmail,
      googleId: formattedDate,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });

    expect(response.status).toBe(200);
    const _id = response.body._id;
    const googleId = response.body.googleId;
    expect(response.body).toEqual({
      username: 'testuser',
      email: googleEmail,
      googleId: googleId,
      _id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });
  });

  it('should login a google user successfully', async () => {
    const response = await request(app).post('/auth/google-login').send({
      username: 'testuser',
      email: googleEmail,
      googleId: formattedDate,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });

    expect(response.status).toBe(200);
    const _id = response.body._id;
    const googleId = response.body.googleId;
    expect(response.body).toEqual({
      username: 'testuser',
      email: googleEmail,
      googleId: googleId,
      _id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });
  });
});

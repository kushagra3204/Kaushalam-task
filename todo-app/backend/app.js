import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: 'https://kaushalam-todo-task.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import user from './routes/user.js';
import todo from './routes/todo.js';

app.use('/user', user);
app.use('/todo', todo);

export default app;
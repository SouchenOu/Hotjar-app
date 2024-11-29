import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import surveysRoute from './Routes/Surveys.js';
import authRoute from './Routes/Auth.js';
import userRoute from './Routes/User.js';
import siteRoute from './Routes/Site.js';
import responseRoute from './Routes/Response.js';
import templateRoute from './Routes/Templates.js';
import notificationRoute from './Routes/Notification.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const allowedOrigins = [
'https://websiteeehotjarrr.netlify.app',
'https://solo-portfolioo.netlify.app',
];

const corsOptions = {
origin: (origin, callback) => {
if (allowedOrigins.includes(origin) || !origin) {
callback(null, true);
} else {
callback(new Error('Not allowed by CORS'));
}
},
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization'],
credentials: true,
preflightContinue: false,
};
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

const connect = async () => {
try {
await mongoose.connect(process.env.MONGO);
console.log('Connected to MongoDB');
} catch (error) {
console.error('Error connecting to MongoDB', error);
}
};

app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/survey', surveysRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/site', siteRoute);
app.use('/response', responseRoute);
app.use('/templates', templateRoute);
app.use('/notification', notificationRoute);

app.options('*', cors(corsOptions)); // Automatically handle all OPTIONS requests

const server = http.createServer(app);
const io = new Server(server, {
cors: {
origin: '*',
methods: ['GET', 'POST'],
allowedHeaders: ['my-custom-header'],
credentials: true,
},
});

const userSockets = {};

io.on('connection', (socket) => {
socket.on('registerUser', (userId) => {
userSockets[userId] = socket.id;
});

socket.on('sendInvite', (inviteData) => {
const { recipientId, message } = inviteData;
const recipientSocketId = userSockets[recipientId];

if (recipientSocketId) {
io.to(recipientSocketId).emit('inviteNotification', recipientId, message);
} else {
console.log(`User ${recipientId} is not connected.`);
}
});

socket.on('disconnect', () => {});
});

server.listen(8000, () => {
connect();
console.log(
'Connected to backend and Socket.IO server listening on port 8000'
);
});

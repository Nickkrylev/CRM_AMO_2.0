const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const taskRoutes = require('./task.routes');
const clientRoutes = require('./client.routes'); // <-- Підключаємо client.routes

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/clients', clientRoutes); // <-- Реєструємо маршрут клієнтів

module.exports = router;

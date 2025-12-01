// backend/routes/reservations.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// POST /reservations → Crear reserva
router.post('/', async (req, res) => {
  try {
    const { serviceId, userId, providerId, date, time, notes } = req.body;
    if (!serviceId || !userId || !providerId || !date || !time) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Construir DateTime ISO
    const startAt = new Date(`${date}T${time}`);

    // Validar que el servicio exista
    const service = await prisma.service.findUnique({ where: { id: Number(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    const reservation = await prisma.reservation.create({
      data: {
        serviceId: Number(serviceId),
        userId: Number(userId),
        providerId: Number(providerId),
        startAt,
        notes: notes || null,
        status: 'PENDING',
      },
      include: {
        service: true,
        User: true,
      }
    });

    return res.status(201).json(reservation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// GET /reservations/provider/:providerId → Reservas de un proveedor
router.get('/provider/:providerId', async (req, res) => {
  try {
    const providerId = Number(req.params.providerId);
    const reservations = await prisma.reservation.findMany({
      where: { providerId },
      include: { Service: true, User: true },
      orderBy: { startAt: 'desc' }
    });
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// GET /reservations/user/:userId → Reservas de un cliente
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { Service: true, User: true },
      orderBy: { startAt: 'desc' }
    });
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

export default router;

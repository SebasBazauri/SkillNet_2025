// backend/index.js
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import reservationsRouter from "./routes/reservations.js";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ======================================================
// 🔹 Configuración de multer
// ======================================================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// ======================================================
// 🚀 SERVICIOS
// ======================================================

app.post("/services", upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, description, price, providerId } = req.body;
    if (!providerId) return res.status(400).json({ error: "Falta providerId" });

    const service = await prisma.service.create({
      data: {
        title,
        subtitle,
        description,
        price: Number(price),
        providerId: Number(providerId),
        img: req.file ? req.file.filename : null,
      },
    });

    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear servicio" });
  }
});

app.get("/services", async (req, res) => {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
  res.json(services);
});

app.get("/services/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener servicio" });
  }
});

app.put("/services/:id", upload.single("image"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, subtitle, description, price } = req.body;

    const data = {
      title,
      subtitle,
      description,
      price: Number(price),
    };

    if (req.file) data.img = req.file.filename;

    const updated = await prisma.service.update({ where: { id }, data });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
});

app.delete("/services/:id", async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Servicio eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar" });
  }
});

app.get("/provider/services/:providerId", async (req, res) => {
  const { providerId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where: { providerId: Number(providerId) },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.service.count({ where: { providerId: Number(providerId) } }),
    ]);

    res.json({
      services,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

// ======================================================
// 🚀 RESERVAS (Rutas separadas)
// ======================================================
app.use("/reservations", reservationsRouter);

// ======================================================
// 🚀 AUTENTICACIÓN
// ======================================================
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ error: "Faltan campos obligatorios" });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    res.json({
      message: "Usuario creado correctamente",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no existe" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({
      message: "Login exitoso",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en login" });
  }
});

// ======================================================
// 🔹 Inicio del servidor
// ======================================================
app.get("/", (req, res) => res.send("API funcionando correctamente"));

app.listen(3001, () => console.log("API corriendo en http://localhost:3001"));

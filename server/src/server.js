import express from "express";
import dotenv from "dotenv";
import { loggerMiddleware } from "./loggers/config/morgan.logger.js";
import { log } from "./loggers/index.js";
import { connectDB } from "./db/index.js"; // Removed Redis here
import session from "express-session";
import { kms } from "./middlewares/kms.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { hashHandler } from "./middlewares/hash.middleware.js";
import { readHash } from "./utils/encryption/hashGen.js";
import { corsOptionsDelegate } from "./utils/cors.js";
import cors from "cors";
import LorRoutes from './routes/LorRoutes.js';
import OfferRoutes from './routes/offerRoutes.js';
import LopRoutes from "./routes/LopRoute.js";
import requestRoutes from "./routes/ReqRoutes.js";
import LocRoutes from "./routes/LocRoute.js";
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

//* DATABASE CONNECTION
const { conn: DB } = await connectDB();

//* CORS ALLOWED ORIGINS
export const allowlist = ["http://localhost:3000"];
// Use CORS middleware to allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Allow the frontend origin (Vite is using this port)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

//* MIDDLEWARES
app.use(loggerMiddleware);
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(kms); //! Key Management Service
app.use(hashHandler); //! Hashing Middleware

const SECRET = process.env.SESSION_SECRET || (await readHash()); //! Session Secret

app.use(cors(corsOptionsDelegate));

//* SESSION (No Redis store now, using default in-memory session store)
app.use(
  session({
    secret: SECRET,
    name: "session.sid",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

//* ROUTES
app.get("/", (req, res) => {
  res.send("hello");
});

// Add LOR routes
app.use("/api/lor", LorRoutes);
app.use("/api/offer", OfferRoutes);
app.use("/api/lop", LopRoutes);
app.use('/api', requestRoutes);
app.use("/api/loc", LocRoutes);
app.use('/api/admin', authRoutes);

//* SERVER LISTEN
app.listen(process.env.PORT || 5500, () => {
  console.log(`server is running on port ${process.env.PORT || 5500}`);
});

//* ERROR HANDLING
process.on("uncaughtException", err => {
  // log.error(Logged Error: ${err});
  DB.disconnect(); // Remove Redis quit logic
  // log.error("MongoDB Disconnected");
});

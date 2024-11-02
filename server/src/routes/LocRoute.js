import express from 'express';
import { createLoc } from '../controllers/LocContoller.js';

const router = express.Router()

// form submission
router.post("/create", createLoc)


export default router;
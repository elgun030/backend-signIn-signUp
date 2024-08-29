import express from 'express';
import { signIn, signUp, logOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.post('/logout', logOut);

export default router;

import express from 'express';
const router = express.Router();
import { userSignUp, userLogin, resetPassword, newPassword } from '../controllers/userDetails.js';
import userAuth from '../middleware/userAuth.js';

router.post('/sign-up', userSignUp);
router.post('/login', userLogin);
router.post('/reset-password', resetPassword);
router.post('/new-password', userAuth, newPassword);

export default router;

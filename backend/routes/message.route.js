import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { errorMiddleware } from '../middlewares/error.middleware.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const router=express.Router()

router.post('/send/:receiverId',isAuthenticated,errorMiddleware,sendMessage)
router.get('/get-messages/:otherParticipantId',isAuthenticated,errorMiddleware,getMessages)

export default router;
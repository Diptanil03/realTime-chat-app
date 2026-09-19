import express from 'express'
import { getProfile, login, logout, otherUsers, register } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'
import { errorMiddleware } from '../middlewares/error.middleware.js'

const router=express.Router()

router.post('/login',login)
router.post('/register',register)
router.get('/getprofile',isAuthenticated,errorMiddleware,getProfile)
router.get('/logout',isAuthenticated,logout)
router.get('/otherusers',isAuthenticated,errorMiddleware,otherUsers)

export default router;
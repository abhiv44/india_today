import express from "express"
import { isAuth, isAllowed } from '../config/middleware'

import User from '../components/user'
import News from '../components/news'

const router = express.Router();

// User Login
router.post('/login', User.login)
// User profile 
router.post('/profile', isAuth, User.profile)
// Admin user can add other user with unique userName
router.post('/add-user', isAuth, isAllowed('admin'), User.addUser)
// User can update his/her profile
router.post('/update-profile', isAuth, User.updateProfile)
// Admin user can create/add news
router.post('/create-news', isAuth, isAllowed('admin'), News.createNews)
// Admin can update the existing news
router.post('/update-news', isAuth, isAllowed('admin'), News.updateNews)
// All news feed avaialable 
router.post('/feed', News.newsFeed)
// All authors available
router.post('/authors', News.authors)
// All the subtype of news like Tech, AI, UI etc.
router.post('/news-sub-types', News.newsSubTypes)

export default router
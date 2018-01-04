import express from 'express';
import post from './post';
import member from './member';
import auth from './auth';
const router = express.Router();

router.use('/post', post);
router.use('/member', member);
router.use('/auth', auth);


export default router;
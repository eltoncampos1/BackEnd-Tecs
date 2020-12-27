import express from 'express';

import { createuser, getUser, updateUser, deleteUser, findUser } from '../controllers/users.js'

const router = express.Router();


router.get('/', getUser );
router.post('/', createuser);
router.get('/:id', findUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
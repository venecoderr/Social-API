import { Router } from 'express';
import { getUsers, getUserbyId, createUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js'

export const userRoutes = Router()
//Gets all user and creates users
userRoutes.route('/').get(getUsers).post(createUser)

//Gets and deletes users by ID
userRoutes.route('/:id').get(getUserbyId).delete(deleteUser)

//Adds friends to users
userRoutes.route('/:id/friends').post(addFriend);

//Removes friends from users
userRoutes.route('/:id/friends/:friendId').delete(removeFriend);

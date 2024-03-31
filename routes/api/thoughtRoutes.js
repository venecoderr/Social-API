import { Router } from 'express';
import { getThoughts, getThoughtbyId, createThought, editThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js'

export const thoughtRoutes = Router()
//Gets all Thought and creates Thoughts
thoughtRoutes.route('/').get(getThoughts).post(createThought)

//Gets and deletes Thoughts by ID
thoughtRoutes.route('/:id').get(getThoughtbyId).put(editThought).delete(deleteThought)

//Adds Reactions to Thoughts
thoughtRoutes.route('/:id/reactions').post(addReaction);

//Removes Reactions from Thoughts
thoughtRoutes.route('/:id/reactions/:reactionId').delete(removeReaction);

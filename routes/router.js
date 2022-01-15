import Router from 'express';
import NoteController from '../services/NoteController.js';
import validation from '../middlewares/validationMiddleware.js';
import noteSchema from '../validations/noteValidation.js';

const router = new Router();
// Получение всех заметок
router.get('/notes', NoteController.getAll);
// Получение одной заметки
router.get('/notes/:id', NoteController.getOne);
// Созданиие заметки
router.post('/notes', validation(noteSchema), NoteController.create);
// Удаление заметки
router.delete('/notes/:id', NoteController.delete);
// Изменение заметки по id
router.patch('/notes/:id', validation(noteSchema), NoteController.update);
// Получение статистики
router.get('/notes/stats', NoteController.getStats);

export default router;

import Router from 'express';
import express from 'express';
import NoteController from '../services/NoteController.js';
const jsonParser = express.json();

const router = new Router();
// Получение всех заметок
router.get('/notes', NoteController.getAll);
// Получение одной заметки
router.get('/notes/:id', NoteController.getOne);
// Созданиие заметки
router.post('/notes', jsonParser, NoteController.create);
// Удаление заметки
router.delete('/notes/:id', NoteController.delete);
// Изменение заметки по id
router.patch('/notes/:id', jsonParser, NoteController.update);
// Получение статистики
router.get('/notes/stats', NoteController.getStats);

export default router;

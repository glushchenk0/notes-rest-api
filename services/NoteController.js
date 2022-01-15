import NoteService from './NoteService.js';

class NoteController {
    async getAll(req, res) {
        try {
            const notes = await NoteService.getAll();
            res.send(notes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async getOne(req, res) {
        try {
            if (!req.params.id) {
                throw new Error('не указан ID');
            }
            const note = await NoteService.getOne(req.params.id);
            return res.send(note);
        } catch (e) {
            res.status(404).json(e.message);
        }
    }

    async create(req, res) {
        try {
            if (!req.body) throw new Error('не указано тело заметки');
            const note = await NoteService.create(req.body);
            res.send(note);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            if (!req.params.id) throw new Error('не указан ID');
            const note = await NoteService.delete(req.params.id);
            res.send(note);
        } catch (e) {
            res.status(404).json(e.message);
        }
    }

    async update(req, res) {
        try {
            if (!req.params.id) {
                throw new Error('не указан ID');
            }
            if (!req.body) return res.sendStatus(400);
            const updatedPost = await NoteService.update(
                req.params.id,
                req.body
            );
            return res.send(updatedPost);
        } catch (e) {
            res.status(404).json(e.message);
        }
    }

    async getStats(req, res) {
        try {
            const noteStats = await NoteService.getStats();
            res.send(noteStats);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new NoteController();

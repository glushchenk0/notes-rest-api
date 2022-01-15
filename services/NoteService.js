import express from 'express';
import Repo from '../repositories/Repo.js';

class NoteService {
    getAll() {
        const content = Repo.read();
        const notes = JSON.parse(content);
        return notes;
    }

    getOne(id) {
        let note = null;
        const content = Repo.read();
        const notes = JSON.parse(content);
        if (id > notes.length || id < 0) {
            throw new Error('указан не верный ID');
        }
        for (var i = 0; i < notes.length; i++) {
            console.log(notes[i].id);
            if (notes[i].id == id) {
                note = notes[i];
                break;
            } else if (id.toString() === 'stats') {
                note = this.getStats();
            }
        }

        return note;
    }

    create(note) {
        const noteName = note.name;
        const noteUpdate = note.updated;
        const noteCategory = note.category;
        const noteContent = note.content;
        const noteDateslist = note.dateslist;
        const noteArchive = note.archived;
        let data = Repo.read();
        let notes = JSON.parse(data);
        const newID = Math.max.apply(
            Math,
            notes.map(function (o) {
                return o.id;
            })
        );
        let newNote = {
            id: newID + 1,
            name: noteName,
            updated: noteUpdate,
            category: noteCategory,
            content: noteContent,
            dateslist: noteDateslist,
            archived: noteArchive,
        };
        notes.push(newNote);
        data = JSON.stringify(notes);
        Repo.write(data);
        return newNote;
    }

    delete(id) {
        let data = Repo.read();
        let notes = JSON.parse(data);
        let index = -1;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            const note = notes.splice(index, 1);
            data = JSON.stringify(notes);
            Repo.write(data);
            return note;
        } else {
            throw new Error('указан не верный ID');
        }
    }

    update(id, note) {
        const noteName = note.name;
        const noteUpdate = note.updated;
        const noteCategory = note.category;
        const noteContent = note.content;
        const noteDateslist = note.dateslist;
        const noteArchive = note.archived;
        const content = Repo.read();
        const notes = JSON.parse(content);
        let oldNote;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                oldNote = notes[i];
                break;
            } else {
                note = 'указан не верный ID';
            }
        }
        if (oldNote) {
            oldNote.name = noteName;
            oldNote.updated = noteUpdate;
            oldNote.category = noteCategory;
            oldNote.content = noteContent;
            oldNote.dateslist = noteDateslist;
            oldNote.archived = noteArchive;
            const data = JSON.stringify(notes);
            Repo.write(data);
        }
        return oldNote;
    }

    getStats() {
        const content = Repo.read();
        const notes = JSON.parse(content);
        const allCategories = new Set();
        const stats = [];
        for (const note of notes) {
            allCategories.add(note.category);
        }
        for (const category of allCategories) {
            const active = notes
                .filter((note) => note.category === category)
                .filter((note) => note.archived === false).length;
            const archived = notes
                .filter((note) => note.category === category)
                .filter((note) => note.archived === true).length;
            const info = {
                active: active,
                archived: archived,
            };
            const categoryStats = {
                category: category,
                stats: info,
            };
            stats.push(categoryStats);
        }
        return stats;
    }
}

export default new NoteService();

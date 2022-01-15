import fs from 'fs';
const filePath = './data/notes.json';

class Repo {
    read() {
        const result = fs.readFileSync(filePath, 'utf8');
        return result;
    }
    write(data) {
        fs.writeFileSync(filePath, data);
    }
}

export default new Repo();

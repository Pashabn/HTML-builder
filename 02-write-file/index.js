const fs = require('fs');
const path = require('path');

const write = (file) => {
    process.stdout.write('Hi buddy, enter your text here:\n');
    process.on('SIGINT', () => {
        process.stdout.write('Bye .... We are so upset')
        process.exit()
    })
    process.stdin.on('data', (data) => {
        if (data.toString().trim().toLowerCase() === 'exit') {
            process.stdout.write('Bye .... We are so upset')
            process.exit()
        }
        fs.appendFile(file, data.toString(), 'utf-8', (err) => {
            if (err) throw err;
        })
    })
}
write(path.join(__dirname, 'text.txt'))
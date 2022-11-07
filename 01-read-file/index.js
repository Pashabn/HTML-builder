const fs = require('fs');
const path = require('path')

const read = (file) => {
    const rs = fs.createReadStream(file, {encoding: 'utf-8'})
    let data = '';
    rs.on('data', (chunk) => {
        data += chunk
    });
    rs.on('end', () => {
        process.stdout.write(data)
    })
}
read(path.join(__dirname, 'text.txt'))
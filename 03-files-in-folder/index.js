const fs = require('fs');
const path = require('path');

const check = async (_path) => {

    const files = await fs.promises.readdir(_path)

    for (const file of files) {
        fs.stat(path.join(_path, file), (err, s) => {
            s.isFile() && console.log(
                path.basename(file, path.extname(file))
                + ' - ' +
                path.extname(file).slice(1)
                + ' - ' +
                s.size
                + 'b'
            )
        });
    }
}

check(path.join(__dirname, 'secret-folder'))

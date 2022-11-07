const fs = require('fs');
const path = require('path');

const check = (_path) => {
    fs.readdir(_path, (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                        fs.stat(path.join(_path, file), (err, s) => {
                            // s.isFile() && console.log(`${file.replace('.', ' - ')} - ${s.size}b`)
                            s.isFile() && console.log(
                                path.basename(file).split('.').slice(0, -1).join('.')
                                + ' - ' +
                                path.extname(file).slice(1)
                                + ' - ' +
                                s.size
                                + 'b'
                            )
                        });
                    }
                )
            }
        }
    )
}

check(path.join(__dirname, 'secret-folder'))

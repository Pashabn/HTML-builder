const fs = require('fs');
const path = require('path');

const createBundle = (styles, bundle) => {
    fs.readdir(bundle, (err, files) => {
        files.forEach(file => {
            if (path.extname(file).slice(1) === 'css') {
                fs.unlink(path.join(bundle, 'bundle.css'), (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    })
    fs.readdir(styles, (err, files) => {
        files.forEach(file => {
            if (path.extname(file).slice(1) === 'css') {
                const rs = fs.createReadStream(`${path.join(styles, file)}`, {encoding: 'utf-8'})
                rs.on('data', (chunk) => {
                    fs.appendFile(path.join(bundle, 'bundle.css'), chunk, 'utf-8', (err) => {
                        if (err) throw err;
                    })
                });
            }
        })
    })
}

createBundle(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist'))
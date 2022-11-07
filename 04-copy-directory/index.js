const fs = require('fs');
const path = require('path');

const copyDir = async (_path) => {

    await fs.promises.rm(path.join(_path, 'files-copy'), {recursive: true, force: true})

    await fs.promises.mkdir(path.join(_path, 'files-copy'), {recursive: true})

    await fs.promises.readdir(path.join(_path, 'files-copy'), (err, files) => {
        files.forEach(async file => {
            await fs.promises.unlink(path.join(_path, 'files-copy', file))
        })
    })
    await fs.promises.readdir(path.join(_path, 'files'), (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(async file => {
                await fs.promises.copyFile(path.join(_path, 'files', file), path.join(_path, 'files-copy', file), (err) => {
                    console.log(err)
                })
            })
        }
    })


}

copyDir(path.resolve(__dirname))
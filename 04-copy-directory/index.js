const fs = require('fs');
const path = require('path');

const copyDir = async (_path) => {

    await fs.promises.rm(path.join(_path, 'files-copy'), {recursive: true, force: true})

    await fs.promises.mkdir(path.join(_path, 'files-copy'), {recursive: true})

    const files = await fs.promises.readdir(path.join(_path, 'files'))

    for (const file of files) {
        await fs.promises.copyFile(path.join(_path, 'files', file), path.join(_path, 'files-copy', file))
    }
}

copyDir(path.resolve(__dirname))
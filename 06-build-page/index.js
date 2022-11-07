const fs = require('fs');
const path = require('path');

const buildPage = (_path) => {

    const clear = async () => {
        await fs.promises.rm(path.join(_path, 'project-dist'), {recursive: true, force: true})
    }

    const copyStyle = async () => {
        await fs.readdir(path.join(_path, 'styles'), (err, files) => {
            files.forEach(file => {
                if (path.extname(file).slice(1) === 'css') {
                    const rs = fs.createReadStream(path.join(_path, 'styles', file), {encoding: 'utf-8'})
                    rs.on('data', (chunk) => {
                        fs.appendFile(path.join(_path, 'project-dist', 'style.css'), chunk, 'utf-8', (err) => {
                            if (err) throw err;
                        })
                    });
                }
            })
        })
    }

    const copyDir = async (_path) => {

        await fs.promises.mkdir(path.join(_path, 'project-dist', 'assets'), {recursive: true})

        fs.readdir(path.join(_path, 'assets'), (err, files) => {
            files.forEach(file => {
                fs.mkdir(path.join(_path, 'project-dist', 'assets', file), {recursive: true}, (err) => {
                    if (err) throw err;
                    fs.readdir(path.join(_path, 'assets', file), (err, files) => {
                        files.forEach(fileI => {
                            fs.copyFile(path.join(_path, 'assets', file, fileI), path.join(_path, 'project-dist', 'assets', file, fileI), (err) => {
                                if (err) throw err;
                            })
                        })
                    })
                })
            })
        })
    }

    const readTemp = async (_path) => {

        let template = await fs.promises.readFile(path.join(_path, 'template.html'), {encoding: 'utf-8'})

        let files = await fs.promises.readdir(path.join(_path, 'components'))

        for (const file of files) {
            let name = path.basename(file, path.extname(file))
            const fileBody = await fs.promises.readFile(path.join(_path, 'components', file), {encoding: 'utf-8'})
            template = template.replace(`{{${name}}}`, fileBody)
        }

        await fs.promises.writeFile(path.join(_path, 'project-dist', 'index.html'), template, 'utf-8')
    }

    clear()
        .then(() => copyDir(_path))
        .then(() => copyStyle(_path))
        .then(() => readTemp(_path))


}
buildPage(path.resolve(__dirname))
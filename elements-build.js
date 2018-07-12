const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
    const files = [
        './dist/apps/embed/runtime.js',
        './dist/apps/embed/polyfills.js',
        './dist/apps/embed/scripts.js',
        './dist/apps/embed/main.js'
    ];

    await fs.ensureDir('site')
    await concat(files, 'site/embed.js')
    await fs.copyFile('./dist/apps/embed/styles.css', 'site/styles.css')
    await fs.copy('./dist/apps/embed/assets/', 'site/assets/')

})()

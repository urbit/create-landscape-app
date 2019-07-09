const prompt = require('prompt')
const replace = require('replace-in-file')
const fs = require('fs')

prompt.colors = false

prompt.get([{
    name: 'appName',
    required: true,
    description: "What's the name of your application? No spaces, please."
    }, {
    name: 'pier',
    required: true,
    description: "Where is your Urbit pier located? For example, '/Users/dev/zod/home'"
    }], function (err, result) {
        fs.rename('urbit/app/smol.hoon', 'urbit/app/' + result.appName + '.hoon')
        const appNameOptions = {
            files: ['gulpfile.js', 'tile/tile.js', 'urbit/app/smol.hoon'],
            from: "%APPNAME%",
            to: result.appName
            }
        const urbitPierOptions = {
            files: '.urbitrc',
            from: "%URBITPIER%",
            to: result.pier
        }
        replace(appNameOptions)
        replace(urbitPierOptions)
    }
)
const prompt = require('prompt')
const replace = require('replace-in-file')
const fs = require('fs')

prompt.colors = false

prompt.get([{
    name: 'appName',
    required: true,
    description: "What's the name of your application? Lowercase and no spaces, please."
    }, {
    name: 'pier',
    required: true,
    description: "Where is your Urbit pier located? For example, '/Users/dev/zod/home'"
    }], function (err, result) {
        fs.renameSync('urbit/app/smol.hoon', 'urbit/app/' + result.appName + '.hoon')
        let capitalisedAppName = result.appName.charAt(0).toUpperCase() + result.appName.slice(1)
        const appNameOptions = {
            files: ['gulpfile.js', 'urbit/app/' + result.appName + '.hoon'],
            from: /%APPNAME%/g,
            to: result.appName
            }
        const appNamewithCapitals = {
            files: 'tile/tile.js',
            from: [/%APPNAME%/g, /%APPNAME%/g, /%APPNAME%/g, /%APPNAME%/g, /%APPNAME%/g]
            to: [capitalisedAppName, result.appName, capitalisedAppName, result.appName, capitalisedAppName]
        }
        const urbitPierOptions = {
            files: '.urbitrc',
            from: "%URBITPIER%",
            to: result.pier
        }
        replace(appNameOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
        replace(appNamewithCapitals).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
        replace(urbitPierOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
        console.log("All done! Happy hacking.")
    }
)
const prompt = require('prompt')
const replace = require('replace-in-file')
const fs = require('fs')
const mv = require('mv')

// Making the text input a bit legible.

prompt.colors = false
prompt.message = ""

// The text input takes a "result" object and passes it to one of two functions to do the logistics.

prompt.get([{
    name: 'appName',
    required: true,
    description: "What's the name of your application? Lowercase and no spaces, please."
    }, 
    {
    name: 'type',
    required: true,
    description: "Is your app just a tile, or a full application? (tile/full)",
    message: "Please specify 'tile' or 'full'.",
    conform: function(value) {
        if ((value == "tile") || (value == "full")) return true
        return false
        }
    },
    {
    name: 'pier',
    required: true,
    description: "Where is your Urbit pier located? For example, '/Users/dev/zod/home'"
    }], function (err, result) {
        if (result.type == "tile") setupTile(result)
        else if (result.type == "full") setupFull(result)
    }
)

// Delete the 'full' app folder and rename the tile-only files.

const setupTile = function (result) {
    fs.rmdirSync('full')
    fs.renameSync('urbit/app/smol.hoon', 'urbit/app/' + result.appName + '.hoon')
    let capitalisedAppName = result.appName.charAt(0).toUpperCase() + result.appName.slice(1)
    let appNameOptions = {
        files: ['gulpfile.js', 'urbit/app/' + result.appName + '.hoon'],
        from: /%APPNAME%/g,
        to: result.appName
    }
    let appNamewithCapitals = {
        files: 'tile/tile.js',
        from: [/%APPNAME%Tile/g, /%APPNAME%/g],
        to: [result.appName + "Tile", capitalisedAppName]
    }
    let urbitPierOptions = {
        files: '.urbitrc',
        from: "%URBITPIER%",
        to: result.pier
    }
    replace(appNameOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
    replace(appNamewithCapitals).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
    replace(urbitPierOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
    console.log("All done! Happy hacking.")
}

// Delete the tile-specific files and move the full application to root. Rename everything as necessary.

const setupFull = function (result) {
    fs.rmdirSync('tile')
    fs.rmdirSync('urbit')
    fs.unlinkSync('/gulpfile.js')
    mv('/full', '/', {mkdirp: true, clobber: true}, function(err) {
        try {
            fs.renameSync('urbit/app/smol.hoon', 'urbit/app/' + result.appName + '.hoon')
            mv('urbit/app/smol/', 'urbit/app/' + result.appName, {mkdirp: true}, function(err) {})
            mv('urbit/mar/smol/', 'urbit/mar/' + result.appName, { mkdirp: true }, function (err) {})
            fs.renameSync('urbit/lib/smol.hoon', 'urbit/lib/' + result.appName + '.hoon')
            let urbitPierOptions = {
                files: '.urbitrc',
                from: "%URBITPIER%",
                to: result.pier
            }
            replace(urbitPierOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
            let appNameOptions = {
                files: ['gulpfile.js', 'urbit/app/' + result.appName + '.hoon', 'tile/tile.js', 
                'src/js/api.js', 'src/js/subscription.js', 'src/js/components/root.js',
                'urbit/mar' + result.appName + '/action.hoon', 'urbit/mar/' + result.appName + '/update.hoon',
                'urbit/mar/' + result.appName + '/config.hoon', 'urbit/lib/' + result.appName + '.hoon'
                ],
                from: /%APPNAME%/g,
                to: result.appName
            }
            replace(appNameOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
        }
        catch(err) {
            console.error(err)
        }
    })
}
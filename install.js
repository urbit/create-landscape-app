const prompt = require('prompt')
const replace = require('replace-in-file')
const fs = require('fs')
const fse = require('fs-extra');

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
    deleteFolderRecursive('full')
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

const deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const setupFull = function (result) {
    deleteFolderRecursive('tile')
    deleteFolderRecursive('urbit')
    fs.unlinkSync('gulpfile.js')
    fse.move('full/*', '', {overwrite: true}, function(err) {
            if (err) return console.error(err)
            fs.renameSync('urbit/app/smol.hoon', 'urbit/app/' + result.appName + '.hoon')
            fse.move('urbit/app/smol/', 'urbit/app/' + result.appName, function(err) {})
            fse.move('urbit/mar/smol/', 'urbit/mar/' + result.appName, function (err) {})
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
    })
}
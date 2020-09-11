const prompt = require('prompt')
const replace = require('replace-in-file')
const fs = require('fs-extra');
var Promise = require('promise');
var path = require('path');

// Making the text input a bit legible.

prompt.colors = false
prompt.message = ""

// The text input takes a "result" object and passes it to one of two functions to do the logistics.

prompt.get([{
    name: 'appName',
    required: true,
    description: "What's the name of your application? Lowercase and no spaces, please.",
    message: "Lowercase and no spaces, please.",
    conform: function(value) {
        return /^[a-z0-9]+((\-[a-z0-9]+){1,})?$/g.test(value)
    }
    },
    {
    name: 'pier',
    required: true,
    description: "Where is your Urbit pier's desk located? For example, /Users/dev/zod/home"
    }], function (err, result) {
        setupFull(result)
    }
)

// Migrate application to root directory.

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

var promiseAllWait = function (promises) {
    // this is the same as Promise.all(), except that it will wait for all promises to fulfill before rejecting
    var all_promises = [];
    for (var i_promise = 0; i_promise < promises.length; i_promise++) {
        all_promises.push(
            promises[i_promise]
                .then(function (res) {
                    return { res: res };
                }).catch(function (err) {
                    return { err: err };
                })
        );
    }

    return Promise.all(all_promises)
        .then(function (results) {
            return new Promise(function (resolve, reject) {
                var is_failure = false;
                var i_result;
                for (i_result = 0; i_result < results.length; i_result++) {
                    if (results[i_result].err) {
                        is_failure = true;
                        break;
                    } else {
                        results[i_result] = results[i_result].res;
                    }
                }

                if (is_failure) {
                    reject(results[i_result].err);
                } else {
                    resolve(results);
                }
            });
        });
};

var movePromiser = function (from, to, records) {
    return fs.move(from, to)
        .then(function () {
            records.push({ from: from, to: to });
        });
};

var moveDir = function (from_dir, to_dir, callback) {
    return fs.readdir(from_dir)
        .then(function (children) {
            return fs.ensureDir(to_dir)
                .then(function () {
                    var move_promises = [];
                    var moved_records = [];
                    var child;
                    for (var i_child = 0; i_child < children.length; i_child++) {
                        child = children[i_child];
                        move_promises.push(movePromiser(
                            path.join(from_dir, child),
                            path.join(to_dir, child),
                            moved_records
                        ));
                    }

                    return promiseAllWait(move_promises)
                        .catch(function (err) {
                            var undo_move_promises = [];
                            for (var i_moved_record = 0; i_moved_record < moved_records.length; i_moved_record++) {
                                undo_move_promises.push(fs.move(moved_records[i_moved_record].to, moved_records[i_moved_record].from));
                            }

                            return promiseAllWait(undo_move_promises)
                                .then(function () {
                                    throw err;
                                });
                        });
                }).then(function () {
                    return fs.rmdir(from_dir);
                });
        }).then(callback);
};

const setupFull = function (result) {
    fs.access('.DS_Store', (err) => { if (!err) fs.unlinkSync('.DS_Store') })
    let deHyphenatedName = result.appName.replace(/-/g, '')
    moveDir('full', './', function() {
        fs.renameSync('urbit/app/smol.hoon', 'urbit/app/' + deHyphenatedName + '.hoon')
        fs.renameSync('urbit/app/smol/', 'urbit/app/' + deHyphenatedName)
        let urbitPierOptions = {
            files: '.urbitrc',
            from: "%URBITPIER%",
            to: result.pier
        }
        replace(urbitPierOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
        let appNameOptions = {
            files: ['webpack.dev.js', 'webpack.prod.js', 'urbit/app/' + deHyphenatedName + '.hoon',
                'src/js/api.js', 'src/js/subscription.js', 'src/js/components/root.js',
                 'urbit/app/' + deHyphenatedName + '/index.html'
            ],
            from: /%APPNAME%/g,
            to: deHyphenatedName
        }
        replace(appNameOptions).then(changedFiles => console.log(changedFiles)).catch(err => console.error(err))
    })
    console.log("All done! Happy hacking.")
}

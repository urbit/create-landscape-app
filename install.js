const path = require('path');
const fs = require('fs-extra');
const Promise = require('promise');
const prompt = require('prompt');
const replace = require('replace-in-file');
const slugify = require('slugify');

// Making the text input a bit legible.
prompt.colors = false
prompt.message = ""

// The text input takes a "result" object and passes it to one of two functions to do the logistics.
prompt.get(
  [
    {
        name: 'appName',
        required: true,
        description: "What's the name of your application?",
    },
    {
        name: 'url',
        required: true,
        description: "What URL do you access Urbit at?"
    }
  ], 
  (err, result) => setupFull(result)
)

async function setupFull(result) {
  const slug = slugify(result.appName);
  
  await moveDir('full', './')

  replaceWithLogs({
    files: '.env.local',
    from: "%URBITURL%",
    to: result.url
  })
  
  replaceWithLogs({
    files: [
      'ui/index.html',
      'desk/desk.docket-0'
    ],
    from: /%APPNAME%/g,
    to: result.appName
  })

  replaceWithLogs({
    files: [
      'ui/package.json',
      'desk/desk.docket-0'
    ],
    from: /%APPSLUG%/g,
    to: slug
  })

  fs.access('.DS_Store', (err) => { if (!err) fs.unlinkSync('.DS_Store') })
  console.log("All done! Happy hacking.")
}

async function replaceWithLogs(options) {
  replace(options)
    .then(changedFiles => console.log(changedFiles))
    .catch(err => console.error(err))
}

async function movePromiser(from, to, records) {
  await fs.move(from, to)
  records.push({ from: from, to: to });
}

async function moveDir(from_dir, to_dir) {
  const children = await fs.readdir(from_dir);
  await fs.ensureDir(to_dir);
  
  const move_promises = [];
  const moved_records = [];
  let child;
  for (let i_child = 0; i_child < children.length; i_child++) {
      child = children[i_child];
      move_promises.push(movePromiser(
          path.join(from_dir, child),
          path.join(to_dir, child),
          moved_records
      ));
  }

  try {
    await promiseAllWait(move_promises)
  } catch (err) {
    let undo_move_promises = [];
    for (let i_moved_record = 0; i_moved_record < moved_records.length; i_moved_record++) {
        undo_move_promises.push(fs.move(moved_records[i_moved_record].to, moved_records[i_moved_record].from));
    }

    await promiseAllWait(undo_move_promises)
    throw err;
  }
  
  await fs.rmdir(from_dir);
}

function promiseAllWait(promises) {
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

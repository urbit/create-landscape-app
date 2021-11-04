#!/usr/bin/env node

const path = require('path')
const fs = require('fs/promises')
const mvdir = require('mvdir')
const prompts = require('prompts')
const replace = require('replace-in-file')
const slugify = require('slugify')

main()

async function main() {
  const res = await prompts([
    {
      type: 'text',
      name: 'app',
      message: 'What should we call your application?'
    },
    {
      type: async prev => (await hasDirectory(getDir(prev))) ? 'text' : null,
      name: 'dir',
      message: async prev => `Looks like a directory already exists called "${slugify(prev, { lower: true })}". Where should your app be placed instead?`
    },
    {
      type: 'text',
      name: 'url',
      message: "What URL do you use to access Urbit?"
    }
  ])

  const name = res.app.trim()
  const slug = slugify(name, { lower: true })
  const dir = res.dir || path.join('.', slug)

  try {
    await mvdir(path.join(__dirname, 'full'), dir, { copy: true })
    await mvdir(path.join(dir, 'ui', '_gitignore'), path.join(dir, 'ui', '.gitignore'))
  
    const prefixPath = p => path.join(dir, p)
  
    await replace({
      files: prefixPath('ui/.env.local'),
      from: "%URBITURL%",
      to: res.url
    })
    
    await replace({
      files: [
        'README.md',
        'ui/index.html',
        'ui/src/app.tsx',
        'ui/src/assets/manifest.json',
        'desk/desk.docket-0'
      ].map(prefixPath),
      from: /%APPNAME%/g,
      to: name
    })
  
    await replace({
      files: [
        'README.md',
        'ui/package.json',
        'ui/vite.config.ts',
        'desk/desk.docket-0'
      ].map(prefixPath),
      from: /%APPSLUG%/g,
      to: slug
    })

    console.log(`All done, switch to the "${res.dir || slug}" directory to get started.`)
    console.log("Happy hacking!")
  } catch (err) {
    console.log(`Something went wrong when generating your app. You may need to delete the folder at ${dir}`)
  }
}

async function hasDirectory(dir) {
  try {
    await fs.access(dir)
    return true
  } catch (err) {
    return false
  }
}

function getDir(appName) {
  const slug = slugify(appName, { lower: true })
  return path.join('.', slug)
}

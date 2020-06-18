Get started building a simple application for Landscape on your [Urbit](http://urbit.org) ship with a few commands.

This tool is experimental and primarily used internally to develop front-end applications. While Tlon does not officially support this tool, you can always get general programming help for Urbit in the `~dopzod/urbit-help` chat.

## Installation

This repository is available as a template; to immediately generate your application's repository you can click [here](https://github.com/urbit/create-landscape-app/generate). Clone the generated repository, `npm install` and then run `npm start` to get started (you can also directly clone this repository, if you wish!).

In order to run your application on your ship, you will need Urbit v.0.10.0 or higher. On your Urbit ship, if you haven't already, mount your pier to Unix with `|mount %`.

## Using

Once you're up and running, your application lives in the `src` and `urbit` folders; `src` uses [React](https://reactjs.org) to render itself -- you'll want a basic foothold with it first. The `urbit` directory includes a basic boilerplate for the back-end of the application, running on your Urbit ship.

When you make changes, the `urbit` directory will update with the compiled application and, if you're running `npm run serve`, it will automatically copy itself to your Urbit ship when you save your changes (more information on that below).

### `npm start`

This runs the wizard. Give it an application name and the location of your Urbit ship's desk and it will customise the files so your new application will run on your ship.

### `npm run build`

This builds your application and copies it into your Urbit ship's desk. In your Urbit (v.0.10.0 or higher) `|commit %home` (or `%your-desk-name`) to synchronise your changes.

If this is the first time you're running your application on your Urbit ship, don't forget to `|start %yourapp`.

### `npm run serve`

Builds the application and copies it into your Urbit ship's desk, watching for changes. In your Urbit (v.0.10.0 or higher) `|commit %home` (or `%your-desk-name`) to synchronise your changes.

## FAQ

### How can I ensure my app fits Landscape design?

Landscape makes use of the [Indigo](https://urbit.github.io/indigo-react/) CSS framework. The template tile and full application both make use of it as an example for you to get going fast.

### How do I develop on a different ship?

Edit the `.urbitrc` file with the path to your new pier/desk

`module.exports = {
  URBIT_PIERS: [
    "/path/to/new-pier/desk-name",
  ]
};`

### Do I *need* Hoon?

Not anymore! You don't even need this template, if you want to create a pure front-end application. You can tell your ship to mount any path inside Clay to an endpoint, and it will mount all HTML, CSS, JS, and PNGs from that Clay path to the endpoint path:

```
:file-server &file-server-action [%serve-dir /example-path /app/example %.y]
```

This command would serve the files inside `/app/example` on your ship at `your-ship.arvo.network/example-path`, and the `%.y` declares that it's public. If you would like to require authentication -- as with the other Landscape applications -- change this to `%.n`.

Likewise, you can add any URL to your Landscape homescreen -- on your ship or not -- with this command in Dojo:

```
:launch &launch-action [%add %example [[%basic 'example' 'https://example.com/image.png' 'https://example.com'] %.y]]
```

In this case, `%example` is the name of the application within Launch, `'example'` is the title on the tile itself, `image.png` points to the icon URL for the tile, and `example.com` is where the tile will link to. `%.y` declares that yes, this tile is shown.

### What if I want to communicate with my ship / provide more functionality than what create-landscape-app provides?

In order to do anything substantial, of course, you'll want to know [Hoon](https://urbit.org/docs/tutorials/hoon/). If this is intimidating, don't panic: `create-landscape-app` is a fantastic way to start learning by leveraging your strengths. This repository is intended to be a boilerplate for rapid front-end development; it's also a gradual, incremental introduction to Hoon for web developers by allowing for rapid prototyping and experimentation with the Landscape interface.

Happy hacking!

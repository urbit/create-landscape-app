Get started building a simple application for Landscape on your [Urbit](http://urbit.org) ship with a few commands.

This tool is experimental and primarily used internally to develop front-end applications. While Tlon does not officially support this tool, you can always get general programming help for Urbit from the Urbit Community group at `~bitbet-bolbel/urbit-community` or the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev) mailing list.

## Installation

This repository is available as a template; to immediately generate your application's repository you can click [here](https://github.com/urbit/create-landscape-app/generate). Clone the generated repository, `npm install` and then run `npm start` to get started (you can also directly clone this repository, if you wish!).

In order to run your application on your ship, you will need Urbit v.0.10.0 or higher. On your Urbit ship, if you haven't already, mount your pier to Unix with `|mount %`.

## Using

Once you're up and running, your application lives in the `src` and `urbit` folders; `src` uses [React](https://reactjs.org) to render itself -- you'll want a basic foothold with it first. The `urbit` directory includes a basic boilerplate for the back-end of the application, running on your Urbit ship.

When you make changes, the `urbit` directory will update with the compiled application and, if you're running `npm run serve`, provides a dev server environment with hot reloading at `localhost:9000`.

1. Start with `npm start`

This runs the wizard. Give it an application name and the location of your Urbit ship's desk and it will customise the files so your new application will run on your ship.

2. Use `npm run serve` (or, optionally, `npm run build` to produce a minified JS blob).

3. `|commit %home` on your ship and `|start %yourappname`.

4. Access your application at `localhost:9000/~yourappname`. As you edit your source code, the page will automatically refresh.

## FAQ

### How can I ensure my app fits Landscape design?

Landscape makes use of the [indigo-react](https://urbit.github.io/indigo-react/) component library. The template makes use of it as an example for you to get going fast.

### Nothing shows up when I go to `localhost:9000`.

The build process assumes your ship is available at `localhost:80`. If it isn't (the ship's boot process will give you a port), then change it accordingly in `.urbitrc` and run `npm run serve` again.

### How do I develop on a different ship?

Edit the `.urbitrc` file with the path to your new pier/desk:

```
module.exports = {
  URBIT_PIERS: [
    "/path/to/new-pier/desk-name",
  ]
};
```

### Do I *need* Hoon to build apps for Landscape?

Not necessarily! You don't even need this template, if you want to create a pure front-end application. You can tell your ship to mount any path inside Clay to an endpoint, and it will mount all HTML, CSS, JS, and PNGs from that Clay path to the endpoint path:

```
:file-server &file-server-action [%serve-dir /example-path /app/example %.y %.n]
```

This command would serve the files inside `/app/example` on your ship at `your-ship.arvo.network/example-path`, and the first boolean, `%.y`, declares that it's public. If you would like to require authentication -- as with the other Landscape applications -- change this to `%.n`. The second, `%.n` in this case, declares that this is not part of the Landscape core suite (this affects how file-server routes).

You can also add any URL to your Landscape homescreen -- ie. any URL, regardless of it being hosted on your ship -- with this command in Dojo:

```
:launch &launch-action [%add %example [[%basic 'example' 'https://example.com/image.png' 'https://example.com'] %.y]]
```

In this case, `%example` is the name of the application within Launch, `'example'` is the title on the tile itself, `image.png` points to the icon URL for the tile, and `example.com` is where the tile will link to. `%.y` declares that yes, this tile is shown.

### How do I learn to communicate with my ship or write back-end code?

In order to do anything substantial with Gall, see [this guide](https://github.com/timlucmiptev/gall-guide) for pointers.

But if this is intimidating, don't panic: `create-landscape-app` is a fantastic way to start learning by leveraging your strengths. This repository is intended to be a boilerplate for rapid front-end development; it's also a gradual, incremental introduction to Hoon for web developers by allowing for rapid prototyping and experimentation with the Landscape interface.

Happy hacking!

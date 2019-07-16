Get started building a simple Modulo tile app for [Urbit](http://urbit.org) with a few commands.
<p align="center"><img src="https://user-images.githubusercontent.com/20846414/60992419-52be2a80-a301-11e9-9daf-ef36d38725b5.gif" height="auto" width="600"/></p>

This tool is experimental and primarily used internally to develop Modulo-based front-end applications. While officially Tlon  does not support it, you can always get general programming help for Urbit in the `~dopzod/urbit-help` chat.

## Installation

This repository is available as a template; to immediately generate your application's repository you can click [here](https://github.com/urbit/create-modulo-app/generate). Clone the generated repository, `npm install` and then run `npm start` to get started (you can also directly clone this repository, if you wish!). 

In order to run your application on your ship, you will need Urbit v.0.8.0 or higher. On your Urbit ship, if you haven't already, mount your pier to Unix with `|mount %`.

## Using

Once you're up and running, your tile lives in `tile/tile.js`, which uses [React](https://reactjs.org) to render itself -- you'll want a basic foothold with it first. When you make changes, the `urbit` directory will update with the compiled application and, if you're running `npm run serve`, it will automatically copy itself to your Urbit ship when you save your changes (more information on that below).

### `npm start`

This runs the wizard. Give it an application name and the location of your Urbit ship's pier and it will customise the files so your new application will run on your ship.

### `npm run build`

This builds your application and copies it into your Urbit ship's pier. In your Urbit (v.0.8.0 or higher) `|commit %home` (or `%your-pier-name`) to synchronise your changes.

If this is the first time you're running your application on your Urbit ship, don't forget to `|start %yourApp`.

### `npm run serve`

Builds the application and copies it into your Urbit ship's pier, watching for changes. In your Urbit (v.0.8.0 or higher) `|commit %home` (or `%your-pier-name`) to synchronise your changes.

## FAQ

### How can I ensure my app fits Modulo design?

Modulo makes use of the [Tachyons](http://tachyons.io/) CSS framework. The template tile and full application both make use of it as an example for you to get going fast.

### What if I want to communicate with my ship / provide more functionality besides a front-end?

By default, your app will provide an example of passing state from ship to front-end with the `peer-[yourAppName]tile` arm in the app's .hoon file -- in this case, just sending your ship's name as a data prop. The code is well-commented if you don't want to pass state, or if you want to know how to pass almost anything else from your ship to the Modulo interface.

In order to do anything substantial, of course, you'll want to know [Hoon](https://urbit.org/docs/learn/hoon/). If this is intimidating, don't panic: `create-modulo-app` is a fantastic way to start learning by leveraging your strengths. This repository is intended to be a boilerplate for rapid front-end development; it's also a gradual, incremental introduction to Hoon for web developers by allowing for rapid prototyping and experimentation with the Modulo interface.

Happy hacking!

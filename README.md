Get started building a simple Modulo tile app for [Urbit](http://urbit.org) with a few commands.

## Installation

Clone this repository and run `npm start`. In order to run your application on your ship, you will need Urbit v.0.8.0 or higher.

On your Urbit ship, if you haven't already, mount your pier to Unix with `|mount %`.

## Using

### `npm start`

This runs the wizard. Give it an application name and the location of your Urbit ship's pier and it will customise the files so your new application will run on your ship.

### `npm run build`

This builds your application and copies it into your Urbit ship's pier. In your Urbit (v.0.8.0 or higher) `|commit %home` (or `%your-pier-name`) to synchronise your changes.

If this is the first time you're running your application on your Urbit ship, don't forget to `|start %yourApp`.

### `npm run serve`

Builds the application and copies it into your Urbit ship's pier, watching for changes. In your Urbit (v.0.8.0 or higher) `|commit %home` (or `%your-pier-name`) to synchronise your changes.

## FAQ

### What if I want to build a full application, not just a tile?

The future is a wonderful place that will include this functionality. Imagine.

### What if I want to communicate with my ship / provide more functionality besides a front-end?

You can certainly do that, if you know [Hoon](https://urbit.org/docs/learn/hoon/). This is intended to be a boilerplate for rapid front-end development specifically; alternatively, it's also a gradual, incremental introduction to Hoon for web developers by allowing for rapid prototyping and experimentation with the Modulo interface.
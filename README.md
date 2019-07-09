Get started building a simple Modulo tile app for [Urbit](http://urbit.org) in a few commands.

# Installation

Clone this repository and run `npm start`. In order to run your application on your ship, you will need Urbit v.0.8.0 or higher.

On your Urbit ship, if you haven't already, mount your pier to Unix with `|mount %`.

# Using

### `npm start`

This runs the wizard. Give it an application name and the location of your Urbit ship's pier and it will customise the files for your new application.

### `npm run build`

This builds your application and copies it into your Urbit ship's pier. In your Urbit (v.0.8.0 or higher) `|commit %home` (or `%your-pier-name`) to synchronise your changes.

If this is the first time you're running your application on your Urbit ship, don't forget to `|start %yourApp`.

### `npm run serve`

Builds the application and copies it into your Urbit ship's pier, watching for changes. In your Urbit (v.0.8.0 or higher) `|commit %home` (or `%your-pier-name`) to synchronise your changes.
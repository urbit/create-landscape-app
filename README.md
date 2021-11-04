Get started building a simple application for Landscape on your [Urbit](http://urbit.org) ship with a few commands.

[![awesome urbit badge](https://img.shields.io/badge/~-awesome%20urbit-lightgrey)](https://github.com/urbit/awesome-urbit)

## Getting Started

Simply run `npx @urbit/create-landscape-app` and follow the prompts, this will create a new folder with your application.

Once it's done open the `README.md` in that directory to get started.

## FAQ

### How can I ensure my app fits Landscape design?

We're currently working on Indigo v2 and hope to release it soon as an NPM package that you can use in your app.

### Nothing shows up when I go to `https://localhost:3000/apps/{my-app}`.

You may need to navigate to directly to `https://localhost:3000` first to login.

### How do I develop on a different ship?

Edit the `ui/.env.local` file replacing `{URL}` with the URL to your new ship:

```
VITE_SHIP_URL={URL}
```

### Do I *need* Hoon to build apps for Landscape?

Not necessarily! This template provides examples of using the packages `@urbit/api` and `@urbit/http-api` to use existing functionality on your Urbit through JavaScript without any additional lines of Hoon.

### How do I learn to communicate with my ship or write back-end code?

In order to do anything substantial with Gall, see [this guide](https://github.com/timlucmiptev/gall-guide) for pointers.

But if this is intimidating, don't panic: `create-landscape-app` is a fantastic way to start learning by leveraging your strengths. This repository is intended to be a boilerplate for rapid front-end development; it's also a gradual, incremental introduction to Hoon for web developers by allowing for rapid prototyping and experimentation with the Landscape interface.

## Further Information

You can always get general programming help for Urbit from the [Urbit Community (~bitbet-bolbel/urbit-community)](web+urbitgraph://group/~bitbet-bolbel/urbit-community), the [Forge (~middev/the-forge)](web+urbitgraph://group/~middev/the-forge) or the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev) mailing list.

Happy hacking!
---
created_at: 2014-05-07
kind: article
publish: true
title: "NodeJS Application - Bootstraping"
authors:
- adrien
tags:
- programming
---

[Last time, I introduced the context and the needs for our application][1]. We ended installing the tools needed to develop our application.

Today, we will work on the bootstrap, ie. create the structure of our application, install the dependencies, set up our project to get access to the different services we're going to use, ie. Github and Hipchat.

* [Part 1 - Introduction to a NodeJS app development](/2014/04/NodeJS_Introduction/)
* [Part 3 - NodeJS Application - Requesting APIs](/2014/05/NodeJS_Requesting_APIs/)
* [Part 4 - NodeJS Application - HipChat Notifications](/2014/09/NodeJS_HipChat_Notifications/)

## Structure

Our project is pretty simple, and will be a bit dirty, as we are not gonna separate the concerns in our app. So what's left in the root folder of your application is a unique `app.js` file in which there will be all our code, a `node_modules` folder that contains the packages we will install in a moment, a `Procfile` to later be able to make our application running on [Heroku][2], `package.json` which lists the dependencies of our project and a `start.sh` script.

So, here is what you should get at the end of this article when running the `ls` command:

```
Procfile
app.js
node_modules
package.json
start.sh
```

## Dependencies

Now let's install the required libraries. There is not much. Our application is gonna be developed on top of [ExpressJS][3] and we will need the [node-hipchat][4] package to easily send notifications on an Hipchat room. We will also use [UnderscoreJS][5] because it's handy :)

And to finish, we'll use [nodemon][6] which automatically restart our server after any changes made.

To install the packages, you just need to run the command:

```
npm install --save express underscore node-hipchat
npm install -g nodemon
```

## OAuth Access

### Github API

To be able to use [Github API][7], we need to let Github know about us. To do that, here are the steps:

* Create a *Personal Access Token* [here][8];
* Choose a name to identify what you will use the token for, basically the name of the application;
* Check the box for `repo` scope;

### Hipchat API

So, we use [node-hipchat][9] to play with Hipchat but to make it works, like with Github, we need to let us know about our will. The process is pretty similar to what we did with Github API.

* Go on [Admin API page][10];
* Create a new token:
  * Choose *Notification* as **Type**
  * Choose whatever you want as **Label**

## Bootstrap

Now that we have our libraries and our tokens, we will write a short shell script to define environment variables (best practice when you play with sensitive data like authentication tokens) and start our application.

* Put this content in `start.sh`:

```
#!/bin/sh

export GH_AUTH_TOKEN='****************************************'
export HIPCHAT_KEY='******************************'

nodemon app
```

Now, let's write a simple code to display the content of our environment variables.

* In `app.js`, add the references of the libraries we will use:

```
var _ = require('underscore');
var express = require('express');
var app = express();
```

* Define the configuration constants:

```
app.set('GITHUB_AUTH_TOKEN', process.env.GH_AUTH_TOKEN);
app.set('HIPCHAT_KEY', process.env.HIPCHAT_KEY);
```

* Create an instance of your server:

```
var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);

  // Display our configuration variables:
  console.log('Github token: ', app.get('GITHUB_AUTH_TOKEN'));
  console.log('Hipchat token: ', app.get('HIPCHAT_KEY'));
});
```

* Run your server from your terminal:

```
./start.sh
```

And you should see something like:

```
26 Apr 19:52:35 - [nodemon] v1.0.17
26 Apr 19:52:35 - [nodemon] to restart at any time, enter `rs`
26 Apr 19:52:35 - [nodemon] watching: *.*
26 Apr 19:52:35 - [nodemon] starting `node app.js`
Listening on port 5000
Github token:  ****************************************
Hipchat token:  ******************************
```

You now have a simple NodeJS app using Express which display some contents
coming from your environment! Next time, we will write the code to request Github API and list pull requests of your organisation/profile.

## Questions?

If you have questions, suggestions or remarks, do not hesitate to ping us on Twitter [@Nukomeet](https://twitter.com/nukomeet), by [email](mailto:bonjour+blog@nukomeet.com) or to reach me directly [@AdrienGiboire](https://twitter.com/adriengiboire).

  [1]: http://nukomeet.com:8080/2014/04/NodeJS_Introduction/
  [2]: heroku.com
  [3]: http://expressjs.com/
  [4]: https://github.com/nkohari/node-hipchat
  [5]: http://underscorejs.org/
  [6]: http://nodemon.io/
  [7]: https://developer.github.com/v3/
  [8]: https://github.com/settings/applications
  [9]: https://github.com/nkohari/node-hipchat
  [10]: https://nuk0meet.hipchat.com/admin/api

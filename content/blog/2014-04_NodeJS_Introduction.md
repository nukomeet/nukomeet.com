---
created_at: 2014-04-22
kind: article
publish: true
title: "Introduction to a NodeJS app development"
authors:
- adrien
tags:
- programming
extract: In this article, I will go through the entire development of simple NodeJS application, the gotchas, the tips, some details regarding GitHub interface to deal with our needs, etc.
---

I recently went through a simple app which aims to list the pending pull requests of all the repositories of a specific organization on [Github](https://github.com/).
This application is a [NodeJS](http://nodejs.org/) app, served with
[Express](http://expressjs.com/) and hosted on [Heroku](http://heroku.com/).
Once a day, it will request Pull Requests (**PR**) from the platform and send a notification that lists the PRs to a HipChat room.

In this article, I will go through the entire development of this application, the gotchas, the tips, some details regarding GitHub interface to deal with our needs, etc.

To make it more digestible, this will be a series of technical post, each one focusing on a specific part.

* [Part 2 - NodeJS Application - Bootstrap](/2014/05/NodeJS_Bootstrap/)
* [Part 3 - NodeJS Application - Requesting APIs](/2014/05/NodeJS_Requesting_APIs/)
* [Part 4 - NodeJS Application - HipChat Notifications](/2014/09/NodeJS_HipChat_Notifications/)

## Requirements

Before we can get started, there is a few things that you need to do. For this application, we will need NodeJS and Heroku Toolbelt running on our machine. As I'm running on MacOS, I will mainly use [Homebrew][1] to install required softwares.

First, **install Homebrew** or **ensure Homebrew is up to date** if you already have it:

```
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)" # Install Homebrew
```

```
$ brew update # Update Homebrew core
$ brew upgrade # Update Homebrew's Formulaes
```

Then, **install NodeJS**:

```
$ brew install nodejs
$ echo "export PATH=$PATH':/usr/local/share/npm/bin'" >> ~/.zshrc
```

*Replace `~/.zshrc` with the right file you have depending on the shell you use.*

Then, **install the Heroku Toolbelt**:

```
$ brew install heroku-toolbelt
```

## Questions?

If you have questions, suggestions or remarks, do not hesitate (I know you don't) to ping us on Twitter [@Nukomeet](https://twitter.com/nukomeet), by [email](mailto:bonjour+blog@nukomeet.com) or to reach me directly [@AdrienGiboire](https://twitter.com/adriengiboire).
I'd like to hear from you if you want to help me build this series :)

Also, feel free to comment [here](https://news.ycombinator.com/item?id=8344896).

See you next time for the serious stuff!

> Note: This article will be updated each time to link all the parts of this series.

  [1]: http://brew.sh/
  [2]: http://www.git-scm.com/
  [3]: http://www.git-scm.com/downloads
  [4]: http://nodejs.org/
  [5]: http://nodejs.org/download/
  [6]: https://toolbelt.heroku.com/

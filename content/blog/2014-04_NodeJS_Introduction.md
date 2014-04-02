---
created_at: 2014-01-24
kind: article
publish: true
title: ""
authors:
- adrien
tags:
- programming
---

From January 17 to 19, I participated in a Google Glass hackathon organized by [GlassCamp][1] in Paris. It was an almost 40 hours long event with 5 teams in competition. Google Glass is still a very obscure technology - it’s difficult to get the device and get familiar with its SDK. There are about 20 glass devices in France (8 of them were used at the event).

![BikeFinder](/assets/images/bikefinder.png "BikeFiner")

I had the pleasure to be a part of the BikeFinder team. The idea was to create an application that shows bikes disponibility in cities that have such service e.g. Velib in Paris (check [the video][5] that explains the concept). My task was to develop a backend for this application. At the end of the event we managed to deliver a fully operational application that works in any city where JC Decaux data about public bicycles is available.

<iframe width="550" height="315" src="//www.youtube.com/embed/d99Sg-09zuc"
frameborder="0" allowfullscreen></iframe>

---

# Developing a NodeJS app - Introduction

I recently went through a simple app which aims to list the pending pull requests of all the repositories of a specific organization on both [Github](https://github.com/) and [Bitbucket](https://bitbucket.org/).
This application is a [NodeJS](http://nodejs.org/) app, served with [Express](http://expressjs.com/) and hosted on [Heroku](http://heroku.com/). Once a day, it will request Pull Requests (PR) from both platforms and send a notification that lists the PRs to a HipChat room.

In this article, I will go through the entire development of this application, the gotchas, the tips, some details regarding GitHub and Bitbucket interfaces to deal with our needs, etc.

To make it more digestible, this will be a series of technical post, each one focusing on a specific part.

> Note: I'm gonna cover MacOS X. If you are on a different platform, you should be okay though.

## Requirements

Before we get started, there is a few things that you need to do. For this application, we will need NodeJS, Heroku Toolbelt and Git running on our machine. As I'm running on MacOS, I will mainly use [HomeBrew][1] but I will show you the alternatives as well.

First, ensure Homebrew is up to date:

```
$ brew update
[$ brew upgrade]
```

Then, **install Git**:

```
$ brew install git
```

The alternative is to go on the [official Git website][2] and [download][3] the version related to your OS and install it following the usual steps.

> Note: Git is just here to let us version our code. It's an habit you should take even for small, personal projects. It has no specific costs in time nor in money nor in performance but it comes with a lot of profits. However, I will not go through how to use Git. I can on demand only and it would be on different series.
> Thus, **Git is optional** for all we will do.

Then, **install NodeJS**:

```
$ brew install nodejs
$ echo "export PATH=$PATH':/usr/local/share/npm/bin'" >> ~/.zshrc
```

*Replace `~/.zshrc` with the right file you have depending on the shell you use.*

The alternative is to go on the [official website of NodeJS][4] where you will find an install button which will download the last version for your platform. Or you can go on the [download page][5] and choose what to download.

Then, **install the Heroku Toolbelt**:

```
$ brew install heroku-toolbelt
```

The alternative is to go on the [Heroku Toolbelt website][6], pick your platform and follow the instructions.

## Questions?

If you have questions, suggestions or remarks, do not hesitate (I know you don't) to ping us on Twitter [@Nukomeet](https://twitter.com/nukomeet), by [email](mailto:bonjour+blog@nukomeet.com) or to reach me directly [@AdrienGiboire](https://twitter.com/adriengiboire).
I'd like to hear from you if you want to help me build this series :)

See you next week for the serious stuff!

> Note: This article will be updated each week to link all the parts of this series.

  [1]: http://brew.sh/
  [2]: http://www.git-scm.com/
  [3]: http://www.git-scm.com/downloads
  [4]: http://nodejs.org/
  [5]: http://nodejs.org/download/


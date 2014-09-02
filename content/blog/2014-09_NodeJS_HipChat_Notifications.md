---
created_at: 2014-09-02
kind: article
publish: true
title: "NodeJS Application - HipChat Notifications"
authors:
- adrien
tags:
- programming
---

[Last time, we saw how to consume data from GitHub API and how to list the pull requests of your organization](/2014/05/NodeJS_Requesting_APIs/). Today, we will see how to send notifications to hipchat and how to deploy your app and make it run each day.

## Setup

Now that we have our data, we need to integrate HipChat so we can send notifications to a room to let all of our collaborators know PR are waiting for review.

If you followed the [second article of the serie](/2014/05/NodeJS_Bootstrap/), you should have a HipChat key and your application is already set up to read it from environment variables.

All you'll need to provide at this point is the ID of the room you want to reach. For that, I cheated a little. Go to the list of the rooms you have access to.

![go_to_rooms](/assets/images/blog/nodejs-serie/go_to_rooms.jpg)

Then, hover the link of the room you wanted to ping, and pick the ID form the URL.

![get_id](/assets/images/blog/nodejs-serie/get_id.jpg)

## Sending notifications

Now, we can send our HTML as it contains just what we need to display our notification.

First, we need to reference the hipchat nodejs module at the top of our file.

```
var hipchat = require('node-hipchat');
```

We have to instantiate it.

```
var HC = new hipchat(app.get('HIPCHAT_KEY'));
```

Then, we have to define some parameters. These parameters will be the room ID, the HTML we want to send, the name you want to appear as the author of the notification and the background color you want the notifications to appear in.

```
var params = {
  room: 55413,
  from: 'Assistant',
  message: html,
  color: 'yellow'
};
```

And finally, this is how to send our fully prepared notifications:

```
HC.postMessage(params, function(data) {});
```

You have to put these pieces of code in your route, this way::

```
app.get('/pull-requests', function (request, response) {
  fetchRepos(fetchPullRequests);

  app.once('pull-requests:fetched', function (pullRequests) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var html = "";

    _.each(pullRequests, function (pullRequests, index) {
      html += 'There is <strong>'+ pullRequests.data.length +'</strong> pending pull request(s) for <strong>'+ pullRequests[index].repo +'</strong>:';
      html += '<ul>';
      _.each(pullRequests.data, function (pullRequest) {
        html += '<li><em>'+ pullRequest.title +'</em> (<a href="'+ pullRequest.html_url +'">'+ pullRequest.html_url +'</a>)</li>';
      });
      html += '</ul>';
    });

    var HC = new hipchat(app.get('HIPCHAT_KEY'));

    var params = {
      room: 55413,
      from: 'Assistant',
      message: html,
      color: 'yellow'
    };

    HC.postMessage(params, function(data) {});

    response.write(html);
    response.end();
  });
});
```

Now, every time you request [`http://localhost:50000/pull-requests`](http://localhost:50000/pull-requests), you should see a list of pull requests sorted by repository, if you happen to have at least one pull request at all *and* see a notification raised in your HipChat room.

# Deploy

Now that we have a fully working app on our machine, let's deploy it and make it run live. For this, we'll use [Heroku](https://www.heroku.com/).

All you need is to install `heroku` toolbelt and add this line in the `Procfile` file:

```
web: node app.js
```

If you're not familiar with Heroku, follow [this complete guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to know more.

# Cron it

At this stage, we are fully operational. All we are missing is that we want it to run every morning. The simplest is to use [Heroku Scheduler](https://addons.heroku.com/scheduler). It's free and simple. Then add a job which will run the following task:

```
curl http://reviewer-assistant.herokuapp.com/pull-requests
```

And set it to run at the time you want. For me, it looks like this:

![heroku_scheduler](/assets/images/blog/nodejs-serie/heroku_scheduler.png)

And that's all! We are done with this serie.

## Questions?

If you have questions, suggestions or remarks, do not hesitate to ping us on Twitter [@Nukomeet](https://twitter.com/nukomeet), by [email](mailto:bonjour+blog@nukomeet.com) or to reach me directly [@AdrienGiboire](https://twitter.com/adriengiboire).

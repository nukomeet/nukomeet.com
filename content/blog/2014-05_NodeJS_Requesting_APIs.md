---
created_at: 2014-05-27
kind: article
publish: true
title: "NodeJS Application - Requesting APIs"
authors:
- adrien
tags:
- programming
---

[Last time, we created a simple NodeJS app which displays some basic contents provided by the running environment.][1] Today, we will see how to actually consume data from Github API and how to list the pull requests of your organization.

* [Part 1 - Introduction to a NodeJS app development](/2014/04/NodeJS_Introduction/)
* [Part 2 - NodeJS Application - Bootstrap](/2014/05/NodeJS_Bootstrap/)
* [Part 4 - NodeJS Application - HipChat Notifications](/2014/09/NodeJS_HipChat_Notifications/)

## Specs

Now, we are really ready to request Github API but before going further, let's take a moment to think about how we can reach our goal.

To request the pull requests of an organization, we need to know the list of the repositories, then for each repository, we have to ask Github what are the attached pull requests.

According to [Github API documentation][3], to [list organization repositories](https://developer.github.com/v3/repos/#list-organization-repositories) we will request the following URL:

```
GET /orgs/:org/repos
```

Where `:org` is the name of your organization.

Then, for each repositories, we can request:

```
GET /repos/:owner/:repo/pulls
```

Where `:owner` can be a user or an organization, and `:repo` a given repository :)

## Setup

Okay, so know that we know where we are heading, let's set up a few things.

To request Github API, we first need to add [`https` NodeJS module][2] as a dependency:

```
var https = require('https');
```

For convenience, I choose to export into a global variable the options we need to request Github API:

```
var _options = {
  headers: {
    'User-Agent': app.get('ORGANISATION'),
    'Authorization': 'token '+ app.get('GITHUB_AUTH_TOKEN')
  },
  hostname: 'api.github.com'
};
```

We'll see how to use this object.

Finally, let's set the name of your organization as an application settings:

```
app.set('ORGANISATION', 'nukomeet');
```

## Requesting List of Repositories

As said, we need to ask Github the list of repositories for a given organization.

Here is the function that will do the job for us.

```
function fetchRepos (callback) {
  _options.path = '/orgs/'+ app.get('ORGANISATION') +'/repos';

  // Fetch the list of repos for a given organization
  var request = https.get(_options, function (res) {
    data = "";

    // We watch the response data we receive
    res.on('data', function (chunk) {
      // We store them
      data += chunk;
    });

    // When the response from the Github server ends
    res.on('end', function () {
      // We can parse the complete response into a JS object
      var repos = JSON.parse(data);

      // And call a callback which basically will fetch the PR for those repositories
      return callback(repos);
    });
  });

  // We can listen on `error` event to know if something goes wrong
  request.on('error', function (error) {
    console.log('Problem with request: '+ error);
  });
}
```

This is pretty simple.

## Requesting List of Pull Requests

Here is the function to request the pull requests for a specific repository:

```
function fetchPullRequests (repos) {
  // Reference of our entire list of pull requests
  var pullRequests = [];

  // We go through the entire list of repositories
  _.each(repos, function (repo, index) {
    // Set the Github API endpoint for the given repository
    _options.path = '/repos/'+ app.get('ORGANISATION') +'/'+ repo.name +'/pulls';

    // And we request the data
    var request = https.get(_options, function (res) {
      // The closure here is to ensure we save a reference to the current repository
      // Otherwise, we won't get the expected results
      (function (repo) {
        var data = "";

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          data = JSON.parse(data);

          // We ensure the current repository has pull requests
          if (data.length > 0) {
            // We store the pull requests for later usage
            pullRequests.push({repo: repo.name, data: data});
          }

          // We check if we just requested data for the last repository
          if (index == (repos.length - 1)) {
            // And we let know to the listeners we are done fetching our data
            app.emit('pull-requests:fetched', pullRequests);
          }
        });
      })(repo);
    });
  });
}
```

Here again it's quite simple. It's pretty similar to our previous function.

## Routing

Now that we have the logic to get the data, we are looking for displaying these data.

To do that, we will use `express` to deal with our routes. Really simple:

```
app.get('/pull-requests', function (request, response) {
  fetchRepos(fetchPullRequests);
});
```

Now, every time you go on [`http://localhost:50000`](http://localhost:50000), your app will call `fetchRepos`, and provide `fetchPullRequests` as a parameter so the former can call the latter when it get its job done.

## Display the data

If you have paid attention, you've seen that at one point in `fetchPullRequests` we trigger an event, `pull-requests:fetched`. Well, this is so we can be aware of when the data are actually fetched and so that we can process them in order to display them.

So we have to listen on this event:

```
app.once('pull-requests:fetched', function (pullRequestsByRepo) {});
```

`pullRequestsByRepo` will get the full list of pull requests provided by the function `fetchPullRequests`.

Now, all we have left to do is to generate the response we will send to our browser:

```
app.once('pull-requests:fetched', function (pullRequestsByRepo) {
  // We let the browser knows that everything went fine
  response.writeHead(200, {'Content-Type': 'text/html'});

  // We generate the HTML
  var html = "";
  _.each(pullRequestsByRepo, function (pullRequests, index) {
    html += 'There is <strong>'+ pullRequests.data.length +'</strong> pending pull request(s) for <strong>'+ pullRequestsByRepo[index].repo +'</strong>:';
    html += '<ul>';
    _.each(pullRequests.data, function (pullRequest) {
      html += '<li><em>'+ pullRequest.title +'</em> (<a href="'+ pullRequest.html_url +'">'+ pullRequest.html_url +'</a>)</li>';
    });
    html += '</ul>';
  });

  // We write the HTML inside the body of our reponse
  response.write(html);
  // And we 'send' it
  response.end();
});
```

Remember, this piece of code goes inside your route, so you should get something like this:

```
app.get('/pull-requests', function (request, response) {
  fetchRepos(fetchPullRequests);

  app.once('pull-requests:fetched', function (pullRequestsByRepo) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var html = "";

    _.each(pullRequestsByRepo, function (pullRequests, index) {
      html += 'There is <strong>'+ pullRequests.data.length +'</strong> pending pull request(s) for <strong>'+ pullRequestsByRepo[index].repo +'</strong>:';
      html += '<ul>';
      _.each(pullRequests.data, function (pullRequest) {
        html += '<li><em>'+ pullRequest.title +'</em> (<a href="'+ pullRequest.html_url +'">'+ pullRequest.html_url +'</a>)</li>';
      });
      html += '</ul>';
    });

    response.write(html);
    response.end();
  });
});
```

Now, every time you request [`http://localhost:50000/pull-requests`](http://localhost:50000/pull-requests), you should see a list of pull requests sorted by repository, if you happen to have at least one pull request at all.

That's all for today!

Next time, we will look at how to send Hipchat notifications and how to deploy our app on the cloud and make it run each day.

## Questions?

If you have questions, suggestions or remarks, do not hesitate to ping us on Twitter [@Nukomeet](https://twitter.com/nukomeet), by [email](mailto:bonjour+blog@nukomeet.com) or to reach me directly [@AdrienGiboire](https://twitter.com/adriengiboire).

### Final Current Codebase

Here is the `app.js` for today:

```
var _ = require('underscore');
var express = require('express');
var https = require('https');
var app = express();

app.set('ORGANISATION', 'nukomeet');
app.set('GITHUB_AUTH_TOKEN', process.env.GH_AUTH_TOKEN);
app.set('HIPCHAT_KEY', process.env.HIPCHAT_KEY);

var _options = {
  headers: {
    'User-Agent': app.get('ORGANISATION'),
    'Authorization': 'token '+ app.get('GITHUB_AUTH_TOKEN')
  },
  hostname: 'api.github.com'
};

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

    response.write(html);
    response.end();
  });
});

function fetchRepos (callback) {
  _options.path = '/orgs/'+ app.get('ORGANISATION') +'/repos';

  // Fetch the list of repos for a given organisation
  var request = https.get(_options, function (res) {
    data = "";

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var repos = JSON.parse(data);
      return callback(repos);
    });
  });

  request.on('error', function (error) {
    console.log('Problem with request: '+ error);
  });
}

function fetchPullRequests (repos) {
  var pullRequests = [];
  _.each(repos, function (repo, index) {
    _options.path = '/repos/'+ app.get('ORGANISATION') +'/'+ repo.name +'/pulls';
    var request = https.get(_options, function (res) {
      (function (repo) {
        var data = "";

        res.on('data', function (chunk) {
          data += chunk;
        });

        res.on('end', function () {
          data = JSON.parse(data);
          if (data.length > 0) {
            pullRequests.push({repo: repo.name, data: data});
          }

          if (index == (repos.length - 1)) {
            app.emit('pull-requests:fetched', pullRequests);
          }
        });
      })(repo);
    });
  });
}

var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});

```


  [1]: http://nukomeet.com:8080/2014/05/NodeJS_Bootstrap/
  [2]: http://nodejs.org/api/https.html
  [3]: https://developer.github.com/v3/



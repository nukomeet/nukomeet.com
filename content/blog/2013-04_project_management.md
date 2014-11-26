---
kind: article
created_at: 2013-04-15
title: "Project management in a distributed self-managed company"
publish: true
tags:
- business
---

I am often asked what do we use as tools and rules for our project management. It is something we deeply care about and constantly improve.

We are far from being satisfied and still have a lot of things to do improve the things but I’ve decided to humbly share the little that we have. Your suggestions are most welcome.

## Tools

For communication we use [Hipchat](http://hipchat.com) We try to be connected there most of the time in order to have real time or asynchronous communication with the rest of the team despite the distance. In Hipchat we made several dedicated rooms: one per project, one to discuss money related issues, one for sales... We also have an open room where anyone (generally trolls with indian names) can ping us.

A bunch of other tools are connected to Hipchat and send a notification in the corresponding room when an event happens there: Asana, BitBucket, Github, Heroku, Errbit, servers stats, backup info, etc.

To share information we use Dropbox for files that don’t have to be edited (PDF, PNG) such as bills, invoices..., and [Drive](http://drive.google.com) for files that we collaboratively edit (spreadsheets, blogposts...). In Drive, each project has its folder with all the related documents (mockups, estimates...etc). One file is a list of all projects with a short description and status updates. One file keeps track of our Profits & Losses and metrics and another is used as an internal bank where we keep track of our internal credits and shares.

We’ve done our accounting on [Freshbooks](http://freshbooks.com) for a while and recently switched to [Wave](https://waveapps.com), plus the help from humans at Consoleo.

We host some of our web apps on [Heroku](http://heroku.com) (some clients prefer an easy management over cost), our static websites on Github Pages, the PHP apps (rare) on Appfog and a lot of stuff on Hetzner servers.

For hosting code repositories, we use [Github](http://github.com) and [Bitbucket](http://bitbucket.org).  This is also where we will assign tasks related to coding. Our workflow as a team follows the rules of a fork and pull model, taken from open-source projects. [read this for more details on a fork and pull workflow](http://zaiste.net/2012/05/how_i_use_git_-_basics/).

For tasks we use [Asana](http://asana.com). We also use it as a CRM application (each lead/client is a task) after trying tons of things (Base, Streak, Capsule...) that never caught us.

To keep track of events happening on all these different places we use Hojoki. It makes a stream of notification from (nearly) all the above mentioned apps and sends daily and weekly reports with metrics (yeah man, that is really awesome). Eventually I think we will shift our macro-management over there. They are working hard on it, but the app is still sluggish.

We nearly don’t use mails internally, except for the organization of conferences and events, where everything often happens on public mailing lists.

## Good habits

- We start our day by looking at assigned tasks on Asana.

- Each project must be documented.

- The documentation must be accessible and available to everybody in the company.

- Regular updates should be provided.

- Everybody can assign a task to anybody.

-  We commit to tasks and deadlines, deadlines given to the client are not the same as the one we commit to internally (like travel companies).

- If someone sees shit happening on a project, he should rise up and speak (no lazy ignoring of what is going on in the rest of the company)

 - Everyone is allowed and encouraged to take quick decisions, the others have to be notified, so they can veto it.


We like to see ourselves as a brain: every part is connected and always sync and decisions can come from anywhere, with a gateway.

These rules are like Kant ideas: this how it should be but this not how it is. More a direction than an actual state of things.

Let us know your thoughts.

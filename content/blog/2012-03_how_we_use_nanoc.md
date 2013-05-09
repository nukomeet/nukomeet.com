---
created_at: 2012-03-14
kind: article
publish: true
title: "How we use Nanoc"
authors:
 - zaiste
---

[Nanoc](http://nanoc.stoneship.org/) is a static site generator, and it is cool, mainly for three reasons:

1. **speed:** it makes your website pretty fast as it's only HTML without any dynamic content
1. **freedom:** you only need a HTTP server to host your website, no bells and whistles. It's a perfect, cross-platform solution. You can also use several markup languages, and even mix them together. We use HAML and Markdown.
1. **simplicity:** no database connection and configuration, no graphical admin panel, only stuff that matters.

## Workflow

Our workflow is pretty standard. We host our website code on GitHub, each contributor has its fork. Changes are being integrated using pull requests.

As of version 3.2, nanoc provides a simple DSL to create custom commands (based on [Cri library](http://rubydoc.info/gems/cri/2.0.0/file/README.md)). We used that functionality to automate blog posts creation.

<script src="https://gist.github.com/2032721.js?file=post.rb"></script>

As you can see, we prefer to have a flat website structure. All posts are inside a blog directory. In addition to that we only use year and month to differentiate them.

To create a new post, you simply do:

    nanoc post "this is post title"

you edit the new post

    vim content/blog/2012-03_this_is_post_title.md

you compile the website

    nanoc compile

you check it locally at localhost:3000

    nanoc view

and finally you can push it to the server

    nanoc deploy --target public

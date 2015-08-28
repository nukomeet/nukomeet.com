---
created_at: 2015-03-20 
kind: article
publish: true
title: "Errors on the last edited line"
authors:
- adam 
extract: "You know the story: you start your working day on a project, the project consists of couple of Git repositories. You `cd` into each directory, fire up a server or a service. You pick up a free ticket to work on. You start to mess around the files. One addition here, another there, this line is is not needed, this variable should change its name."
---

You know the story: you start your working day on a project, the project consists of couple of Git repositories. You `cd` into each directory, fire up a server or a service. You pick up a free ticket to work on. You start to mess around the files. One addition here, another there, this line is is not needed, this variable should change its name. 

You are hacking up really nicely through your code (cursing a bit on your colleagues for using `self` in Ruby when not needed). And you validate that your code is still working by re-running an automatic test or by using a specific feature of your project.

Everything is working fine. You are starting to behave reckless. You spot a place where you can do refactor. Nothing special, remove unused variable, extract some part of a method to a method on its own. Oh and you see that this new method can be used somewhere else to dry things up. At this point your subconscious is sending you a message « dude you have not staged nor committed your changes, your code might be broken ». But confident in your programming skills you finish your refactoring. The moment of truth comes. And surprise - it is not working.

You are resorting to `git diff`. The issue is that you have to look at few repositories at the same time. The refactor changes are intertwined with the feature changes. You look at the Git's man page to see which is the switch to `git revert` for removing only the refactor changes. What is the best way proceed from here? Manually removing the recent changes? Let me leave you here and make comment on something that should obvious but it is not.

Recently I have stumbled on an interesting blog post: « [The Last Line Effect][1] ». The summary of it is that programmers most often tend to make mistakes in the last fragment of a homogeneous code block. When you think about, when facing a lot of newly introduced changes you often find out that the last line you have edited introduced the bug. Instead of trying to grasp the hold of each of the changed fragments of the code just look at the last edited line.

Since I really enjoy hacking Emacs I thought that making a package that helps programmers with this problem will be fun. Namely, to review and browse changes introduced to a file; that is how I have started writing [diff-log][2].

It is not a state-of-the-art Emacs package. It is simply running `diff` program on each save to the file against the two versions of the file. One just before the change will be introduced and the second one with the change. It allows to see list of diffs of each file for which the package is active sorted by time. My intention for it is to resemble magit, which is the great interface to git for Emacs.

Maybe you want to contribute? Feel free to contact me by mail (adam at nukomeet.com) or by [Github’s Issue tracker][3].


[1]: http://www.viva64.com/en/b/0260/
[2]: https://github.com/asok/diff-log
[3]: https://github.com/asok/diff-log/issues


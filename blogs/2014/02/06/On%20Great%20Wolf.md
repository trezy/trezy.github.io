# On Great Wolf

Yesterday was my last day working at [Great Wolf](http://greatwolf.com/) so I'd like to document the things I learned before I start a new job and lose all of that new hotness.

<!--more-->

## [Coffeescript](http://coffeescript.org/) is awesome

Coffeescript is a Javascript preprocessor that:

1. Makes it easier to write Javascript; and
1. Makes your Javascript better.

It makes Javascript easier by allowing you to write semantically. For example, here's a reasonably complex Javascript statement:

```
function randomMatch (matchThis) {
  var random = Math.floor(Math.random() * 100)

  if (matchThis === random) {
    return random
  } else {
    return false
  }
}
```

The above function creates a new random number between 1 and 100 and checks to see if it matches the argument that was passed to it. Here's that same function in Coffeescript:

```
randomMatch = (matchThis) ->
  random = Math.floor Math.random() * 100
  true if matchThis is random
```

Whoa... what? That's right, your mind has just been blown because Coffeescript handles lexical scoping, statement building, and always returns something... *always*. It does all of that for you automatically and in the end makes your code better and cleaner while allowing you to write it semantically. On top of that you can write [literate coffeescript](http://ashkenas.com/literate-coffeescript/). Seriously, check it out.

## Don't rely too heavily on a <abbr title="Content Management System">CMS</abbr>

At Great Wolf we were working on an old version of Drupal that had been <abbr title="End of Life">EoL</abbr>'d but it had been so heavily customized over the years that we had no way to upgrade to a newer version without a fundamental rewrite. When using a <abbr title="Content Management System">CMS</abbr>, make sure you always leverage existing APIs and remember the rule: *"extend, don't amend"*. I'm pretty sure that's from Ghandi.

## Standardize local development

When I started at Great Wolf I was excited about my first workplace Mac. Unfortunately I still had to figure out how to build a development environment from scratch. Since I was completely unfamiliar with our production servers I had basically no idea what I was doing. I was able to gather scattered documentation from my teammates but since they had all been on the system for years there was little help they could provide. I made sure to document my set up as closely as possible and started building something that would ease on-boarding a *lot*.

Using [Vagrant](http://vagrantup.com) and [Packer](http://packer.io/) I got pretty close to an environment that matched our production servers that could even be kept with our Git repo! I'll be doing a write-up on my [Vagrant](http://vagrantup.com/) / [Ansible](http://ansible.com/) set up for my Trezycraft server pretty soon.

## Wrap it up

All-in-all I think it was a pretty good deal. I was able to leave on good terms with several new skills and fond memories of a great team of super smart guys. I wish them all the best of luck and I'll definitely miss them.

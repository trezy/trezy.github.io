[Handlebars](http://handlebarsjs.com) is *awesome*. I can separate my template logic from my application logic? Yes, please. When I try to use Handlebars in my local editor, though, it vomits all over those ugly `<script>` tags. Fortunately, there's an awesome, future-friendly, spec compliant solution - the `<template>` tag.

<!--more-->

## Why isn't this being used elsewhere?

That's a great question. I can only speculate but I'd reckon it has something to do with the recency / lack of support. `<template>` is supported in most browsers, though [Can I Use](http://caniuse.com/#search=template) tells us that we're lacking support in Internet Explorer (big surprise), Safari 7, Blackberry, and IE Mobile. Of those the only browsers I really care about are Safari 7 and IE. Luckily, we can add [this shim](http://jsfiddle.net/brianblakely/h3EmY/) to make it work everywhere.

Once you've got your shim in place you're off to the races! You can read more about the `<template>` tag and how to use it in [this tutorial on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/template/).

## So why do we need Handlebars?

I love Handlebars. It's a lot more usable than other templating systems because you're just writing plain HTML and it's super extensible through the use of custom helpers. You could follow [this tutorial on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/template/) and build your own templating framework but Handlebars is already available and awesome.

## The marriage of two great technologies

Here's the coolest thing: current Handlebars users hardly have to change anything. Add the shim and instead of using the standard Handlebars template blocks...

```html
  <script type="text/x-handlebars-template" id="article-template">
    <article>
      <h1>{{title}}</h1>
      {{content}}
    </article>
  </script>
```

...just swap the `<script>` tags for `<template>` tags:

```html
  <template id="article-template">
    <article>
      <h1>{{title}}</h1>
      {{content}}
    </article>
  </template>
```

And blammo, you're using awesome new HTML5 tech. Your IDE will love you for it. ;-)

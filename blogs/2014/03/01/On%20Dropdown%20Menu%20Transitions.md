The CSS transition property allows for a lot of really cool effects in your design but it has definitely caused me to bang my head against the desk a few times. Here are some details about the transition property that aren't very well documented.<!--more-->

***Disclaimer:*** At the time of this writing transitions still require browser prefixes to work for Firefox (`-moz-`), Opera (`-o-`), and Webkit (`-webkit-`). I have omitted them from the code examples here for readability, but they will be required if you intend to use these techniques.

## The long and the short of it

The transition can be broken into several different properties or used in its shorthand form. You can even mix and match depending on what you prefer. The different transition properties that exist are:

* [`transition`](https://developer.mozilla.org/en-US/docs/CSS/transition)
* [`transition-property`](https://developer.mozilla.org/en-US/docs/CSS/transition-property)
* [`transition-duration`](https://developer.mozilla.org/en-US/docs/CSS/transition-duration)
* [`transition-timing-function`](https://developer.mozilla.org/en-US/docs/CSS/transition-timing-function)
* [`transition-delay`](https://developer.mozilla.org/en-US/docs/CSS/transition-delay)

Each of the longhand properties also have their own shorthand form:

```css
div {
  background-color:#2f2;
  color:#090;
  transition-property:background-color, color;
  transition-duration:1s, .5s;
  transition-timing-function:ease, steps(4,start);
  transition-delay:0s, .5s;
}

div:hover {
  background-color:#fff;
  color:#000;
}
```

Keep in mind that you don't have to have multiple values for each property. If we were to change `transition-duration:1s,.5s;` to `transition-duration:1s;` then both transitions would use the same duration value. Personally, I prefer the shorthand property because it looks cleaner and it takes less code:

```css
transition: <transition-property> | <transition-duration> | <transition-timing-function> | <transition-delay>;
```

The `timing-function` and `delay` are both optional in the shorthand version. Here's an example:

```css
div {
  background-color:#2f2;
  color:#090;
  transition-property:
    background-color 1s,
    color .5s;
}

div:hover {
  background-color:#fff;
  color:#000;
}
```

Both of these blocks of code will create the same functionality so it's entirely a matter of preference. A final thing of note for `transition-property` is that if you don't change anything between states other than the properties you want animated, you can use `all` in place of a list of properties.

## Transitions swing both ways

It wasn't until I read [this article](http://www.impressivewebs.com/mimic-onmouseout-css3-transitions/) from Louis Lazarus that I realized I could use different transitions for different states. If a transition is applied to just one state of an object like in the code examples above it will activate on `:hover` (or whatever state you choose) and reverse when the state changes back. However, if each state has a different transition property, it will be applied to the *incoming* transition. For example:

```css
div:not(.menu):before {
  background-color:#ddd;
  border-radius:10px;
  color:#333;
  content:&amp;#039;Hover me to see the menu&amp;#039;;
  padding:10px;
}

div .menu {
  background:#88b;
  max-height:0;
  -webkit-transition:
    max-height .5s ease .5s,
    max-width .5s ease 0s;
  max-width:10px;
  overflow:hidden;
}

div .menu a {
  color:#fff;
  text-decoration:none;
}

div:hover .menu {
  max-height:999px;
  -webkit-transition:
    max-height .5s ease 0s,
    max-width .5s ease .5s;
  max-width:999px;
}
```

[codepen_embed slug_hash='mvaLt']

In this example when you mouse over the `.menu`'s parent div its first transition will come from the `div:hover .menu` rule. First, it will grow vertically, then it will grow horizontally. When you mouse off the parent div (or the menu) the `.menu` will take it's transition from the `div .menu` rule, first shrinking horizontally, then growing vertically. It's a little bit confusing but super cool!

## It's all in the timing

The `timing-function`s will be familiar to flash developers and video editors that customize the easing on their transitions, timing, and other effects, but they're likely a foreign concept to most web designers. These functions are already well-described on [MDN](https://developer.mozilla.org/en-US/docs/CSS/timing-function) and in the [W3C spec](http://dev.w3.org/csswg/css-transitions/#transition-timing-function) so I'll just give a brief description of each them here.

### `ease`

This is the default setting for `timing-function` so unless you're using the longhand `transition-timing-function`with multiple properties, declaring it is unnecessary. It will ease both the in and out points of the animation with a slightly sharper curve on the in than the out. Basically it's faster in the middle than at the beginning or the end, and the beginning accelerates a little faster than the end.

### `ease-in`

This is similar to `ease` but it has a longer in point curve (slower acceleration) and an abrupt stop.

### `ease-out`

The opposite of `ease-in`, this has a longer out point curve (slower... slowing?). Basically it starts abruptly and slows down as it gets closer to the end.

### `ease-in-out`

I thought the existence of this one was odd since we already have the basic `ease` function. However, there is a slight difference. `ease-in-out` actually has an equal in and out curve, whereas `ease` has a slightly sharper in curve. The actual animation will have an equally slow beginning and end.

### `linear`

This function has a straight line from beginning to end. This means it will have an unchanging speed with an abrupt start and stop.

### `step-start` and `step-end`

What the purpose of these two functions is, I have no idea. I am sure that they have their uses somewhere. With `step-start`, it will make the switch for the transition at the beginning of the duration, then does nothing until the end of the duration. The `step-end` function does the opposite, waiting for the end of the duration, then applying the changes suddenly. These are not smooth transitions at all but rather changes with delays built in.

### `steps(number_of_steps, direction)`

Much more useful than the previous step functions, `steps()` allows you to spread your animation across several abrupt changes for the duration of your transition. Here's an example:

```css
a {
  transition:steps(4, start) 1s;
  width:100px;
}

a:hover {
  width:200px;
}
```

When hovering over this link it would immediately grow incrementally from 100px to 200px instead of moving through a smooth transition. These are literally immediate transitions, similar to if there were no transition at all. The `direction` (in this case 'start') is the same as the suffixes for `step-start` and `step-end`, determining whether the changes begin at the beginning or end of each step. The default value for `direction` is 'end' but the parameter is not optional so `steps(2)` will not work.

### `cubic-bezier(x1, y1, x2, y2)`

This is the mother of all `timing-function`s, giving you ultimate control over the timing of your transitions. All of the other functions except for `steps()` can be defined using the `cubic-bezier()`. However, it can be extremely complicated, so I'll leave you to your own devices here. I highly recommend checking out the [MDN](https://developer.mozilla.org/en-US/docs/CSS/timing-function#The_cubic-bezier()_class_of_timing-functions) article about it for a really brilliant explanation.

## Conclusion

Talk about dissemination of information, these dogs are cooked! And by dogs I mean fingers. Not that I have huge fingers or anything, just... are you calling me fat? Anywho, leave a comment if you have any questions or if you figure out some super awesome combination of transitions.

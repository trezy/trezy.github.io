# On Variables, Calculations, and New Units

**Disclaimer:** Alright, don't get too excited. This stuff isn't backwards-compatible **at all**. However, there are fallback solutions and it's pretty darn cool that it's actually being spec'd.

Web designers were begging for CSS to add variables and calculations for years before [LESS](http://sass-lang.com/">SASS</a> and <a href="http://lesscss.org/) came along, giving us the ability to use these shiny new toys to our heart's content. However, SASS and LESS output can sometimes bloat your CSS sheets and while it's pretty fun to play with, it's a pain to have to recompile your CSS after every change. Fortunately, the W3C has come in like the proverbial nanny and started giving them a spit shine to make them all fresh and new again.<!--more-->

## Variables

Mmmmmmmmm, variables. We've used them in almost every language but CSS... Until now. Admittedly, CSS variables are quite a long way off. They're still in a W3C Level 1 module so you won't be able to play with them for a while unless you want to get into the [Webkit nightly builds](http://nightly.webkit.org/). Still, it's fun to think about all of the amazing things we're going to be doing with them in a year...\r\n\r\nHere's what variables might look like in CSS3. Keep in mind that since it's still Level 1, it's subject to change. To declare a variable, you'll create it inside an element. All of the examples are declaring them in the `:root{}` using the `var` prefix like this:

```css
:root {
  var-mainColor:#0c0;
}
```

You can then call the variables later on in the code by using the `var()` syntax:

```css
p {
  background-color:var(mainColor);
}
```

My main use for this in CSS has been dealing with branding colors. I can set all of the branding colors in the top of the stylesheet and use the variables throughout code, like this:

```css
:root {
  var-primaryColor:#0d56a6;
  var-secondaryColor:#4186d3;
  var-tertiaryColor:#689ad3;
}

header {
  background-color:var(primaryColor);
}

header > nav {
  background-color:var(secondaryColor);
}

article {
  background-color:var(tertiaryColor);
}

button {
  background-image:
  linear-gradient(
    bottom,
    var(primaryColor) 0,
    var(secondaryColor) 50%,
    var(tertiaryColor) 100%
  );
}
```

From this point on if I want to change the color scheme I can just change the colors in my `:root` element and they'll change across the entire website! I do hope, however, that before the spec is released we get the ability to create full property set variables that work like SASS mixins. The ability to do something like this would be stupendous:

```css
var gradient(color1,color2,color3) {
  background-image:
  linear-gradient(
    bottom,
    var(color1) 0,
    var(color2) 50%,
    var(color3) 100%
  );
}

article{
  gradient(#0d56a6,#4186d3,#689ad3);
  border:1px solid #000;
}
```

[W3C Module](http://dev.w3.org/csswg/css-variables/)

## Calculations

Calculations are in a W3C Level 3 module, meaning they're pretty close to making it into the CSS3 full spec. If all goes well, we'll be able to consider them totally safe to use come next June. However, we can already play with them in the latest version of Chrome, Firefox, Opera, and Safari, as well as IE9/10.\r\n\r\nSo why are calculations so exciting? How about this horizontal centering:

```css
body {
  margin-left:calc(960px / -2)
  width:960px;
}
```

[MDN Page](http://dev.w3.org/csswg/css3-values/#calc-notation">W3C Module</a> | <a href="https://developer.mozilla.org/en-US/docs/CSS/calc)

## Units

There are some really snazzy new units coming with CSS3 but the ones I'm most excited about are `rem`, `vw`, `vh`, `vmin`, and `vmax`.

### rem

We're all aware of the `em` which we're encouraged to use for the sake of magnified page viewing. However, I've avoided them for quite sometime because they're a major pain in the ass to try to calculate. I don't like having to figure out what my em value is based on it's parent's calculated value which is based on it's parent's calculated value which is based on it's parent's calculated value which is... It just sucks. The `rem`, however, is here to save the day! The `rem` is similar to the `em` except that it's always relative to the em value of the root of the page. Take this code:

```css
:root {
  font-size:20px;
}

.box1 {
  font-size:2em;
}

.box1 > .box2 {
  font-size:2em;
}

.box3 {
  font-size:3rem;
}

.box3 > .box4 {
  font-size:1rem;
}
```

In this case, `.box2` will have a font-size of 80px (2em of 20px = 40px, then 2em of 2em of 20px = 80px) but `.box4` will have a font-size of 20px (`.box3` would be 3rem of 20px = 60px, `.box4` if 1rem of 20px = 20px). It's actually even more complicated than that, but this is the general way to figure everything up. `rem`s are much easier to use then `em`s, hands down.

### vw and vh

Even more awesome are the units that calculate based on the size of the viewport! `vw` and `vh` are percentages of the viewport width and height, respectivelty. Each `vw`/`vh` is 1% of the viewport size, so think about this:

```css
nav {
  width:100vw;
}

nav a {
  min-width:100px;
  width:20vw;
}
```

With this you can create a navbar with 5 elements that is always the same size as the viewport! The `min-width:;` also makes sure that the links will never be too small so you can stack them or turn them into a menu for super tiny screens.

### vmin and vmax

These guys are always relative to the larger or smaller size between the `vh` and `vw`. In other words, if the width of the viewport is smaller than the height (maybe its a smartphone in portrait mode) then the `vmin` will be relative to the width and the `vmax` will be relative to the height.

[W3C Module](http://www.w3.org/TR/css3-values/)

***Update:*** The spec for `calc()` and the units is at Level 3 now. Woot woot!

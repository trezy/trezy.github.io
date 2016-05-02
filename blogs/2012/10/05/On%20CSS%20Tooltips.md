Pure <abbr title="Cascading Style Sheets">CSS</abbr> tooltips have been a thing for a while now but all of the solutions I've found have had limitations. After reading through Louis Lazaris's article [Pure <abbr title="Cascading Style Sheets">CSS</abbr> Tool Tips Revisited](http://www.impressivewebs.com/pure-css-tool-tips/) over at [ImpressiveWebs](http://impressivewebs.com), I decided to make a few modifications of my own to his design.

<!--more-->

[Check Out the Demo](http://codepen.io/trezy/full/Khnzy)

## The Problem

Louis's design broke some of the boundaries but still had some limitations. These were my goals:

### Multiline

Louis makes the argument that tooltips are only supposed to contain a small amount of information, eliminating the need for multiline tooltips. I agree with him to an extent, but I still think there are cases in which you would want a multiline tooltip. In my example, I am creating an error message rather than your average tooltip. I wanted my first line to be only the error type, then all of the following lines would contain the error message.

### IE8 Compatible

This was a big one since the company I'm doing this project for requires it. Fortunately we only have to support IE8, Firefox, and Webkit. Keep in mind, however, that this also means I don't know how this code will react in IE7 and below.

### No Extra HTML

Some other pure <abbr title="Cascading Style Sheets">CSS</abbr> tooltip solutions use extra elements, like placeholder spans or divs. I wanted to be able to pull in all of the information I needed without any extra elements. I bend the extra HTML rule a little bit since we do use an element's attributes to populate the tooltip but I think I can still live with myself.

## The Solution

[codepen_embed slug_hash='Khnzy' user='trezy']

You probably noticed the custom **`data-`** attributes on the link. The `data-tooltip` attribute is binary, meaning it's either set or it's not, just like `required`. I'll be using jQuery to create and populate the other two attributes in the final project but for now we'll just use some bunk data.

### Pseudo-classes and Uncommon Attributes

***DISCLAIMER*** If you're here, you probably already know about most of this stuff. If so, skip to the next section.

Most pseudo-classes describe some state of an element, i.e. `:hover` applies when the element is being hovered, `:focus` applies to form elements that are in focus, `:disabled` applies to elements that are disabled, etc. However, `:before` and `:after` are a little different. They are used to prepend and append, respectively, content to  an element. For example you could use `.emailAddress:before` to append a label to the internal node of every element with a class of `emailAddress`.

You have probably seen most of this <abbr title="Cascading Style Sheets">CSS</abbr> before, though we're using a couple of pretty uncommon attributes. The `content` attribute only works with the `:before` and `:after` pseudo-classes. It determines what to prepend/append to the element. In this case we're using a pretty cool argument called `attr(x)`. It allows you to use the value from any attribute applied to the element as the content of the prepended/appended element. In our case we used the custom `data-` attributes we set earlier.

The `white-space` is another strange one. It's used to determine how white space (spaces and returns) should be handled inside of an element. We used `white-space:pre-wrap;` so that the spaces inside the `content` attribute would be preserved, specifically the **&#92;a` which is a Unicode carriage return, pretty much the only way to ensure that the line breaks where we want.

### Positioning

This was the most important point to allowing multiline tooltips. Some previous solutions have used percentage positioning, some used pixel positioning, but they all used the `top` and `left` attributes. However these always break if you have more than one line so they are often used with `white-space:nowrap;`.

Instead of positioning negatively based on the top position of the element like Louis did, I set the top position of the tooltip to zero so it would line up with the top of the element, then gave the tooltip a `margin-top`. In my example, I'm placing the tooltip on a link so I set the bottom margin to 1em, ensuring the margin would always be the same height as my text. This may need to be adjusted depending on your line-height.

If you're not positioning the tooltip on a line of text then you can also set your margin to match the height of a static height element, or use some jQuery magic to adjust it.

### Wrapping It Up

The rest of this code is pretty standard stuff. One other peculiar thing we're doing here is using the `:before` to create the arrow on the bottom of the tooltip. [Louis's article](http://www.impressivewebs.com/pure-css-tool-tips/] explains that part a bit and there are plenty of other tutorials on creating shapes using divs and borders so I won't cover that.

I've tested this in all of the necessary browsers (IE8+, Firefox, and Google Chrome) and haven't seen any issues yet. If you run into an issue or have a recommendation for making it even better, let me know in the comments! I'll do another tutorial in the future about how to make this guy extensible using jQuery. ;-)

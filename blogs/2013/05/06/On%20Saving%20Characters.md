# On Saving Characters

Recently I discovered something mind-blowing that I feel like I should have known for years.<!--more--> When I write my sans-serif font-family stack in my CSS file I normally use this:

```css
body {
  font-family: Ubuntu, Helvetica, Arial, sans-serif;
}
```

Ubuntu is one of my favorite fonts which I import from the Google Fonts CDN but you can replace it with whatever custom font you want. Since I prefer Helvetica over Arial, it's the next font on the list which I'm hoping they have pre-installed. If not the stack falls back to Arial, then the default sans-serif system font.

Now I've been writing my font stack this way for several years (sans the custom font) completely oblivious to the ridiculously obvious fact that half of the stack isn't necessary. The <code>sans-serif</code> piece of the stack asks for the system font which, by default, is Arial on Windows and Helvetica on Mac. If I'm not concerned about the user having changed their default system font, I can cut 16 characters (not including spaces) out of my font stack:

```css
body {
  font-family: Ubuntu, sans-serif;
}
```

When I realized this a couple days ago, I subjected myself to an hour of staring at terrible websites as punishment for my ignorance. After recuperating from the debacle I decided to take a closer look at my new font stack. The only issue I have with it is that I don't trust my Windows users to not have changed their default system font to <a href="http://bancomicsans.com/main/">Comic Sans</a> or <a href="http://trezy.com/blog/christmas-time-with-papyrus">Papyrus</a>. Fortunately, Windows will fallback to Arial if you declare Helvetica and it's not installed! When it's all said and done our font stack should like this:

```css
body {
  font-family: Ubuntu, Helvetica, sans-serif;
}
```

It's not a performance saver and it's not going to impress anybody - actually you'll look like an idiot if you admit to not having known this already - but it's a nice piece of info to have when writing your font-stacks.

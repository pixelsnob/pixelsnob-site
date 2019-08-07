---
title: About my Work
---

August 7, 2019

The web still holds a lot of promise. Browsers and languages adopt new features constantly, and more and more things are becoming possible, without resorting to hacks and frameworks. 

I still believe in the power of the open web. I hope to see the day when hundreds of frameworks are replaced by one, agreed-upon solution. There's no reason why the prevailing options need to come from huge, self-interested corporations. Technologies that tip the scale in favor of the everyday person -- these are the things that keep me interested in tech.

### Focus on speed

I focus on speed and responsiveness. You can build the nicest, most accessible, easy-to-use UI, but if it takes 10 seconds to load, you might as well spend your resources on other things. That's not just my opinion. According to <a href="https://pdfs.semanticscholar.org/e09f/f31852c87e19bf921a0e38565a901da61f5c.pdf" target="_blank">this 2003 study</a> (pdf), "10 seconds is about the limit for keeping the user’s attention focused on the dialogue."

I have years of experience using different approaches to make the UI experience as snappy and smooth as possible. They're not tricks, just sound, common-sense choices about design and technology, without going overboard on the latest or next "shiny thing".

### Holistic approach

Besides years of experience in technology, I have a multidisciplinary background that includes music, photography, and the arts. Although I'm not a trained designer, I have an eye for what looks good, and I know what things are realistically possible on the web right now.

I work hard to make sure what I build is supported on as many modern devices and browsers as possible, and is viewable by as wide an audience as possible. I also have experience supporting older devices and browsers such as IE 10, within reason. Content comes first. Well-structured, semantic markup has several positive side-effects, including better SEO placement, and easier maintenance/modifications.

### It's not just about code

I take code quality very seriously. But this is only a small part of building a good UI and a good system. I want to learn as much as possible about the people that will be using my code. This gives me a much better idea of what I will build and how I will build it.

### Case study: <a href="https://www.lapercussionrentals.com" target="_blank">Los Angeles Percussion Rentals</a>

#### What's your content???

One of the first things I try to figure out when someone asks me to build a website from scratch is "what content do you want to publish"? This is a simple question, but the answer is almost never simple. 

Before writing any code, the owners of LAPR and I had quite a few conversations about what they wanted, and we worked out a basic outline of content that included a products list of around 400 instruments. We worked out a scheme to categorize/tag these instruments, and then I wrote some scripts to  "scrape" data off of their old website, and into a database. This was a fun project for me, and I used the <a href="https://nodejs.org/en/" target="_blank">node.js</a> package <a href="https://github.com/jsdom/jsdom" target="_blank"> jsdom</a>, among other JavaScript tools, plus some DOM queries, to extract product data and images from their old static site. We then performed some cleanup on the data, and came up with a way to display and categorize products.

Next came the design part, which happened rather quickly, as we had decided that a clean, minimalist site, featuring their colorful photos, was a wise path to take. The designer came up with some great designs, and chose an awesome, clean font. We also wanted to make sure it was mobile-first or at least mobile-friendly, and we tested on as many physical devices as we could.

Technically, at the time, I did not feel like react was a good choice. I found that what I built with backbone.js was noticeably faster in the browser than my react solution. It could have been that react was still slow -- I know they have made many improvements since 2014! Or it could have been the way I was using it, although I don't think I was doing anything really exotic other than rendering components based on user input. Nonetheless, backbone.js was a sane choice at the time. I had to be careful to cleanup up event handlers, and not create undesirable closures. Yes, in 2019, I would not choose backbone.js, but would probably go with react+redux etc., or maybe web components with a data store like redux.

The back-end API was built using express.js, mongodb, and a templating language called jade that then had to change its name to pug. Fast, solid, easy to maintain.

<!-- At the same time this was going on, I was building a modal-based admin that my clients could use to manage their products. It's a typical "crud" system that's worked solidly through the years.  -->

Finally, we launched in October, about 9 months after we officially started the project. Obviously, I was not working on this the whole time. But there was a lot of back-and-forth that went on in the planning stages of building this site.

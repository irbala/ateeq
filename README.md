# Ateeq — Saudi Perfume Store (concept)

**Live site:** https://irbala.github.io/ateeq/

Ateeq is a concept store for a Saudi perfume brand, built as a front-end project. It is a design and code demo: there is no real payment or ordering, and "checkout" simply empties the cart and shows a thank-you message.

## Pages

| Page | What's on it |
|---|---|
| `index.html` | Cover photo, brand introduction and a link to the shop |
| `shop.html` | The three perfumes, each with an "add to cart" button |
| `cart.html` | The cart: change quantities, remove items, see the total, check out |
| `about.html` | Brand story, team and visual identity board |

## Features

- Arabic, right-to-left layout
- Shopping cart saved in the browser (`localStorage`), so it survives moving between pages
- Change quantities or remove items in the cart, with a live total
- Item count shown next to the cart link on every page
- Header that stays in view while scrolling on desktop
- Responsive: three products per row on desktop, two on tablets, one on phones

## Tech

HTML, CSS and plain JavaScript. No frameworks or build step.

- `styles.css` holds all the styles, with the brand colours as variables at the top
- `script.js` holds the cart logic

## Run it locally

Download or clone the repo and open `index.html` in a browser.

# Quotient

Link to GitHub: https://github.com/bryanchen24/Quotient

Link to Website (hosted by Vercel): https://quotient-kohl.vercel.app/

## Description

Quotient inspires users to take on their literary challenges. Sometimes, we blank on our writing, or we are simply feeling down and want some motivation/inspiration. With Quotient, look up any keyword or author, and you are presented with a plethora of quotes that hopefully will inspire you.

This is primarly for browser use, specifically Google Chrome. Other browsers may not be compatible with all of the features.

Link to [Developer Manual](#developer-manual)

## Developer Manual

#### Audience: For developers who would like to implement or work on a website that fetches and displays quotes.

#### Technical Terms

- CLI: Command Line Interface (this will be the terminal in your IDE)
- npm: node package manager

#### Knowledge Required

- HTML/CSS
- JavaScript
- ExpressJS
- NodeJS
- APIs

#### Start Website

To start the website, simply type 'npm start' in the terminal

#### Dependencies

- Supabase
- Body Parser
- Dotenv
- Express JS
- Nodejs (nodemon)

To install the dependencies, use the following command
npm install @supabase/supabase-js body-parser dotenv express nodemon

#### APIs and Libraries used

Supabase (https://supabase.com/)
Supabase POST requests

- app.post("/likeQuote"): when users like a quote, this gets the information of the quotes (quote_id, author, and quote itself), fetches supabase, inserts this into the "liked_quotes" table
- app.post("/saveQuote"): when user "saves" a quote, this gets the information of the quotes (quote_id, author, and quote itself), fetches supabase, inserts this into the "liked_quotes" table

Supabase GET requests

- app.get("/getQOTD"): returns the quote of the day (this is technically a random quote)
- app.get("/loadSaved"): returns the list of saved quotes from the database, and dislpays them on the Saved page
- app.get("/loadLiked"): returns the list of liked quotes from the database, and displays them on the Likes page

FavQs (https://favqs.com/api)

FavQs GET requests

- Get the quote of the day: https://favqs.com/api/qotd
- Get a quote by a keyword: https://favqs.com/api/quotes/?filter={keyword}
- Get a list of quotes: https://favqs.com/api/quotes/?page{page_number}
- app.get("/loadQuotes"): uses the 'https://favqs.com/api/quotes/?page{page_number}' endpoint from the FavQs API to fetch a a list of quotes, then return them and display them on the Home page

VantaJS (https://www.vantajs.com/)

- Used to add an animated background

SwiperJS (https://swiperjs.com/)

- Used to create the carousel for discovering quotes on the homepage

#### Bugs and Future Development

##### Bugs

Bug: Unable to search consecutively

Accomodation: When wanting to search again, click on the Home tab, and then search again

Bug: Unable to remove quotes from database (Liked or Saved)

Accomodation: Go into database (Supabase) and manually remove the quotes as to not have too many quotes saved at a time.

##### Future

Currently, the search function will simply hide the quote of the day and the quotes discovery, and just reveals the searched quotes (only limited to 10 quotes).

Next Step: Implement redirects to go to a dedicated search page to display all of the quotes. Additioanlly, display as many quotes as possible, and consider adding a button to load more quotes if needed.

The background for the About page is not fully filled. When changing the css to make the HTML have 100% height, this affects the other pages to not properly fill each background.

Next Step: Modify the background th be filled for each pages.

When using the search button, you are not able to search with another keyword after you are on the "search page". That is why the search bar is only on the Home page.

Next Step: Allow searches to be back to back without having to first go to the Home page to search again.

When liking and saving quotes, you can continue to press it even if it has already saved. This makes a request in the backend to save the quote, but since it is stored by the id, it must be unique and can't be added again.

Next Step: Toggle between liking/saving and unliking/unsavin respectively to prevent this from happening. Additionally, when the quotes are on their respective pages (likes or saved), show whether or not each quote was liked or saved rather than just one or the other.

There is no functionality to remove liked and saved quotes without having to go into Supabase.

Next Step: Implement a feature to like/save and unlike/unsave without having to go into Supabase. This will allow users to toggle bewteen their liked and saved quotes. Additionally, add some animations when it is liked/saved.

When there are a bunch of quotes added to the liked or saved pages, it can become a bit laggy and it also stretches the background.

Next Step: Create a background that is static, rather than moving with the scroll. This would also require changing the scales depending on the amount of content.

When moving to the liked or saved pages, there is a split second that the page doesn't fill up with the quotes and is not too pleasing to look at.

Next Step: Create a loading screen when moving to each of these pages or add a delay. Ideally, create a skeleton leading screen.

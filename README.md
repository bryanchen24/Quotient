# Quotient

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

FavQs (https://favqs.com/api)
GET requests

- Get the quote of the day: https://favqs.com/api/qotd
- Get a quote by a keyword: https://favqs.com/api/quotes/?filter={keyword}
- Get a list of quotes: https://favqs.com/api/quotes/?page{page_number}
  VantaJS (https://www.vantajs.com/)
  SwiperJS (https://swiperjs.com/)

# RPG Review Scraper

An app that scrapes the video gaming website GameSpot for its latest RPG reviews, then saves them to a database and displays all of the reviews previously saved in that database to the user.

## How to Use This App

* Whenever the page is loaded, the app will automatically scrape the most RPG reviews from the GameSpot website and save them to its database.

* That said, in its current iteration, the App will display only those reviews that had already been saved in its database prior to scraping.

* To view all the reviews, including those which have just been scraped, you must reload the page.

* This can be accomplished by clicking on either the RPG Review Scraper logo on the left side of the navbar or the "Home" link situated immediately to its right.

* To view and/or write comments on one of the scraped reviews, simply click on its corresponding "Comments" button on the right side of the screen. A modal will appear, displaying any previous users' comments, should there be any, and allowing you to add your own.

## Bugs

* Currently, the results of the second find() in the route that renders the HTML come back before the insertMany() has finished inputting the new Review documents into the database. As such, it's necessary to load the page a second time to actually see any reviews that have been newly added.

* Currently, the function that's supposed to update the modal that displays comments after the creation of a new comment or deletion of an old one works after a comment has been created but doesn't function after a comment has been deleted.

## Plans for Future Development

* Add more review sources -- this is why the GameSpot logo appears above the titles of the reviews instead of, for instance, in the navbar. The idea is that the logo of whatever site a particular review was scraped from would appear above its title.

* Add an input field and button for searching the database on the right side of the navbar, next to (or in place of) the button for clearing all reviews out of it. Ideally, this would allow the user to search both by review source and title.

* Make the app media-responsive.

* Replace the image under the navbar with a carousel that displays images from various classic RPGs, one after another.

## Technologies Used

* HTML/CSS

* Bootstrap 4

* jQuery

* Node.js

* Express.js

* Handlebars.js

* Axios

* Cheerio

* MongoDB

* Mongoose

## Author

Antonio de las Morenas -- responsible for designing and coding the entire app
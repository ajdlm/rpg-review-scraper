# RPG Review Scraper

An app that scrapes the video gaming website GameSpot for its latest RPG reviews, saves them to a database, and displays them to the user.

Deployed app at https://rpg-review-scraper.herokuapp.com/.

## How to Use This App

* To scrape the most recent RPG reviews from the GameSpot website and save them to the database, click on the "Scrape New Reviews" button that appears in the navbar on the "Home" page.

* To clear all unsaved reviews from the database, click on the "Clear Unsaved Reviews" button that appears immediately to the right of the "Scrape New Reviews" button.

* To save a review so that it will not be cleared, click on its corresponding "Save Review" button.

* Doing this will move it to the "Saved Reviews" page, which may be accessed through its link in the navbar.

* The "Home" page will automatically display all unsaved reviews in the database, while the "Saved Reviews" page will display all saved reviews.

* While saved reviews cannot be deleted en masse like unsaved ones can, they can be deleted individually by clicking on their respective "Delete Review" buttons.

* You may also comment on them by clicking on the "Comments" buttons located immediately above or next to the "Delete Review" buttons. (Their positions change depending on viewport width.)

* This will bring up a modal with two input fields at the bottom of it -- one for the user's name, and one for their comment. By entering text into both of these fields and clicking on the submit button, one can add a comment onto a review.

* Both fields must contain text or the comment will not go through.

* Any comments previously posted on the review will also appear in the modal.

* An existing comment can be deleted by clicking on its corresponding "Delete" button on the right side of the modal.

## Plans for Future Development

Add more review sources -- this is why the GameSpot logo appears above the titles of the reviews instead of, for instance, in the navbar. The idea is that the logo of whatever site a particular review was scraped from would appear above its title.

It should be noted that this is also why the reviewSummary property of the app's Review model/objects still exists in the code despite the fact that no review summaries appear on the website. This is because while GameSpot has removed review summaries from its search results page, other publications that might be added in future iterations of the app may still include such a feature.

## Technologies Used

* HTML/CSS

* Bootstrap 4

* JavaScript

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
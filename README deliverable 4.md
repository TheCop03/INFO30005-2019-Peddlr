# INFO30003-2019-Peddlr

## Installation
`npm install` to get all dependencies

## Startup
`nodemon app`



## Create listing functionality
This functionality allows users to create listings. There is a "create listing" button on the homepage which takes them to the create listing page. Here they enter information about the listing; its title, the category it belongs to, the rental price and time period, a description of the listing, upload a photo, and the listings location. Once submitted, a new entry is made in the db under listings.

url: http://localhost:3000/createlisting
routes: router.get('/createListing', controller.showCreateListing);  router.post('/newListing', controller.createListing);
controllers: showCreateListing createListing
views: createlisting.pug
models: listing.js

## View by Categories page
This function allows the user to view all the listings in one category. For example, if they wanted to see all the vehicles that are listed for rent on the platform, they would click on the vehicles category on then homepage and be taken to a page which displays a list of all the vehicles available.
url: http://localhost:3000/listing/category/:category
views: category.pug
routes: router.get('/listing/category/:category', controller.showListingsByCategory);
controllers: showListingsByCategory
models: category.js

## Listing page
This function allows the user to see the listing by itself on a page. The page displays information about the listing, including the photo at a larger resolution, the listings location, and its description.

url: http://localhost:3000/createlisting
views: listing.js
routes: router.get('/createListing', controller.showCreateListing);
controllers: showCreateListing, createListing
models: listing.js






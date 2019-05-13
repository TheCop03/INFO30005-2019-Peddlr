# INFO30003-2019-Peddlr

## Installation
`npm install` to get all dependencies

## Startup
`nodemon app`

## Sign Up User
This function allows users to sign up to the website and create an account for them to post and rent items. The sign up function can be accessed directly through the homepage header alongside the login button. The user must input the necessary details and submit their information. They will then be redirected to a 'logged in' version of the homepage. 

<br/>url: http://localhost:3000/signup;
<br/>routes: '/newUser'
<br/>controllers: createUser
<br/>views: signup.pug;
<br/>models: users.js;


## Create listing functionality
This functionality allows users to post their items for rent to the public. This is done through the create listing button on the homepage which redirects users to the 'create listing' page whereby they can enter the necessary information about their item. The user must input the item name, the category it belongs to, the rental price and interval for which the item can be rented out for, a description of the item and it's quality, upload a photo, and the listings location. Once submitted, a new entry is made in the db under listings.

<br/>url: http://localhost:3000/createlisting;
<br/>routes: '/createListing', '/newListing'
<br/>controllers: showCreateListing createListing;
<br/>views: createlisting.pug;
<br/>models: listing.js;

## View by Categories page
This function allows the user to view all the listings in one category. For example, if they wanted to see all the vehicles that are listed for rent on the platform, they would click on the vehicles category on then homepage and be taken to a page which displays a list of all the vehicles available.

<br/>url: http://localhost:3000/listing/category/:category
<br/>views: category.pug
<br/>routes: '/listing/category/:category'
<br/>controllers: showListingsByCategory
<br/>models: category.js

## Listing page
This function allows the user to see the listing by itself on a page. The page displays information about the listing, including the photo at a larger resolution, the listings location, and its description.

<br/>url: http://localhost:3000/createlisting
<br/>views: listing.js
<br/>routes: router.get('/createListing', controller.showCreateListing);
<br/>controllers: showCreateListing, createListing
<br/>models: listing.js






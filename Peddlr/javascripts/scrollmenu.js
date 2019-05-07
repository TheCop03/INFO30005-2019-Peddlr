var scrollDuration = 300;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = document.getElementsByClassName("item").length;
var itemSize = document.getElementsByClassName("item").outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;

// get wrapper width
var getMenuWrapperSize = function() {
    return document.getElementsByClassName("menu-wrapper").outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function() {
    menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function() {
    return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function() {
    return document.getElementsByClassName("menu").scrollLeft();
};

// finally, what happens when we are actually scrolling the menu
document.getElementsByClassName("menu").on('scroll', function() {

    // get how much of menu is invisible
    menuInvisibleSize = menuSize - menuWrapperSize;
    // get how much have we scrolled so far
    var menuPosition = getMenuPosition();

    var menuEndOffset = menuInvisibleSize - paddleMargin;

    // show & hide the paddles
    // depending on scroll position
    if (menuPosition <= paddleMargin) {
        document.getElementById("leftPaddle").addClass('hidden');
        document.getElementById("rightPaddle").removeClass('hidden');
    } else if (menuPosition < menuEndOffset) {
        // show both paddles in the middle
        document.getElementById("leftPaddle").removeClass('hidden');
        document.getElementById("rightPaddle").removeClass('hidden');
    } else if (menuPosition >= menuEndOffset) {
        document.getElementById("leftPaddle").removeClass('hidden');
        document.getElementById("rightPaddle").addClass('hidden');
    }


});

// scroll to left
document.getElementById("rightPaddle").on('click', function() {
    document.getElementsByClassName("menu").animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
});

// scroll to right
document.getElementById("leftPaddle").on('click', function() {
    document.getElementsByClassName("menu").animate( { scrollRight: '0' }, scrollDuration);
});
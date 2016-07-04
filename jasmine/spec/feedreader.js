/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a url defined and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                var feed = allFeeds[i];

                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name defined and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                var feed = allFeeds[i];

                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when the nemu icon is clicked', function() {
            var icon = $('.icon-list');
            expect(icon).toBeDefined();

            icon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            icon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures clicking a link in the
         * FeedList hides the menu.
         */
        it('is hidden after clicking a link in the FeedList', function() {
            $('.icon-list').trigger('click');

            var firstFeed = $('.feed-list a:first');
            expect(firstFeed).toBeDefined();

            $('.feed-list a:first').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container
         * and the element has an address and a title
         * and they both are not empty.
         */
        beforeEach(function(done) {
            google.load('feeds', '1');
            google.setOnLoadCallback(loadFeed(0, done));
        });

        it('has at least a single element with an address and a title', function(done) {
            var firstEntry = $('.entry-link:first');
            expect(firstEntry).toBeDefined();

            var firstEntryLink = firstEntry.attr('href');
            expect(firstEntryLink).toBeDefined();
            expect(firstEntryLink.length).toBeGreaterThan(0);

            var firstEntryTitle = firstEntry.find('h2');
            expect(firstEntryTitle).toBeDefined();
            expect(firstEntryTitle.text().length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var firstFeed_firstEntryLink, secondFeed_firstEntryLink;

        beforeAll(function(done) {
            google.load('feeds', '1');
            google.setOnLoadCallback(loadFeed(0, done));
        });

        beforeEach(function(done) {
            firstFeed_firstEntryLink = $('.entry-link:first').attr('href');

            google.setOnLoadCallback(loadFeed(1, done));
        });

        it('change page content', function(done) {
            secondFeed_firstEntryLink = $('.entry-link:first').attr('href');

            expect(secondFeed_firstEntryLink).not.toBe(firstFeed_firstEntryLink);
            done();
        });
    });
}());

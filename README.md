# Quotes on Dev Starter

A WordPress starter theme for the Quotes on Dev project, forked from Underscores.

## Installation

### 1. Download me (don't clone me!)

Then add me to your `wp-content/themes` directory.

### 2. Rename the `quotesondev-starter-master` directory

Make sure that the theme directory name is project appropriate! Do you need `starter` or `master` in the directory name?

### 3. Install the dev dependencies

Next you'll need to run `npm install` **inside your theme directory** to install the npm packages you'll need for Gulp, etc.

### 4. Update the proxy in `gulpfile.js`

Lastly, be sure to update your `gulpfile.js` with the appropriate URL for the Browsersync proxy (so change `localhost[:port-here]/[your-dir-name-here]` to the appropriate localhost URL).

And now would be a good time to `git init` :)

# Project-05

Personal Learnings: 

## JS
- setting up the ajax requests were very similar to Instanews
- creating a const variable for the source URL makes the sources dynamic.
- the popstate function is another way of seeing the url slug change as the previous pages load.

## PHP 
- ( 'template-parts/content', 'search' ) means that this template is from the template file called template-search.php
- using wp enqueueu style to upload font awesome icons 
- in page-archives.php, the line <?php 
                wp_tag_cloud(
                    array(
                    'smallest' => 1,
                    'largest' => 1,
                    'unit' => 'rem',
                    'format' => 'list'
                    ));
                ?>
                demonstrated that the keys smallest and largest indicate the size of the tag names.


## CSS 
- using before and after properties to load up font awesome icons
- mandatory to add font awesome as a font family in order to load
- when a styling isnt being added to the browser, it is most likely being over ridden in a different scss file. This taught me to be more familiar with all the scss files in the future when working on a project.




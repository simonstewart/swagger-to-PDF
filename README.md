# swagger-to-PDF

## Purpose

Creates html or PDF from a Swagger JSON file.

## How to use

### command line usage:

    npm install
    node ./index.js "path to your Swagger.json file"

or add the `html` parameter for html format:

    node ./index.js "path to your Swagger.json file" html

Also supports combining several Swagger JSON files into 1 output file:

    node ./index.js "file1.json,file2.json,file3.json"

### in-app integration:

Swagger-to-PDF supports calling the functionality from within your own node application:

    npm install swagger-to-pdf
    npm install phantom-html2pdf

Then, in your code:

    const swaggerConverter = require('swagger-to-pdf').converter;

    const swaggerJSON = JSON.parse(fs.readFileSync(filename.trim(), 'utf8'));
    // Optional: pass in custom CSS overrides
    const customCss = fs.readFileSync(cssFilename.trim(), 'utf8'));
    const html = converter.convertTopdf(swaggerJSON.document || swaggerJSON, customCss);

## Changes since v1.0.0

-   Automatic chapter # generation
-   Updated API to enable integration in other apps
-   Re-organization and modularization of code
-   Added option to obtain (intermediate) html result
-   Added option to include custom CSS
-   Added generation of bookmark links for TOC
-   Introduction of ES6 syntax

## Future

These are the current plans:

-   Cleanup Code

    -   Replace consecutive `html +=` assignments
    -   Remove inline styling by smarter css
    -   Convert string html to JSX

-   Unit testing
-   Additional options for mark up

## Dependencies

-   phantom-html2pdf

## Contribution

If you've got value out of this and have ideas, please send pull requests.

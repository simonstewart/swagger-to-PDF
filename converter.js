const htmlBuilder = require('./htmlBuilder');
function convertToHtml(swaggerJson, cssOverrides) {
    return `<html>
            ${htmlBuilder.getStyling(cssOverrides)}    
            <body>
            ${htmlBuilder.getTitlePage(swaggerJson)}
            ${htmlBuilder.getIntroduction(swaggerJson)}
            ${htmlBuilder.getTableOfContent(swaggerJson)}
            ${htmlBuilder.getPathSpecifications(swaggerJson)}
            ${htmlBuilder.getTypeDefinitions(swaggerJson)}
            </body>
            </html>`;
}

module.exports = {
    convertToHtml
};

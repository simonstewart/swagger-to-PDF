const fs = require('fs');
const converter = require('./converter');

function convertToHtml(jsonFileList) {
    const splitJSONFiles = jsonFileList.split(',');
    const html = splitJSONFiles
        .map(filename => {
            const swaggerJSON = JSON.parse(fs.readFileSync(filename.trim(), 'utf8'));
            return converter.convertToHtml(swaggerJSON.document || swaggerJSON);
        })
        .join("<div style='page-break-after:always' />");

    const htmlFileName =
        splitJSONFiles.length === 1
            ? splitJSONFiles[0].substr(0, splitJSONFiles[0].lastIndexOf('.')) + '.html'
            : './output.html';

    fs.writeFile(htmlFileName, html, err => {
        if (err) {
            console.log('err:' + err);
        }
        else {
            console.log('Done writing ' + htmlFileName);
        };
    });
}

function convertToPdf(jsonFileList) {
    const splitJSONFiles = jsonFileList.split(',');
    const html = splitJSONFiles
        .map(filename => {
            const swaggerJSON = JSON.parse(fs.readFileSync(filename.trim(), 'utf8'));
            return converter.convertToHtml(swaggerJSON.document || swaggerJSON);
        })
        .join("<div style='page-break-after:always' />");

    const pdfFileName =
        splitJSONFiles.length === 1
            ? splitJSONFiles[0].substr(0, splitJSONFiles[0].lastIndexOf('.')) + '.pdf'
            : './output.pdf';

            let config = {
                css = './normalize.css',
                html
            };

            pdf.convert(config, function(err, result) {
                if (err) console.log('err:' + err);
                else {
                    /* Using a buffer and callback */
                    result.toBuffer(function(returnedBuffer) {
                        console.log('return buffer');
                    });

                    /* Using a readable stream */
                    var stream = result.toStream();

                    /* Using the temp file path */
                    var tmpPath = result.getTmpPath();

                    /* Using the file writer and callback */
                    result.toFile(pdfFileName, function(err) {
                        if (err) {
                            console.log('err:' + err);
                        }
                        else {
                            console.log('Done writing ' + pdfFileName);
                        };
                    });
                }
            });
}

module.exports = {
    convertToHtml,
    convertToPdf,
    converter
};

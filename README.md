# swagger-to-PDF
## Purpose
Creates a PDF from a Swagger JSON or YAML file.

## How to use
    npm install
    node index.js "path to your Swagger.json file"
    or node index.js "path to your Swagger.yaml file"

Also supports combining several Swagger JSON or YAML files into 1 output PDF:
node index.js "file1.json,file2.json,file3.json" or node index.js "file1.yaml,file2.yaml,file3.yaml"

## Future
These are the current plans:
* code clean up
* further testing
* DONE combining several JSON files into 1 output
* additional options for mark up

## Dependencies
* phantom-html2pdf

## Contribution
If you've got value out of this and have ideas, please send pull requests.
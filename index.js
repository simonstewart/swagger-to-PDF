var
    fs = require('fs'),
    pdf = require('phantom-html2pdf');
    yaml = require('yamljs');



// consts
var
    FONT_STYLE = 'font-family: "Helvetica Neue",Trebuchet MS, sans-serif;font-size: 12px;color: #444';
ALTERNATE_ROW_STYLE = ";background-color: #EAEAEA";

var inputFileList
var inputFileListLen;
var swaggerJSON;
var html = '';
var inputFile;
var fileName = "test.html";
var createFileTitlePage = true;
var swaggerConverter = {};
inputFileList = process.argv.slice(2);


console.dir(inputFileList);
var splitInputFiles = inputFileList[0].split(',')
var config = {};

try{
	config = JSON.parse(fs.readFileSync(".config"));
	config.html = fileName;
} catch (err){
	console.log(err);
}
config.html = fileName;
config.css = "./normalize.css";

console.log(config);

if (splitInputFiles.length > 1) //Skip singular file load if list parameter is present
{
    console.log("more than one");

    inputFileListLen = splitInputFiles.length - 1;
    for (var iSplit = 0; iSplit <= inputFileListLen; iSplit++) {
        if (splitInputFiles[iSplit].split('.').pop() == "yaml") {
            swaggerJSON = yaml.load(splitInputFiles[iSplit].trim());
        } else {
            swaggerJSON = JSON.parse(fs.readFileSync(splitInputFiles[iSplit].trim(), 'utf8'));
        }
        html += convertToHTML(swaggerJSON);
        createFileTitlePage = false;
        html += "<div style='page-break-after:always'></div>"; //page break for next json file's html
    }
    console.log('About to write out multiple files!');
    writeOutFiles(html, fileName);
} else {
    console.log("one");

    createFileTitlePage = false;
    inputFile = inputFileList[0].split(',')[0];
    if (inputFile.split('.').pop() == "yaml") {
        swaggerJSON = yaml.load(inputFile);
    } else {
        swaggerJSON = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    }
    html = convertToHTML(swaggerJSON);
    writeOutFiles(html, fileName);
}

    

var sub1Counter=1; //counters for sub heading items
var sub2Counter=1;
var sub3Counter=1;
var main1Counter=1;//counters for main headings now, needed a var to auto adjust when a section is headed because it's empty so counters
//needed adjusting depending on the swagger JSON
var main2Counter=2;
var main3Counter=3
// output file


function writeOutFiles(htmlInput,fileName)
{
    // remove output file if exists
    if(fs.existsSync(fileName))
        fs.unlinkSync(fileName);
    // write output HTML file, then convert to PDF
    fs.writeFile(fileName, htmlInput, function(err){
        if(err)
            console.log("FAILED:" + err);
        else{
            console.log("done");
            //normalize.css helps with empty pages on the end of the pdf and renders the html more consistently # http://necolas.github.io/normalize.css/
            pdf.convert(config, function(err, result) {
                if(err)    
                    console.log("err:" + err);
				else{

					/* Using a buffer and callback */
					result.toBuffer(function(returnedBuffer) {
					    console.log("return buffer");
					});

					/* Using a readable stream */
					var stream = result.toStream();

					/* Using the temp file path */
					var tmpPath = result.getTmpPath();

					/* Using the file writer and callback */
					result.toFile("./output.pdf", function(err) {
						if(err)    
							console.log("err:" + err);
						else
							console.log("really done ...");

					});
				};
                
            });

        }

    });
}



function convertToHTML(swaggerJSON){

    var html = '';
    var genDate = new Date();
    html += "<html>"
    html += "<style>";
    html += "body {" +FONT_STYLE+"};";
    html += "p {" +FONT_STYLE+"};";
    html += "bs-callout {"
    html += "padding: 20px;";
    html += "margin: 20px 0;";
    html += "border: 1px solid #eee;";
    html += "border-left-width: 5px;";
    html += "border-radius: 3px;";
    html += "}";
    html += ".small-heading {";
    html += "font-weight: bold;";
    html += "}";
    html += ".div-container-heading-summ {";
    html += "margin-left: 20px;";
    html += "}";
    html += ".subheading-text {";
    html += "font-size: 98%;";
    html += "color: #555;";
    html += "}";
    html += ".th-heading {";
    html += "width:30%;";
    html += "text-align:left;";
    html += "}";
    html += ".th-heading-small {";
    html += "width:10%;";
    html += "text-align:left;";
    html += "}";
    html += ".table-margin {";
    html += "width:100%;";
	html += "font-size:100%;";
    html += "margin-top:0px;";
    html += "}";
    html += ".table-std {";
    html += "width:100%;";
    html += "}";
    html += ".div-container-margin {";
    html += "margin-left:21px;";
    html += "margin-right:51px;";
    html += "}";
    html += ".td-alignment-small {";
    html += "vertical-align:top;";
    html += "width:20%;"
    html += "}";
    html += ".td-alignment-std {";
    html += "vertical-align:top;";
    html += "width:80%;"
    html += "}";
    html += ".td-alignment-small-no-width {";
    html += "vertical-align:top;";
    html += "}";
    html += ".td-alignment-std-no-width {";
    html += "vertical-align:top;";
    html += "}";
    html += "pre.get {";
    html += "background-color: #0f6ab4;";
    html += "}";
    html += "pre.post {";
    html += "background-color: #10a54a;";
    html += "}";
    html += "pre.put {";
    html += "background-color: #c5862b;";
    html += "}";
    html += "pre.delete {";
    html += "background-color: #a41e22;";
    html += "}";
    html += "pre {";
    html += "padding: 10px;";
    html += "margin-bottom: 2px;";
    html += "color:#FFF;";
    html += "font-size:100%;";
    html += "}";
    html += "td {";
    html += "padding-top:4px;";
    html += "padding-bottom:4px;";
    html += "padding-right:4px;";
    html += "padding-left:4px;";
    html += "}";
    html += ".page {";
    html += "page-break-after:always;";
    html += "position: fixed;";
    html += "}";
    html += ".centerAlign {";
    html += "text-align:center";
    html += "}";
    html += ".coverHeadings {";
    html += "color: #0f6ab4";
    html += "}";
    html += "@media print{.footer {position:relative;top:-50px;height:10px;text-align:center;}}";
    html += ".moddedHR {";
    html += "border: none;";
    html += "height: 2px;";
    html += "color: #0f6ab4;";
    html += "background-color: #0f6ab4;";
    html += "}";
    html += "list[type=bullet] item description:before{";
	html += "content:\"\\a\";";
	html += "white-space:pre;";
    html += "}";
    html += "</style>";
    html += "<body>"

    if(createFileTitlePage)
    {
        createFileTitlePage=false;
        /*html += '<div class="coverHeadings"><h1>Swagger files used</h1></div>';
        html += '<div class="small-heading"><h3>File names</h3></div>';*/
        var titlesHtml='';
        //var swaggerTitleJSON;
        for(var iSplit2 = 0;iSplit2 <= jsonFileListLen;iSplit2++)
        {
            swaggerTitleJSON = JSON.parse(fs.readFileSync(splitJSONFiles[iSplit2].trim(), 'utf8'));
            //html += "<div>"+splitJSONFiles[iSplit2].trim()+"</div><br>";
            titlesHtml += "<div>"+swaggerTitleJSON.info.title+"</div><br>";
        }
        html += '<h1>API Documentation for:</h1>';
        html += titlesHtml;
        html += "<div style='page-break-after:always'></div>";
    }

    html += '<div class="coverHeadings"><h1>Introduction</h1></div>';
    
    html += headerSummary(swaggerJSON);
 
    html += "<div style='page-break-after:always'></div>";
    html += "<div style='page-break-after:always'><div class='footer'>Generated on: " +genDate +"</div>";

    html += tableOfContents(swaggerJSON);
    html += "<div style='page-break-after:always'></div>";
    html +="</div>"; //END of second page breaker;
    html += "<div style='page-break-after:always'></div>";

  

    if(typeof(swaggerJSON.definitions) !=='undefined')
    {
        // definitions
        var defLenCheck=0;
        for(var dfn in swaggerJSON.definitions) {
            defLenCheck=1;
        }
        if(defLenCheck ===1)
        {
            html += '<h2>1. Definitions</h2>';
        }
        sub1Counter=1;
        for(var dfn in swaggerJSON.definitions) {
            // eg: Product (uber)
            html += '<div class="div-container-margin">'; // definitions start
            html += "<h3>1." +sub1Counter + ". " + dfn + "</h3>";
            html += "<hr />";
            html += renderDefinition(false, dfn, swaggerJSON.definitions);
            html += "<br />";
            html += '</div>'; // definitions start
            sub1Counter++;
        }
        if(defLenCheck ===1)
        {
            html += "<div style='page-break-after:always'></div>"; 
        }

    }

    if(typeof(swaggerJSON.securityDefinitions !=='undefined'))
    {
        html += renderSecurityDefinitions(swaggerJSON.securityDefinitions);
    }

    // paths
    var pathCounter=0;
    main3Counter = swaggerContentCheck(swaggerJSON, 'paths');
    sub3Counter=main3Counter;
        
    html += '<h2>'+main3Counter+'. Paths</h2>';


    for(var path in swaggerJSON.paths){
        
       // if(loopBreaker===2){break;};
       if(pathCounter===0)
       {
            html += '<div class="div-container-margin">';
       }
       else
       {
             html += '<div>';
       }

        // verbs for path
        for(var action in swaggerJSON.paths[path]){
            
            switch(action)
            {
                case "get":
                    html+='<pre class="get"><code class="huge"><span>'+main3Counter +'.' + sub3Counter +' get</span>&nbsp;&nbsp;'+path+'</code></pre>';
                    break; 
                case "post":
                    html+='<pre class="post"><code class="huge"><span>'+main3Counter +'.' + sub3Counter +' post</span>&nbsp;&nbsp;'+path+'</code></pre>';
                    break;
                case "put":
                    html+='<pre class="put"><code class="huge"><span>'+main3Counter +'.' + sub3Counter +' put</span>&nbsp;&nbsp;'+path+'</code></pre>';
                    break;
                case "delete":
                    html+='<pre class="delete"><code class="huge"><span>'+main3Counter +'.' + sub3Counter +' delete</span>&nbsp;&nbsp;'+path+'</code></pre>';
                    break;
            }

            html += '<div>'; // path start
            html += "<table class='table-margin'>";

            // summary
            html += "    <tr>";
            html += "           <td class='td-alignment-small'><b>Summary</b></td>";
            html += "           <td class='td-alignment-std'>" + (typeof(swaggerJSON.paths[path][action].summary) !== "undefined"?swaggerJSON.paths[path][action].summary:"") + "</td>";
            html += "    </tr>";
            

            // description
            html += "    <tr style='" + ALTERNATE_ROW_STYLE + "'>";
            html += "           <td class='td-alignment-small'><b>Description</b></td>";
            html += "           <td class='td-alignment-std'>" + (typeof(swaggerJSON.paths[path][action].description) !== "undefined"?swaggerJSON.paths[path][action].description:"") + "</td>";
            html += "    </tr>";
            
            // operationId
            html += "    <tr>";
            html += "           <td class='td-alignment-small'><b>Operation Id</b></td>";
            html += "           <td class='td-alignment-std'>" + (typeof(swaggerJSON.paths[path][action].operationId) !== "undefined"?swaggerJSON.paths[path][action].operationId:"") + "</td>";
            html += "    </tr>";

            // action produces
            html += "    <tr style='" + ALTERNATE_ROW_STYLE + "'>";
            html += "           <td class='td-alignment-small'><b>Produces</b></td>";
            html += "           <td class='td-alignment-std'>" +(typeof(swaggerJSON.paths[path][action].produces) !== "undefined"?swaggerJSON.paths[path][action].produces.join(' '):"") + "</td>";
            html += "    </tr>";

            // action consumes
            html += "    <tr>";
            html += "           <td class='td-alignment-small'><b>Consumes</b></td>";
            html += "           <td class='td-alignment-std'>" + (typeof(swaggerJSON.paths[path][action].consumes) !== "undefined"?swaggerJSON.paths[path][action].consumes.join(' '):"") + "</td>";
            html += "    </tr>";

            // action params
            html += "    <tr>";
            html += "           <td class='td-alignment-small'><b>Parameters</b></td>";
            html += "           <td class='td-alignment-std' style='padding-left:0px!important;margin-left:0px!important'>";

            if(typeof swaggerJSON.paths[path][action].parameters !== "undefined") {
                html += "<table class='table-margin'>";
                html += "   <thead>";    
                html += "     <tr>";
                html += "       <td class='small-heading'>Name</td>";
                html += "       <td class='small-heading'>In</td>";
                html += "       <td class='small-heading'>Description</td>";
                html += "       <td class='small-heading'>Required</td>";
                html += "       <td class='small-heading'>Type</td>";
                html += "       <td class='small-heading'>Format</td>";
                html += "       <td class='small-heading'>Collection Format</td>";
                html += "       <td class='small-heading'>Default</td>";
                html += "       <td class='small-heading'>Min</td>";
                html += "       <td class='small-heading'>Max</td>";
                html += "    </tr>";
                html += "   </thead>";    

                html += "   <tbody>";    
                for (var paramIndex = 0; paramIndex < swaggerJSON.paths[path][action].parameters.length; paramIndex++) {

                    var rowStyle = "";
                    if(paramIndex % 2 == 0)
                    {
                        rowStyle = ALTERNATE_ROW_STYLE;
                    }
                    html += "   <tr style='" + rowStyle + "'>";
                    var param = swaggerJSON.paths[path][action].parameters[paramIndex];

                    // name
                    html += "       <td class='td-alignment-small-no-width'>" + param.name + "</td>";

                    // in
                    html += "       <td class='td-alignment-small-no-width'>" + param.in + "</td>";

                    // description
                    var paramDescription = param.description;
                    if(typeof param.schema !== "undefined" && typeof param.schema["$ref"] !== "undefined"){
                        var dfn = param.schema["$ref"].split('/');
                        paramDescription += "<br />" + renderDefinition(true, dfn[dfn.length-1] , swaggerJSON.definitions);
                    }
					if  (!paramDescription){
						paramDescription = "&nbsp;";
					}
                    html += "       <td class='td-alignment-small-no-width'>" + paramDescription + "</td>";

                    // required
                    html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.required !== "undefined") ? (param.required==true?"Yes":"No") : "No")  + "</td>";

                    // type
                    if(param.type == "array" && param.items!=null && param.items.type!=null){
                        html += "       <td class='td-alignment-small-no-width'>" + "array of " + param.items.type + "</td>";
                    }
                    else{
                        html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.type !== "undefined") ? param.type : "") + "</td>";
                    }

                    // format
                    html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.format !== "undefined") ? param.format : "") + "</td>";

                    // collection format
                    html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.collectionFormat !== "undefined") ? param.collectionFormat : "") + "</td>";

                    // default
                    html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.default !== "undefined") ? param.default : "") + "</td>";

                    // minimum
                    html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.minimum !== "undefined") ? param.minimum : "") + "</td>";

                    // maximum
                    html += "       <td class='td-alignment-small-no-width'>" + ((typeof param.maximum !== "undefined") ? param.maximum : "") + "</td>";
                    html += "   </tr>";
                    
                }
                html += "   </tbody>";    
                html += "   </table>";

           }
           else{
               html += "<p>" + "no parameters" + "</p>";
            }

            // tags
            if(typeof swaggerJSON.paths[path][action].tags !== "undefined") {

                html += "    <tr>";
                html += "           <td class='td-alignment-small'><b>Tags</b></td>";
                html += "           <td class='td-alignment-std' style='padding-left:6px'>" + swaggerJSON.paths[path][action].tags.join(' ') + "</td>";
                html += "    </tr>";

            }
            else{
                // no tags
            }

            
            // action security 
            if(typeof swaggerJSON.paths[path][action].security !== "undefined") {

                    html += "<tr>";
                    html += "<td class='td-alignment-small'><b>Security</b></td>";
                    html += "<td class='td-alignment-std' style='padding-left:0px!important;margin-left:0px!important'>";

                    // response schema start
                    html += "<table class='table-margin' style='width:42%'>";

                    html += "   <tr>";
                      for (var securityIndex = 0; securityIndex < swaggerJSON.paths[path][action].security.length; securityIndex++) {
                            
                            var security = swaggerJSON.paths[path][action].security[securityIndex];
                            var iSec=0;
                            for(var securityItem in security){
                              html += "<td class='td-alignment-small'><b>" + securityItem + "</b> (" + swaggerJSON.paths[path][action].security[securityIndex][securityItem].join(', ') + ")" + "</td>";

                            };
                        };
                    html += "       </td>";
                    html += "   </tr>";
                    html += "   </table>";
            }
            else{
                // no security
            }
         
            // action responses
            html += "      <tr>";
            html += "           <td class='td-alignment-small'><b>Responses</b></td>";
            html += "           <td class='td-alignment-std' style='padding-left:0px!important;margin-left:0px!important'>";

            // response schema start
            html += "<table class='table-margin'>";

            html += "   <tr>";
            html += "       <td class='td-alignment-small'><b>code</b></td>";
            html += "       <td class='td-alignment-std'><b>description</b></td>";
            html += "   </tr>";
            for(var response in swaggerJSON.paths[path][action].responses) {
                // eg 200
                
                // response schema start
                html += "   <tr>";
                html += "       <td class='td-alignment-small'>" + response + "</td>";
                html += "       <td class='td-alignment-std'>" + swaggerJSON.paths[path][action].responses[response].description;


                var responseSchema = swaggerJSON.paths[path][action].responses[response].schema;
                
                // response schema
                var hasResponseSchema = false;
                var responseSchemaHTML = "";
                responseSchemaHTML += "       <table class='table-margin' style='margin-left:-5px!important'>";                
                if(typeof responseSchema !== "undefined"){
                    if(typeof responseSchema.type !== "undefined"){
                        responseSchemaHTML += "   <tr>";
                        responseSchemaHTML += "       <td style='width:20%'><b>Schema type</b></td>";
                        responseSchemaHTML += "       <td style='width:80%'>" + responseSchema.type  + "</td>";
                        responseSchemaHTML += "   </tr>";
                        hasResponseSchema = true;
                    }

                    // response schema items
                    var responseSchemaItems = responseSchema.items;
                    if(typeof responseSchemaItems !== "undefined") {
                        responseSchemaHTML += "   <tr>";
                        responseSchemaHTML += "       <td class='td-alignment-small'>&nbsp;</td>";
                        responseSchemaHTML += "       <td class='td-alignment-std'>" + renderSchemaItems(responseSchemaItems, swaggerJSON.definitions) + "</td>";
                        responseSchemaHTML += "   </tr>";
                        hasResponseSchema = true;
                    }
                    else{
                        responseSchemaHTML += "   <tr>";
                        responseSchemaHTML += "       <td class='td-alignment-small'>&nbsp;</td>";
                        responseSchemaHTML += "       <td class='td-alignment-std'>" + renderSchemaItems(responseSchema, swaggerJSON.definitions) + "</td>";
                        responseSchemaHTML += "   </tr>";
                        hasResponseSchema = true;
                    }
                }
                responseSchemaHTML += "       </table>";      
                if(hasResponseSchema)
                    html += responseSchemaHTML;

                html += "       </td>";
                html += "   </tr>";

            }
            html += "</table>";  //responses 
            html += "           </td>";     
            html += "    </tr>";
            html+='</table>'; //TABLE FOR PATH END
        }
        pathCounter++;
        sub3Counter++;
        html += '</div>';
    }

    html += "</div></div>";
    html += "</body></html>";
    return html;
}

function swaggerContentCheck(swaggerJSON, section, checkOwn)
{
    var lenCheck=0;
    //used to sort out the auto numbers of main content and sub sections depending on what content there is...
    switch(section)
    {
        case 'security':
            var noSecurity=false;
            if(checkOwn)
            {
                if(typeof(swaggerJSON.securityDefinitions) !=='undefined')
                {
                    for(var dfn in swaggerJSON.securityDefinitions) {
                        lenCheck=1;
                    }
                    if(lenCheck ===0)
                    {
                        noSecurity=true;
                    }
                }
                else
                {
                    noSecurity=true;
                }
            }
            if(typeof(swaggerJSON.definitions) !=='undefined')
            {
                for(var dfn in swaggerJSON.definitions) {
                    lenCheck=1;
                }
                if(lenCheck===1)
                {
                    if(noSecurity && checkOwn)
                    {
                        return 1;
                    }
                    return 2;
                }
                else
                {
                    if(noSecurity && checkOwn)
                    {
                        return 0;
                    }
                    return 1;
                }
                
            }
            else
            {
                if(noSecurity && checkOwn)
                {
                    return 0;
                }
                return 1;
            }
            break;
        case 'paths':
                return (swaggerContentCheck(swaggerJSON, 'security', true) +1);
                break;
    }
}
function tableOfContents(swaggerJSON)
{

    var htmlTOC='';
    main1Counter=1;
    main2Counter=swaggerContentCheck(swaggerJSON,'security');
    main3Counter=swaggerContentCheck(swaggerJSON,'paths');
    var defLenCheck=0;
    if(main2Counter===2)//there are definitions
    {
         
            htmlTOC += '<div class="coverHeadings"><h1>Table of contents</h1></div>';
            htmlTOC += '<h2>' +main1Counter+'. Definitions</h2>';
            sub1Counter=main1Counter;
            for(var dfn in swaggerJSON.definitions) {
                // eg: Product (uber)
                htmlTOC += '<div class="div-container-margin">'; // definitions start
                htmlTOC += "<span><b>"+main1Counter+"." + sub1Counter +".</b> " + dfn + "</span>";
                htmlTOC += "<br><br>";
                htmlTOC += '</div>'; // definitions start
                sub1Counter++;
            }
    }
    if(typeof(swaggerJSON.securityDefinitions) !=='undefined')
    {
        htmlTOC += renderSecurityDefinitionsTableContents(swaggerJSON.securityDefinitions, main2Counter);
    }
    if(typeof(swaggerJSON.paths) !=='undefined')
    {
             htmlTOC += pathsTableContents(swaggerJSON, main3Counter);
    }
   return htmlTOC;
    
}
function renderSecurityDefinitionsTableContents(securityDefinitions, mainCounter){
    var html = "";  
    sub2Counter=mainCounter;  
    var secLenCheck=0;
    for(var sec in securityDefinitions) {
        secLenCheck=1;
    }
    if(secLenCheck ===0){return html;}
    // security
    html += '<h2>'+mainCounter+'. Security</h2>';
    html += '<div class="div-container-margin">'; // security start
    for(var sec in securityDefinitions) {
            html += "<span><b>" + mainCounter +"." + sub2Counter +".</b> " + sec + 
                ( typeof(securityDefinitions[sec].type) !== "undefined" ? " (" + securityDefinitions[sec].type + ")" : "" ) + "</span>";
           
            html += "<br><br>";
            sub2Counter++;
         
    }
    html += '</div>'; // security end
    return html;
}
function pathsTableContents(swaggerJSON, mainCounter)
{
    var html ='';
    sub3Counter=1;
    pathLenCheck=0;
    for(var path in swaggerJSON.paths){
        pathLenCheck=1;
    }
    if(pathLenCheck ===0)
    {
        return html;
    }
    html += '<h2>' +main3Counter+'. Paths</h2>';
    for(var path in swaggerJSON.paths){
     
     html += '<div class="div-container-margin">';
     for(var action in swaggerJSON.paths[path]){
            
            switch(action)
            {
                case "get":
                    html+='<span><b>' +mainCounter +'.' + sub3Counter +'.</b> ' +'get</span>&nbsp;&nbsp;'+path+'';
                    break; 
                case "post":
                    html+='<span><b>' +mainCounter +'.' + sub3Counter +'.</b> ' +'post</span>&nbsp;&nbsp;'+path+'';
                    break;
                case "put":
                    html+='<span><b>' +mainCounter +'.' + sub3Counter +'.</b> ' +'put</span>&nbsp;&nbsp;'+path+'';
                    break;
                case "delete":
                    html+='<span><b>' +mainCounter +'.' + sub3Counter +'.</b> ' +'delete</span>&nbsp;&nbsp;'+path+'';
                    break;
            }
            html += "<br><br>";
            sub3Counter++;
        }
         html +="</div>";
    }
    return html;
}
function renderSchemaItems(schemaItems, swaggerDefinitions){
    var html = "";

    if(typeof schemaItems["$ref"] !== "undefined"){
        // eg: #/definitions/Product
        var items = schemaItems["$ref"].split('/');
        var dfn = items[items.length-1]
        html += "See <b>" + dfn + "</b> in the <b>Definitions</b> section.";
        html += "<br />";
        html += "<br />";

        html += renderDefinition(true, dfn, swaggerDefinitions)

    }
    else{

        html += "Other schema item:" + schemaItems;

    }

    return html;
}

function renderDefinition(minimal, dfn, swaggerJSONdefinitions){

    var html = "";
    html += "<table class='table-margin'>";
    html += "   <thead>";
    html += "    <tr>";
    html += "           <th class='th-heading'><b>Name</b></td>";
    html += "           <th class='th-heading-small'><b>Type</b></td>";
    if(!minimal)
        html += "           <th class='th-heading'><b>Description</b></td>";
    html += "           <th class='th-heading'><b>Required</b></td>";
    html += "       </tr>";
    html += "   </thead>";

    html += "   <tbody>";
    var index = 0;
    for(var dfnProps in swaggerJSONdefinitions[dfn].properties){
        // eg: product_id
        var rowStyle = "";
        if(index % 2 === 0){
            rowStyle = ALTERNATE_ROW_STYLE;    
        }

        html += "   <tr style='" + rowStyle + "'>";
        html += "       <td style='width:30%;'>" + dfnProps + "</td>";
        if(swaggerJSONdefinitions[dfn].properties[dfnProps] != null){
            html += "       <td style='width:10%;'>" + ((typeof swaggerJSONdefinitions[dfn].properties[dfnProps].type !== "undefined") ? swaggerJSONdefinitions[dfn].properties[dfnProps].type : "") + "</td>";
            if(!minimal){
                html += "       <td style='width:30%;'>";
                
                if(typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["$ref"] !== "undefined"){
                    var items = swaggerJSONdefinitions[dfn].properties[dfnProps]["$ref"].split('/');
                    var subdfn = items[items.length-1];
                    html += "See <b>" + subdfn + "</b> in the <b>Definitions</b> section.";
                }
                else if(typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"] !== "undefined"){
                    if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"] === "string") {
                        var items = swaggerJSONdefinitions[dfn].properties[dfnProps]["items"].split('/');
                        var subdfn = items[items.length-1];
                        html += "See <b>" + subdfn + "</b> in the <b>Definitions</b> section.";
                    }
                    else if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"] === "object") {
                        if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"]["$ref"] !== "undefined"){
                            var items = swaggerJSONdefinitions[dfn].properties[dfnProps]["items"]["$ref"].split('/');
                            var subdfn = items[items.length-1];
                            html += "See <b>" + subdfn + "</b> in the <b>Definitions</b> section.";
                        }
                    }
                }
                else{
                    html += ((typeof swaggerJSONdefinitions[dfn].properties[dfnProps].description !== "undefined") ? swaggerJSONdefinitions[dfn].properties[dfnProps].description : "");
                }
                

                html += "</td>";
            }
        }
       

        var isRequired = false;
        if(swaggerJSONdefinitions[dfn].required != null){
            isRequired = swaggerJSONdefinitions[dfn].required.indexOf(dfnProps) !== -1;
        }
        html += "       <td style='width:30%;'>" + (isRequired==true?"Yes":"No") + "</td>";
        html += "   </tr>";

        index ++;
    }
    html += "   </tbody>";
    html += "</table>";
    return html;
}

function headerSummary(swaggerJSON){

    var html = "";

    html+="<div><h1>"+ swaggerJSON.info.title +"</h1></div>";
     if(swaggerJSON.info.description != null) {
        html+= "<div>"+ swaggerJSON.info.description.replace('\n\n', '<br />') +"</div>";
    }
    html += "<br />";

    /*html+="<div class='div-container-heading-summ'>";
    if(swaggerJSON.info.version != null) {
        html += "<div><span class='small-heading'>Version:</span>&nbsp;&nbsp;<span class='subheading-text'>"+swaggerJSON.info.version+"</span></div>";
    }
    if(swaggerJSON.info.termsOfService != null) {
       html += "<div><span class='small-heading'>Terms of service:</span>&nbsp;&nbsp;<span class='subheading-text'>"+swaggerJSON.info.termsOfService+"</span></div>";
    }
     if(swaggerJSON.info.contact != null){
        for(var contactMethod in swaggerJSON.info.contact){
            html += "<div><span class='small-heading'>Contact:</span>&nbsp;&nbsp;<span class='subheading-text'><strong>"+contactMethod+"</strong>: </span><span class='subheading-text'>"+swaggerJSON.info.contact[contactMethod]+"</span></div>";
        }
    }
    if(swaggerJSON.info.license != null){
        for(var licenseMethod in swaggerJSON.info.license){
            html += "<div><span class='small-heading'>License:</span>&nbsp;&nbsp;<span class='subheading-text'><strong>"+licenseMethod+"</strong>: </span><span class='subheading-text'>"+swaggerJSON.info.license[licenseMethod]+"</span></div>";
        }
    }
    if(swaggerJSON.host != null){
            html += "<div><span class='small-heading'>Host:</span>&nbsp;&nbsp;<span class='subheading-text'>"+swaggerJSON.host+"</span></div>";
    }
    if(swaggerJSON.basePath != null){
        html += "<div><span class='small-heading'>Base Path:</span>&nbsp;&nbsp;<span class='subheading-text'>"+swaggerJSON.basePath+"</span></div>";
    }
    if(swaggerJSON.produces != null){
        html += "<div><span class='small-heading'>Produces:</span>&nbsp;&nbsp;<span class='subheading-text'>"+swaggerJSON.produces.join(', ')+"</span></div>";
    }
  
    if(swaggerJSON.schemes != null){
        if(swaggerJSON.schemes.length !== 0)
        {
            html += "<div><span class='small-heading'>Scheme:</span>&nbsp;&nbsp;<span class='subheading-text'>"+swaggerJSON.schemes.join(', ')+"</span></div>";
        }
    }
    html += "</div>";*/

    html+="<table>";
    if(swaggerJSON.info.version != null) {
        html += "<tr><td><span class='small-heading'>Version:</span></td><td><span class='subheading-text'>"+swaggerJSON.info.version+"</span></td></tr>";
    }
    if(swaggerJSON.info.termsOfService != null) {
       html += "<td><td><span class='small-heading'>Terms of service:</span></td><td><span class='subheading-text'>"+swaggerJSON.info.termsOfService+"</span></td></tr>";
    }
     if(swaggerJSON.info.contact != null){
        for(var contactMethod in swaggerJSON.info.contact){
            html += "<tr><td><span class='small-heading'>Contact:</span></td><td><span class='subheading-text'><strong>"+contactMethod+"</strong>: </span><span class='subheading-text'>"+swaggerJSON.info.contact[contactMethod]+"</span></td></tr>";
        }
    }
    if(swaggerJSON.info.license != null){
        for(var licenseMethod in swaggerJSON.info.license){
            html += "<tr><td><span class='small-heading'>License:</span></td><td><span class='subheading-text'><strong>"+licenseMethod+"</strong>: </span><span class='subheading-text'>"+swaggerJSON.info.license[licenseMethod]+"</span></td></tr>";
        }
    }
    if(swaggerJSON.host != null){
            html += "<tr><td><span class='small-heading'>Host:</span></td><td><span class='subheading-text'>"+swaggerJSON.host+"</span></td></tr>";
    }
    if(swaggerJSON.basePath != null){
        html += "<tr><td><span class='small-heading'>Base Path:</span></td><td><span class='subheading-text'>"+swaggerJSON.basePath+"</span></td></tr>";
    }
    if(swaggerJSON.produces != null){
        html += "<tr><td><span class='small-heading'>Produces:</span></td><td><span class='subheading-text'>"+swaggerJSON.produces.join(', ')+"</span></td></tr>";
    }
    if(swaggerJSON.consumes != null){
        html += "<tr><td><span class='small-heading'>Consumes:</span></td><td><span class='subheading-text'>"+swaggerJSON.consumes.join(', ')+"</span></td></tr>";
    }
  
    if(swaggerJSON.schemes != null){
        if(swaggerJSON.schemes.length !== 0)
        {
            html += "<tr><td><span class='small-heading'>Scheme:</span></td><td><span class='subheading-text'>"+swaggerJSON.schemes.join(', ')+"</span></td></tr>";
        }
    }
    html += "</table>";


    return html;
}




function renderSecurityDefinitions(securityDefinitions){
    var html = "";   
    var secLenCheck=0;
    for(var sec in securityDefinitions) {
        secLenCheck=1;
    }
    if(secLenCheck===0){return html;}
    main2Counter= swaggerContentCheck(swaggerJSON, 'security');
    // security
    html += '<h2>'+main2Counter+'. Security</h2>';
    html += '<div class="div-container-margin">'; // security start
    sub2Counter=main2Counter;

    for(var sec in securityDefinitions) {
            html += "<table class='table-margin'>";

            html += "<tr>";            
            html += "<td colspan='2'><h3>"+main2Counter +"." + sub2Counter +". "  + sec +
                ( typeof(securityDefinitions[sec].type) !== "undefined" ? " (" + securityDefinitions[sec].type + ")" : "" ) + "</h3>" + "</td>";

            html += "</tr>";            
            if(typeof(securityDefinitions[sec].description) !== "undefined"){
                html += "<tr>";            
                html += "<td style='width:15%;'>Description</td>";    
                html += "<td>" +( typeof(securityDefinitions[sec].description) !== "undefined" ? securityDefinitions[sec].description : "" ) + "</td>";
                html += "</tr>";       
            }
            if(typeof(securityDefinitions[sec].flow) !== "undefined"){
                html += "<tr>";            
                html += "<td style='width:15%;'>Flow</td>";    
                html += "<td>" +( typeof(securityDefinitions[sec].flow) !== "undefined" ? securityDefinitions[sec].flow : "" ) + "</td>";
                html += "</tr>";       
            }
            if(typeof(securityDefinitions[sec].name) !== "undefined"){
                html += "<tr>";            
                html += "<td style='width:15%;'>Name</td>";    
                html += "<td>" +( typeof(securityDefinitions[sec].name) !== "undefined" ? securityDefinitions[sec].name : "" ) + "</td>";
                html += "</tr>";       
            }
            if(typeof(securityDefinitions[sec].authorizationUrl) !== "undefined"){
                html += "<tr>";            
                html += "<td style='width:15%;'>Authorization Url</td>";    
                html += "<td>" +( typeof(securityDefinitions[sec].authorizationUrl) !== "undefined" ? securityDefinitions[sec].authorizationUrl : "" ) + "</td>";
                html += "</tr>";       
            }

            if(typeof(securityDefinitions[sec].scopes) !== "undefined"){
                html += "<tr>";            
                html += "<td style='width:15%;vertical-align:top;'>Scopes</td>";    
                html += "<td>";
                
                html += "<table class='table-margin'>";
                for(var scope in securityDefinitions[sec].scopes) {
                    html += "<tr>";            
                    html += "<td style='width:20%;vertical-align:top;'><b>" + scope + "</b></td>";    
                    html += "<td>" +  securityDefinitions[sec].scopes[scope];
                    html += "</td>";  

                }
                html += "</table>";

                html += "</td>";
                html += "</tr>";       
            }

            html += "</table>";   
            sub2Counter++;         
    }
    html += '</div>'; // security end
    html += "<div style='page-break-after:always'></div>"; //page break for next json file's html
    return html;
}
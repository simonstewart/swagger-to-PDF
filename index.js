


var
    fs = require('fs'),
    pdf = require('phantomjs-pdf');
   
// consts
var    
    FONT_STYLE='font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;font-size: 13px;',
    ALTERNATE_ROW_STYLE = ";background-color: #f9f9f9;";


var jsonFile = process.argv.splice(2)[0];

console.log(jsonFile);

var swaggerJSON = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

var html = convertToHTML(swaggerJSON);

// output file
var fileName = "test.html";

// remove output file if exists
if(fs.existsSync(fileName))
    fs.unlinkSync(fileName);

// write output HTML file, then convert to PDF
fs.writeFile(fileName, html, function(err){
    if(err)
        console.log("FAILED:" + err);
    else{
        console.log("done");
        

        pdf.convert({"html" : "./test.html"}, function(result) {

            /* Using a buffer and callback */
            result.toBuffer(function(returnedBuffer) {
                console.log("return buffer");
            });

            /* Using a readable stream */
            var stream = result.toStream();

            /* Using the temp file path */
            var tmpPath = result.getTmpPath();

            /* Using the file writer and callback */
            result.toFile("output.pdf", function(err) {
                if(err)    
                    console.log("err:" + err);
                else
                    console.log("really done ...");


            });

            
        });

    }

});







function convertToHTML(swaggerJSON){

    var html = '';

    html += "<html>"
    html += "<style>";
    html += "body {" +
        FONT_STYLE
        "};";
    html += "p {" +
        FONT_STYLE
        "};";
    html += "bs-callout {"
    html += "padding: 20px;";
    html += "margin: 20px 0;";
    html += "border: 1px solid #eee;";
    html += "border-left-width: 5px;";
    html += "border-radius: 3px;";
    html += "}";


    html += "</style>";


    html += "<body>"

    html += headerSummary(swaggerJSON);



    // desc
    //html += '<p>' + swaggerJSON.info.description + '</p>';

    // definitions
    html += '<h2>Definitions</h2>';
    for(var dfn in swaggerJSON.definitions) {
        // eg: Product (uber)
        html += '<div style="margin-left:21px;margin-right:51px;">'; // definitions start

        html += "<b>" + dfn + "</b>";
        html += "<hr />";


        html += renderDefinition(false, dfn, swaggerJSON.definitions);

        html += "<br />";


        html += '</div>'; // definitions start
    }


    html += renderSecurityDefinitions(swaggerJSON.securityDefinitions);


    // paths
    html += '<h2>Paths</h2>';

    for(var path in swaggerJSON.paths){
        html += '<div style="margin-left:21px;margin-right:51px;">';
        // path name
        html += '<h3> path:' + path + '</h3>';
        html += '<hr />';
        // verbs for path
        for(var action in swaggerJSON.paths[path]){

            html += '<div style="margin-left:22px;">'; // path start

            html += "<table style='width:100%;margin-top:-5px;'>";
            
            html += "    <tr>";
            html += "           <td colspan='2' style='" + FONT_STYLE + ";vertical-align:top;text-align:center'><h4>HTTP " + action + "</h4></td>";
            html += "    </tr>";

            // summary
            html += "    <tr>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Summary</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + (typeof(swaggerJSON.paths[path][action].summary) !== "undefined"?swaggerJSON.paths[path][action].summary:"") + "</td>";
            html += "    </tr>";
            

            // description
            html += "    <tr style='" + ALTERNATE_ROW_STYLE + "'>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Description</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + (typeof(swaggerJSON.paths[path][action].description) !== "undefined"?swaggerJSON.paths[path][action].description:"") + "</td>";
            html += "    </tr>";
            
            // operationId
            html += "    <tr>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Operation Id</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + (typeof(swaggerJSON.paths[path][action].operationId) !== "undefined"?swaggerJSON.paths[path][action].operationId:"") + "</td>";
            html += "    </tr>";

            // action produces
            html += "    <tr style='" + ALTERNATE_ROW_STYLE + "'>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Produces</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + (typeof(swaggerJSON.paths[path][action].produces) !== "undefined"?swaggerJSON.paths[path][action].produces.join(' '):"") + "</td>";
            html += "    </tr>";

            // action consumes
            html += "    <tr>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Consumes</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + (typeof(swaggerJSON.paths[path][action].consumes) !== "undefined"?swaggerJSON.paths[path][action].consumes.join(' '):"") + "</td>";
            html += "    </tr>";

            // action params
            html += "    <tr>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Parameters</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>";

            if(typeof swaggerJSON.paths[path][action].parameters !== "undefined") {

                html += "<table style='width:100%;margin-top:-5px;'>";
                html += "   <thead>";    
                html += "     <tr>";
                html += "       <td style='" + FONT_STYLE + "'><b>name</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>in</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>description</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>required</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>type</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>format</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>collection format</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>default</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>min</b></td>";
                html += "       <td style='" + FONT_STYLE + "'><b>max</b></td>";
                html += "    </tr>";
                html += "   </thead>";    

                html += "   <tbody>";    
                for (var paramIndex = 0; paramIndex < swaggerJSON.paths[path][action].parameters.length; paramIndex++) {

                    var rowStyle = "";
                    //if(paramIndex % 2 == 0)
                    //    rowStyle = ALTERNATE_ROW_STYLE;

                    html += "   <tr style='" + rowStyle + "'>";

                    var param = swaggerJSON.paths[path][action].parameters[paramIndex];

                    // name
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + param.name + "</td>";

                    // in
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + param.in + "</td>";

                    // description
                    var paramDescription = param.description;
                    if(typeof param.schema !== "undefined" && typeof param.schema["$ref"] !== "undefined"){
                        var dfn = param.schema["$ref"].split('/');
                        paramDescription += "<br />" + renderDefinition(true, dfn[dfn.length-1] , swaggerJSON.definitions);
                    }

                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + paramDescription + "</td>";

                    // required
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.required !== "undefined") ? (param.required==true?"Yes":"No") : "No")  + "</td>";

                    // type
                    if(param.type == "array" && param.items!=null && param.items.type!=null){
                        html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + "array of " + param.items.type + "</td>";
                    }
                    else{
                        html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.type !== "undefined") ? param.type : "") + "</td>";
                    }


                    // format
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.format !== "undefined") ? param.format : "") + "</td>";

                    // collection format
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.collectionFormat !== "undefined") ? param.collectionFormat : "") + "</td>";

                    // default
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.default !== "undefined") ? param.default : "") + "</td>";

                    // minimum
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.minimum !== "undefined") ? param.minimum : "") + "</td>";

                    // maximum
                    html += "       <td style='" + FONT_STYLE + ";vertical-align:top;'>" + ((typeof param.maximum !== "undefined") ? param.maximum : "") + "</td>";
                    html += "   </tr>";
                }
                html += "   </tbody>";    
                
                html += "   </table>";

            }
            else{
                html += "<p>" + "no parameters" + "</p>";
            }

            html += "</td>";
            html += "    </tr>";


            // tags
            if(typeof swaggerJSON.paths[path][action].tags !== "undefined") {

                html += "    <tr>";
                html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Tags</b></td>";
                html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + swaggerJSON.paths[path][action].tags.join(' ') + "</td>";
                html += "    </tr>";

            }
            else{
                // no tags
            }



            // action security 
            if(typeof swaggerJSON.paths[path][action].security !== "undefined") {

                html += "    <tr>";
                html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Security</b></td>";

                for (var securityIndex = 0; securityIndex < swaggerJSON.paths[path][action].security.length; securityIndex++) {
                    
                    var security = swaggerJSON.paths[path][action].security[securityIndex];
                    for(var securityItem in security){
                        html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>" + securityItem + "</b> (" + swaggerJSON.paths[path][action].security[securityIndex][securityItem].join(', ') + ")" + "</td>";
                    }
                };

                
                html += "    </tr>";

            }
            else{
                // no tags
            }



            // action responses
            html += "      <tr>";
            html += "           <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>Responses</b></td>";
            html += "           <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>";

            // response schema start
            html += "<table style='width:100%;'>";

            html += "   <tr>";
            html += "       <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'><b>code</b></td>";
            html += "       <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'><b>description</b></td>";
            html += "   </tr>";
            for(var response in swaggerJSON.paths[path][action].responses) {
                // eg 200
                
                
                // response schema start
                html += "   <tr>";
                html += "       <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'>" + response + "</td>";
                html += "       <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + swaggerJSON.paths[path][action].responses[response].description;


                var responseSchema = swaggerJSON.paths[path][action].responses[response].schema;
                
                // response schema
                var hasResponseSchema = false;
                var responseSchemaHTML = "";
                responseSchemaHTML += "       <table style='width:100%;'>";                
                if(typeof responseSchema !== "undefined"){
                    if(typeof responseSchema.type !== "undefined"){
                        responseSchemaHTML += "   <tr>";
                        responseSchemaHTML += "       <td style='width:20%;" + FONT_STYLE + "'>Schema type</td>";
                        responseSchemaHTML += "       <td style='width:80%;" + FONT_STYLE + "'>" + responseSchema.type  + "</td>";
                        responseSchemaHTML += "   </tr>";
                        hasResponseSchema = true;
                    }

                    // response schema items
                    var responseSchemaItems = responseSchema.items;
                    if(typeof responseSchemaItems !== "undefined") {
                        responseSchemaHTML += "   <tr>";
                        responseSchemaHTML += "       <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'>&nbsp;</td>";
                        responseSchemaHTML += "       <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + renderSchemaItems(responseSchemaItems, swaggerJSON.definitions) + "</td>";
                        responseSchemaHTML += "   </tr>";
                        hasResponseSchema = true;
                    }
                    else{
                        responseSchemaHTML += "   <tr>";
                        responseSchemaHTML += "       <td style='width:20%;" + FONT_STYLE + ";vertical-align:top;'>&nbsp;</td>";
                        responseSchemaHTML += "       <td style='width:80%;" + FONT_STYLE + ";vertical-align:top;'>" + renderSchemaItems(responseSchema, swaggerJSON.definitions) + "</td>";
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


            html += '</div>';  // path end
        }

        html += '</div>';
    }



    html += "</body></html>";

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

    html += "<table style='width:100%;margin-top:-5px;'>";
    html += "   <thead>";
    html += "    <tr>";
    html += "           <th style='width:30%;" + FONT_STYLE + ";text-align:left;'><b>name</b></td>";
    html += "           <th style='width:10%;" + FONT_STYLE + ";text-align:left;'><b>type</b></td>";
    if(!minimal)
        html += "           <th style='width:30%;" + FONT_STYLE + ";text-align:left;'><b>description</b></td>";
    html += "           <th style='width:30%;" + FONT_STYLE + ";text-align:left;'><b>required</b></td>";
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
        html += "       <td style='width:30%;" + FONT_STYLE + "'>" + dfnProps + "</td>";
        if(swaggerJSONdefinitions[dfn].properties[dfnProps] != null){
            html += "       <td style='width:10%;" + FONT_STYLE + "'>" + ((typeof swaggerJSONdefinitions[dfn].properties[dfnProps].type !== "undefined") ? swaggerJSONdefinitions[dfn].properties[dfnProps].type : "") + "</td>";
            if(!minimal){
                html += "       <td style='width:30%;" + FONT_STYLE + "'>";
                
                if(typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["$ref"] !== "undefined"){
                    var items = swaggerJSONdefinitions[dfn].properties[dfnProps]["$ref"].split('/');
                    var dfn = items[items.length-1];
                    html += "See <b>" + dfn + "</b> in the <b>Definitions</b> section.";
                }
                else if(typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"] !== "undefined"){
                    if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"] === "string") {
                        var items = swaggerJSONdefinitions[dfn].properties[dfnProps]["items"].split('/');
                        var dfn = items[items.length-1];
                        html += "See <b>" + dfn + "</b> in the <b>Definitions</b> section.";
                    }
                    else if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"] === "object") {
                        if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]["items"]["$ref"] !== "undefined"){
                            var items = swaggerJSONdefinitions[dfn].properties[dfnProps]["items"]["$ref"].split('/');
                            var dfn = items[items.length-1];
                            html += "See <b>" + dfn + "</b> in the <b>Definitions</b> section.";
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
        html += "       <td style='width:30%;" + FONT_STYLE + "'>" + (isRequired==true?"Yes":"No") + "</td>";
        html += "   </tr>";

        index ++;
    }
    html += "   </tbody>";
    html += "</table>";

    return html;
}

function headerSummary(swaggerJSON){

    var html = "";

    html += "<table style='width:100%;' border='0'>"
    html += "   <tr>";
    html += "       <td colspan='3' style='text-align:center;'><span style='font-weight: bold;font-size: 30pt;'>"+ swaggerJSON.info.title + "</span></td>"; // TODO markdown parse
    html += "   </tr>";
    if(swaggerJSON.info.description != null) {
        html += "   <tr>";
        html += "       <td colspan='3' style='text-align:center;" + FONT_STYLE + "'>" + swaggerJSON.info.description.replace('\n\n', '<br />') + "</td>";  // TODO markdown parse
        html += "   </tr>";
    }
    if(swaggerJSON.info.version != null) {
        html += "   <tr>";
        html += "       <td style='width:35%;'>&nbsp;</td>";
        html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Version:</td>";
        html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.info.version + "</td>";
        html += "   </tr>";
    }
    if(swaggerJSON.info.termsOfService != null) {
        html += "   <tr>";
        html += "       <td style='width:35%;'>&nbsp;</td>";
        html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Terms of service:</td>";
        html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.info.termsOfService + "</td>";
        html += "   </tr>";
    }
    if(swaggerJSON.info.contact != null){
        for(var contactMethod in swaggerJSON.info.contact){
            html += "   <tr>";
            html += "       <td style='width:35%;'>&nbsp;</td>";
            html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Contact " + contactMethod + ":</td>";
            html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.info.contact[contactMethod] + "</td>";
            html += "   </tr>";
        }
    }
    if(swaggerJSON.info.license != null){
        for(var licenseMethod in swaggerJSON.info.license){
            html += "   <tr>";
            html += "       <td style='width:35%;'>&nbsp;</td>";
            html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>License " + licenseMethod + ":</td>";
            html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.info.license[licenseMethod] + "</td>";
            html += "   </tr>";
        }
    }
    if(swaggerJSON.host != null){
        html += "   <tr>";
        html += "       <td style='width:35%;'>&nbsp;</td>";
        html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Host:</td>";
        html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.host + "</td>";
        html += "   </tr>";
    }
    if(swaggerJSON.basePath != null){
        html += "   <tr>";
        html += "       <td style='width:35%;'>&nbsp;</td>";
        html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Base Path:</td>";
        html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.basePath + "</td>";
        html += "   </tr>";
    }
    if(swaggerJSON.produces != null){
        html += "   <tr>";
        html += "       <td style='width:35%;'>&nbsp;</td>";
        html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Produces:</td>";
        html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.produces.join(', ') + "</td>";
        html += "   </tr>";
    }
    if(swaggerJSON.schemes != null && swaggerJSON.schemes.length !== 0){
        html += "   <tr>";
        html += "       <td style='width:35%;'>&nbsp;</td>";
        html += "       <td style='width:15%;text-align:left;" + FONT_STYLE + "'>Scheme:</td>";
        html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.schemes.join(', ') + "</td>";
        html += "   </tr>";
        /*for(var schemeIndex = 0; schemeIndex < swaggerJSON.schemes.length;schemeIndex++) {
            html += "   <tr>";
            html += "       <td style='width:40%;'>&nbsp;</td>";
            html += "       <td style='width:10%;text-align:left;" + FONT_STYLE + "'>Scheme:</td>";
            html += "       <td style='width:50%;text-align:left;" + FONT_STYLE + "'>" + swaggerJSON.schemes[schemeIndex] + "</td>";
            html += "   </tr>";
        }*/
    }
    html += '</table>';


    return html;
}

function renderSecurityDefinitions(securityDefinitions){
    var html = "";    
    // security
    html += '<h2>Security</h2>';
    html += '<div style="margin-left:21px;margin-right:51px;">'; // security start
    for(var sec in securityDefinitions) {
            html += "<table style='width:100%;'>";

            html += "<tr>";            

            html += "<td colspan='2'><b>" + sec + 
                ( typeof(securityDefinitions[sec].type) !== "undefined" ? " (" + securityDefinitions[sec].type + ")" : "" ) + "</b></td>";

            html += "</tr>";            
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
                
                html += "<table>";
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
    }
    html += '</div>'; // security end

    return html;
}
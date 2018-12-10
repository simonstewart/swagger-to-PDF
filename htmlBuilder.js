const FONT_STYLE = 'font-family: "Helvetica Neue",Trebuchet MS, sans-serif;font-size: 12px;color: #444';

function getStyling(customCss) {
    return `<style>
        /* styling for looks */
        body {
            ${FONT_STYLE}
        }
        p {
            ${FONT_STYLE}
        }
        .alternate-row {
            background-color: #EAEAEA;
        }
        .small-heading {
            font-weight: bold;
        }
        .div-container-heading-summ {
            margin-left: 20px;
        }
        .subheading-text {
            font-size: 98%;
            color: #555;
        }
        .th-heading {
            width:30%;
            text-align:left;
        }
        .th-heading-small {
            width:10%;
            text-align:left;
        }
        .table-margin {
            width:100%;
            font-size:100%;
            margin-top:0px;
        }
        .path-table-container {
            margin-left:30px;
            margin-right:30px;
        }
        .table-std {
            width:100%;
        }
        .div-container-margin {
            margin-left:21px;
            margin-right:51px;
            margin-bottom:4em;
            page-break-inside:avoid;
        }
        .td-alignment-small {
            vertical-align:top;
            width:20%;
        }
        .td-alignment-std {
            vertical-align:top;
            width:80%;
        }
        .td-alignment-small-no-width {
            vertical-align:top;
        }
        .td-alignment-std-no-width {
            vertical-align:top;
        }
        h3.get {
            background-color: #0f6ab4;
            border-bottom: 1px solid #eee;
        }
        h3.post {
            background-color: #10a54a;
            border-bottom: 1px solid #eee;
        }
        h3.patch,
        h3.put {
            background-color: #c5862b;
            border-bottom: 1px solid #eee;
        }
        h3.delete {
            background-color: #a41e22;
            border-bottom: 1px solid #eee;
        }

        li span.get {
            color: #0f6ab4;
        }
        li span.post {
            color: #10a54a;
        }
        li span.patch,
        li span.put {
            color: #c5862b;
        }
        li span.delete {
            color: #a41e22;
        }

        h3 {
            padding: 10px;
            margin: 0 30px 2px 30px;
            color:#FFF;
            font-size:100%;
        }
        td {
            padding-top:4px;
            padding-bottom:4px;
            padding-right:0px;
            padding-left:0px;
        }
        .page {
            page-break-after:always;
            position: fixed;
        }
        .centerAlign {
            text-align:center
        }
        .title,
        .coverHeadings {
            color: #0f6ab4
        }
        @media print{
            .footer {
                position:absolute;
                bottom:10px;
                height:10px;
                text-align:center;
            }
        }
        .moddedHR {
            border: none;
            height: 2px;
            color: #0f6ab4;
            background-color: #0f6ab4;
        }
        list[type=bullet] item description:before{
            content:"\\a";
            white-space:pre;
        }
        li a{
            text-decoration:none;
        }
        li span{
            display:inline-block;
            width:4em;
        }
        h3 span,
        li span {
            font-size:13px;
            font-weight:bolder;
            text-transform:uppercase;
        }
        h3 span:after,
        li span:after {
            content:' '
        }
    </style>
    <style>
        /* styling to generate counters */
        body {
            counter-reset: h2counter;
        }
        h1 {
            counter-reset: h2counter;
        }
        h2:not(.subtitle):before {
            content: counter(h2counter) ". ";
            counter-increment: h2counter;
            counter-reset: h3counter;
        }
        h3:before {
            content: counter(h2counter) "." counter(h3counter) ". ";
            counter-increment: h3counter;
            counter-reset: h4counter;
        }
        h4:before {
            content: counter(h2counter) "." counter(h3counter) ". " counter(h4counter) ". ";
            counter-increment: h4counter;
        }

        li { 
            display: block;
            font-size:12px; 
        }
        ul>li{ 
            margin-left:1em;
            font-size:13px;
        }
        ol { counter-reset: item; }
        ol li:before { 
            content: counters(item, ".") " "; 
            counter-increment: item;
            margin-right:1em;
            display:inline-block;
            width:2em;
        }
    </style>
    <style>
        /* Custom styling overrides*/
        ${customCss}
    </style>`;
}

function getTitlePage(swaggerJSON) {
    let html = '';
    html += '<table>';
    if (swaggerJSON.info.version != null) {
        html +=
            "<tr><td><span class='small-heading'>Version:</span></td><td><span class='subheading-text'>" +
            swaggerJSON.info.version +
            '</span></td></tr>';
    }
    if (swaggerJSON.info.termsOfService != null) {
        html +=
            "<td><td><span class='small-heading'>Terms of service:</span></td><td><span class='subheading-text'>" +
            swaggerJSON.info.termsOfService +
            '</span></td></tr>';
    }
    if (swaggerJSON.info.contact != null) {
        for (let contactMethod in swaggerJSON.info.contact) {
            html +=
                "<tr><td><span class='small-heading'>Contact " +
                contactMethod +
                ":</span></td><td<span class='subheading-text'>" +
                swaggerJSON.info.contact[contactMethod] +
                '</span></td></tr>';
        }
    }
    if (swaggerJSON.info.license != null) {
        for (let licenseMethod in swaggerJSON.info.license) {
            html +=
                "<tr><td><span class='small-heading'>License:</span></td><td><span class='subheading-text'><strong>" +
                licenseMethod +
                "</strong>: </span><span class='subheading-text'>" +
                swaggerJSON.info.license[licenseMethod] +
                '</span></td></tr>';
        }
    }
    if (swaggerJSON.host != null) {
        html +=
            "<tr><td><span class='small-heading'>Host:</span></td><td><span class='subheading-text'>" +
            swaggerJSON.host +
            '</span></td></tr>';
    }
    if (swaggerJSON.basePath != null) {
        html +=
            "<tr><td><span class='small-heading'>Base Path:</span></td><td><span class='subheading-text'>" +
            swaggerJSON.basePath +
            '</span></td></tr>';
    }
    if (swaggerJSON.produces != null) {
        html +=
            "<tr><td><span class='small-heading'>Produces:</span></td><td><span class='subheading-text'>" +
            swaggerJSON.produces.join(', ') +
            '</span></td></tr>';
    }
    if (swaggerJSON.consumes != null) {
        html +=
            "<tr><td><span class='small-heading'>Consumes:</span></td><td><span class='subheading-text'>" +
            swaggerJSON.consumes.join(', ') +
            '</span></td></tr>';
    }

    if (swaggerJSON.schemes != null) {
        if (swaggerJSON.schemes.length !== 0) {
            html +=
                "<tr><td><span class='small-heading'>Scheme:</span></td><td><span class='subheading-text'>" +
                swaggerJSON.schemes.join(', ') +
                '</span></td></tr>';
        }
    }
    html += '</table>';

    return `<div style='page-break-after:always'>
                <div class='title' >
                    <h1>${swaggerJSON.info.title}</h1>
                    <h2 class='subtitle'>API Documentation</h2>
                </div>
                <div>
                    ${html}
                </div>
                <div class='footer'>Generated on:  ${new Date()}</div>
            </div>`;
}

function getIntroduction(swaggerJSON) {
    if (swaggerJSON.info.description != null) {
        return `<div style='page-break-after:always'>
                    <h1 class='coverHeadings'>Introduction</h1>
                    <div>${swaggerJSON.info.description.replace('\n\n', '<br />')}</div>
                </div>`;
    }
    return '';
}

function getTableOfContent(swaggerJSON) {
    let htmlToc = '';

    const tags = [...new Set(swaggerJSON.tags.map(item => item.name))];
    const paths = tags
        .map(tag => {
            return (
                `<li><b>${tag}</b><ol>` +
                getPathsByTag(swaggerJSON, tag)
                    .map(
                        path =>
                            `<li><a href="#${path.action}${path.path}"><span class="${path.action}">${
                                path.action
                            }</span>${path.path}</a></li>`
                    )
                    .join(' ') +
                '</ol></li>'
            );
        })
        .join(' ');

    htmlToc += '<li><b>Paths</b><ol>' + paths + '</ol></li>';

    if (swaggerJSON.definitions && Object.keys(swaggerJSON.definitions).length) {
        //start a new chapter
        htmlToc +=
            '<li><b>Definitions</b><ol>' +
            Object.keys(swaggerJSON.definitions)
                .filter(key => key !== 'Array')
                .map(definition => `<li><a href="#${definition}">${definition}</a></li>`)
                .join(' ') +
            //end the chapter
            '</ol></li>';
    }

    return `<div style='page-break-after:always'>
                <h1 class='coverHeadings'>Table of Content</h1>
                <ul>
                ${htmlToc}
                </ul>
            </div>`;
}

function getPathsByTag(swagger, tag) {
    return Object.keys(swagger.paths)
        .map(path =>
            Object.keys(swagger.paths[path])
                .map(action =>
                    swagger.paths[path][action].tags.includes(tag)
                        ? { action, path, spec: swagger.paths[path][action] }
                        : null
                )
                .filter(x => !!x)
        )
        .reduce((acc, val) => acc.concat(val), []);
}

function getPathSpecifications(swaggerJSON) {
    const tags = [...new Set(swaggerJSON.tags.map(item => item.name))];
    const paths = tags
        .map(tag => {
            return (
                `<div style='page-break-after:always'><h2>${tag}</h2>` +
                getPathsByTag(swaggerJSON, tag)
                    .map(path => {
                        let html = '';
                        html += '<div class="path-table-container">'; // path start
                        html += "<table class='table-margin'>";

                        // summary
                        html += '    <tr>';
                        html += "           <td class='td-alignment-small'><b>Summary</b></td>";
                        html +=
                            "           <td class='td-alignment-std'>" +
                            (typeof path.spec.summary !== 'undefined' ? path.spec.summary : '') +
                            '</td>';
                        html += '    </tr>';

                        // description
                        html += "    <tr class='alternate-row'>";
                        html += "           <td class='td-alignment-small'><b>Description</b></td>";
                        html +=
                            "           <td class='td-alignment-std'>" +
                            (typeof path.spec.description !== 'undefined' ? path.spec.description : '') +
                            '</td>';
                        html += '    </tr>';

                        // operationId
                        html += '    <tr>';
                        html += "           <td class='td-alignment-small'><b>Operation Id</b></td>";
                        html +=
                            "           <td class='td-alignment-std'>" +
                            (typeof path.spec.operationId !== 'undefined' ? path.spec.operationId : '') +
                            '</td>';
                        html += '    </tr>';

                        // action produces
                        html += "    <tr class='alternate-row'>";
                        html += "           <td class='td-alignment-small'><b>Produces</b></td>";
                        html +=
                            "           <td class='td-alignment-std'>" +
                            (typeof path.spec.produces !== 'undefined' ? path.spec.produces.join(' ') : '') +
                            '</td>';
                        html += '    </tr>';

                        // action consumes
                        html += '    <tr>';
                        html += "           <td class='td-alignment-small'><b>Consumes</b></td>";
                        html +=
                            "           <td class='td-alignment-std'>" +
                            (typeof path.spec.consumes !== 'undefined' ? path.spec.consumes.join(' ') : '') +
                            '</td>';
                        html += '    </tr>';

                        // action params
                        html += '    <tr>';
                        html += "           <td class='td-alignment-small'><b>Parameters</b></td>";
                        html += "           <td class='td-alignment-std'>";

                        if (typeof path.spec.parameters !== 'undefined') {
                            html += "<table class='table-margin'>";
                            html += '   <thead>';
                            html += '     <tr>';
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
                            html += '    </tr>';
                            html += '   </thead>';

                            html += '   <tbody>';
                            for (let paramIndex = 0; paramIndex < path.spec.parameters.length; paramIndex++) {
                                html += `   <tr ${paramIndex % 2 == 0 ? 'class="alternate-row"' : ''}'>`;
                                let param = path.spec.parameters[paramIndex];

                                // name
                                html += "       <td class='td-alignment-small-no-width'>" + param.name + '</td>';

                                // in
                                html += "       <td class='td-alignment-small-no-width'>" + param.in + '</td>';

                                // description
                                let paramDescription = param.description || '';
                                if (
                                    typeof param.schema !== 'undefined' &&
                                    typeof param.schema['$ref'] !== 'undefined'
                                ) {
                                    let dfn = param.schema['$ref'].split('/');
                                    paramDescription +=
                                        '<br />' + renderDefinition(true, dfn[dfn.length - 1], swaggerJSON.definitions);
                                }
                                if (!paramDescription) {
                                    paramDescription = '&nbsp;';
                                }
                                html += "       <td class='td-alignment-small-no-width'>" + paramDescription + '</td>';

                                // required
                                html +=
                                    "       <td class='td-alignment-small-no-width'>" +
                                    (typeof param.required !== 'undefined'
                                        ? param.required == true
                                            ? 'Yes'
                                            : 'No'
                                        : 'No') +
                                    '</td>';

                                // type
                                if (param.type == 'array' && param.items != null && param.items.type != null) {
                                    html +=
                                        "       <td class='td-alignment-small-no-width'>" +
                                        'array of ' +
                                        param.items.type +
                                        '</td>';
                                } else {
                                    html +=
                                        "       <td class='td-alignment-small-no-width'>" +
                                        (typeof param.type !== 'undefined' ? param.type : '') +
                                        '</td>';
                                }

                                // format
                                html +=
                                    "       <td class='td-alignment-small-no-width'>" +
                                    (typeof param.format !== 'undefined' ? param.format : '') +
                                    '</td>';

                                // collection format
                                html +=
                                    "       <td class='td-alignment-small-no-width'>" +
                                    (typeof param.collectionFormat !== 'undefined' ? param.collectionFormat : '') +
                                    '</td>';

                                // default
                                html +=
                                    "       <td class='td-alignment-small-no-width'>" +
                                    (typeof param.default !== 'undefined' ? param.default : '') +
                                    '</td>';

                                // minimum
                                html +=
                                    "       <td class='td-alignment-small-no-width'>" +
                                    (typeof param.minimum !== 'undefined' ? param.minimum : '') +
                                    '</td>';

                                // maximum
                                html +=
                                    "       <td class='td-alignment-small-no-width'>" +
                                    (typeof param.maximum !== 'undefined' ? param.maximum : '') +
                                    '</td>';
                                html += '   </tr>';
                            }
                            html += '   </tbody>';
                            html += '   </table>';
                        } else {
                            html += '<p>' + 'no parameters' + '</p>';
                        }

                        // tags
                        if (typeof path.spec.tags !== 'undefined') {
                            html += '    <tr>';
                            html += "           <td class='td-alignment-small'><b>Tags</b></td>";
                            html +=
                                "           <td class='td-alignment-std' style='padding-left:6px'>" +
                                path.spec.tags.join(' ') +
                                '</td>';
                            html += '    </tr>';
                        } else {
                            // no tags
                        }

                        // action security
                        if (typeof path.spec.security !== 'undefined') {
                            html += '<tr>';
                            html += "<td class='td-alignment-small'><b>Security</b></td>";
                            html +=
                                "<td class='td-alignment-std' style='padding-left:0px!important;margin-left:0px!important'>";

                            // response schema start
                            html += "<table class='table-margin' style='width:42%'>";

                            html += '   <tr>';
                            for (let securityIndex = 0; securityIndex < path.spec.security.length; securityIndex++) {
                                let security = path.spec.security[securityIndex];
                                let iSec = 0;
                                for (let securityItem in security) {
                                    html +=
                                        "<td class='td-alignment-small'><b>" +
                                        securityItem +
                                        '</b> (' +
                                        path.spec.security[securityIndex][securityItem].join(', ') +
                                        ')' +
                                        '</td>';
                                }
                            }
                            html += '       </td>';
                            html += '   </tr>';
                            html += '   </table>';
                        } else {
                            // no security
                        }

                        // action responses
                        html += '      <tr>';
                        html += "           <td class='td-alignment-small'><b>Responses</b></td>";
                        html +=
                            "           <td class='td-alignment-std' style='padding-left:0px!important;margin-left:0px!important'>";

                        // response schema start
                        html += "<table class='table-margin'>";

                        html += '   <tr>';
                        html += "       <td class='td-alignment-small'><b>code</b></td>";
                        html += "       <td class='td-alignment-std'><b>description</b></td>";
                        html += '   </tr>';
                        for (let response in path.spec.responses) {
                            // eg 200

                            // response schema start
                            html += '   <tr>';
                            html += "       <td class='td-alignment-small'>" + response + '</td>';
                            html += "       <td class='td-alignment-std'>" + path.spec.responses[response].description;

                            let responseSchema = path.spec.responses[response].schema;

                            // response schema
                            let hasResponseSchema = false;
                            let responseSchemaHTML = '';
                            responseSchemaHTML += "       <table class='table-margin'>";
                            if (typeof responseSchema !== 'undefined') {
                                if (typeof responseSchema.type !== 'undefined') {
                                    responseSchemaHTML += '   <tr>';
                                    responseSchemaHTML += "       <td style='width:20%'><b>Schema type</b></td>";
                                    responseSchemaHTML +=
                                        "       <td style='width:80%'>" + responseSchema.type + '</td>';
                                    responseSchemaHTML += '   </tr>';
                                    hasResponseSchema = true;
                                }

                                // response schema items
                                let responseSchemaItems = responseSchema.items;
                                if (typeof responseSchemaItems !== 'undefined') {
                                    responseSchemaHTML += '   <tr>';
                                    responseSchemaHTML += "       <td class='td-alignment-small'>&nbsp;</td>";
                                    responseSchemaHTML +=
                                        "       <td class='td-alignment-std'>" +
                                        renderSchemaItems(responseSchemaItems, swaggerJSON.definitions) +
                                        '</td>';
                                    responseSchemaHTML += '   </tr>';
                                    hasResponseSchema = true;
                                } else {
                                    responseSchemaHTML += '   <tr>';
                                    responseSchemaHTML += "       <td class='td-alignment-small'>&nbsp;</td>";
                                    responseSchemaHTML +=
                                        "       <td class='td-alignment-std'>" +
                                        renderSchemaItems(responseSchema, swaggerJSON.definitions) +
                                        '</td>';
                                    responseSchemaHTML += '   </tr>';
                                    hasResponseSchema = true;
                                }
                            }
                            responseSchemaHTML += '       </table>';
                            if (hasResponseSchema) html += responseSchemaHTML;

                            html += '       </td>';
                            html += '   </tr>';
                        }
                        html += '</table>'; //responses
                        html += '           </td>';
                        html += '    </tr>';
                        html += '</table></div>'; //TABLE FOR PATH END
                        return `<div style="page-break-inside:avoid;">
                                <h3 id="${path.action}${path.path}" class="${path.action}"><code class="huge"><span>${
                            path.action
                        }</span>${path.path}</h3> 
                                ${html}
                            </div>`;
                    })
                    .join(' ') +
                '</div>'
            );
        })
        .join(' ');

    return `<div style='page-break-after:always'>
                <h1 class='coverHeadings'>Paths</h1>
                ${paths}
            </div>`;
}

function renderDefinition(minimal, dfn, swaggerJSONdefinitions) {
    let html = ` 
    <table class='table-margin'>
       <thead>
        <tr>
               <th class='th-heading'><b>Name</b></td>
               <th class='th-heading-small'><b>Type</b></td>
               ${minimal ? '' : "           <th class='th-heading'><b>Description</b></td>"}
               <th class='th-heading'><b>Required</b></td>
           </tr>
       </thead>
       <tbody>`;

    if (swaggerJSONdefinitions[dfn].type === 'array') {
        html += "    <tr class='alternate-row'>";
        html += "           <td class='th-heading'></td>";
        html += "           <td class='th-heading-small'>array</td>";
        if (!minimal) {
            let description;
            if (typeof swaggerJSONdefinitions[dfn]['$ref'] !== 'undefined') {
                const items = swaggerJSONdefinitions[dfn]['$ref'].split('/');
                const subdfn = items[items.length - 1];
                description = `See <b><a href='#${subdfn}'>${subdfn}</a></b> in the <b>Definitions</b> section for more details.`;
            } else if (typeof swaggerJSONdefinitions[dfn]['items'] !== 'undefined') {
                if (typeof swaggerJSONdefinitions[dfn]['items'] === 'string') {
                    const items = swaggerJSONdefinitions[dfn]['items'].split('/');
                    const subdfn = items[items.length - 1];
                    description = `See <b><a href='#${subdfn}'>${subdfn}</a></b> in the <b>Definitions</b> section for more details.`;
                } else if (typeof swaggerJSONdefinitions[dfn]['items'] === 'object') {
                    if (typeof swaggerJSONdefinitions[dfn]['items']['$ref'] !== 'undefined') {
                        const items = swaggerJSONdefinitions[dfn]['items']['$ref'].split('/');
                        const subdfn = items[items.length - 1];
                        description = `See <b><a href='#${subdfn}'>${subdfn}</a></b> in the <b>Definitions</b> section for more details.`;
                    }
                }
            }
            html += `           <td class='th-heading'>${description}</td>`;
        }
        html += "           <td class='th-heading'>yes</td>";
        html += '       </tr>';
    } else {
        let index = 0;
        for (let dfnProps in swaggerJSONdefinitions[dfn].properties) {
            // eg: product_id
            html += `   <tr ${index % 2 == 0 ? 'class="alternate-row"' : ''}>`;
            html += "       <td style='width:30%;'>" + dfnProps + '</td>';
            if (swaggerJSONdefinitions[dfn].properties[dfnProps] != null) {
                html +=
                    "       <td style='width:10%;'>" +
                    (typeof swaggerJSONdefinitions[dfn].properties[dfnProps].type !== 'undefined'
                        ? swaggerJSONdefinitions[dfn].properties[dfnProps].type
                        : '') +
                    '</td>';
                if (!minimal) {
                    html += "       <td style='width:30%;'>";

                    if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]['$ref'] !== 'undefined') {
                        let items = swaggerJSONdefinitions[dfn].properties[dfnProps]['$ref'].split('/');
                        let subdfn = items[items.length - 1];
                        html += `See <b><a href='#${subdfn}'>${subdfn}</a></b> in the <b>Definitions</b> section for more details.`;
                    } else if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]['items'] !== 'undefined') {
                        if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]['items'] === 'string') {
                            let items = swaggerJSONdefinitions[dfn].properties[dfnProps]['items'].split('/');
                            let subdfn = items[items.length - 1];
                            html += `See <b><a href='#${subdfn}'>${subdfn}</a></b> in the <b>Definitions</b> section for more details.`;
                        } else if (typeof swaggerJSONdefinitions[dfn].properties[dfnProps]['items'] === 'object') {
                            if (
                                typeof swaggerJSONdefinitions[dfn].properties[dfnProps]['items']['$ref'] !== 'undefined'
                            ) {
                                let items = swaggerJSONdefinitions[dfn].properties[dfnProps]['items']['$ref'].split(
                                    '/'
                                );
                                let subdfn = items[items.length - 1];
                                html += `See <b><a href='#${subdfn}'>${subdfn}</a></b> in the <b>Definitions</b> section for more details.`;
                            }
                        }
                    } else {
                        html +=
                            typeof swaggerJSONdefinitions[dfn].properties[dfnProps].description !== 'undefined'
                                ? swaggerJSONdefinitions[dfn].properties[dfnProps].description
                                : '';
                    }

                    html += '</td>';
                }
            }

            let isRequired = false;
            if (swaggerJSONdefinitions[dfn].required != null) {
                isRequired = swaggerJSONdefinitions[dfn].required.indexOf(dfnProps) !== -1;
            }
            html += "       <td style='width:30%;'>" + (isRequired == true ? 'Yes' : 'No') + '</td>';
            html += '   </tr>';

            index++;
        }
    }
    html += '   </tbody>';
    html += '</table>';
    return html;
}

function renderSchemaItems(schemaItems, swaggerDefinitions) {
    let html = '';

    if (typeof schemaItems['$ref'] !== 'undefined') {
        // eg: #/definitions/Product
        let items = schemaItems['$ref'].split('/');
        let dfn = items[items.length - 1];
        html += `See <b><a href="#${dfn}">${dfn}</a></b> in the <b>Definitions</b> section for more details.`;
        html += '<br />';
        html += '<br />';

        html += renderDefinition(true, dfn, swaggerDefinitions);
    } else if (typeof schemaItems.type !== 'undefined') {
        html += 'Items type: ' + schemaItems.type;
    }

    return html;
}

function getTypeDefinitions(swaggerJSON) {
    let definitions = Object.keys(swaggerJSON.definitions)
        .filter(key => key !== 'Array')
        .map(definition => {
            return `<div class="div-container-margin">
                    <h2 id="${definition}">${definition}</h2>
                    <hr />
                   ${renderDefinition(false, definition, swaggerJSON.definitions)}
                </div>`;
        })
        .join(' ');

    return `<div style='page-break-after:always'>
                <h1 class='coverHeadings'>Definitions</h1>
                ${definitions}
            </div>`;
}

module.exports = {
    getStyling,
    getTitlePage,
    getIntroduction,
    getTableOfContent,
    getPathSpecifications,
    getTypeDefinitions
};

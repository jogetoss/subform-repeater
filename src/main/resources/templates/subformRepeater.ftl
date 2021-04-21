<div class="form-cell subform_repeater" ${elementMetaData!}>
    <#if !(request.getAttribute("org.joget.SubformRepeater")??) >
        <link href="${request.contextPath}/plugin/org.joget.SubformRepeater/css/subformRepeater.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="${request.contextPath}/plugin/org.joget.SubformRepeater/js/subformRepeater.js"></script>
    </#if>
    <label class="label">${element.properties.label!?html} <span class="form-cell-validator">${decoration}${customDecorator}</span><#if error??> <span class="form-error-message">${error}</span></#if></label>
    <div class="form-clear"></div>
    <div id="repeater_${elementParamName!}_${element.properties.elementUniqueKey!}" name="${elementParamName!}" class="subform_repeater_container form-element">
        <input class="position" type="hidden" name="${elementParamName!}_position" value=""/>
        <table>
            <#if element.properties.readonly! != 'true' && element.properties.addMode?? && element.properties.addMode! == "oneTop">
                <thead>
                    ${element.getRowTemplate(null, elementParamName, "oneTop")}
                </thead>    
            </#if>
            <tbody <#if element.properties.enableSorting?? && element.properties.enableSorting! == "true">class="sortable"</#if>>
                <#list rows as row>
                    ${element.getRowTemplate(row, elementParamName, "normal")}
                </#list>
            </tbody>
            <#if element.properties.readonly! != 'true' && element.properties.addMode?? && element.properties.addMode! == "oneBottom">
                <tfoot>
                    ${element.getRowTemplate(null, elementParamName, "oneBottom")}
                </tfoot>    
            </#if>
        </table>
        <div class="subform_repeater_action">
            <#if element.properties.collapsible?? && element.properties.collapsible! == "true">
                <button class="repeater_actions_collapsible rows_collapse"><span>@@form.subformRepeater.collapseAll@@</span></button>
            </#if>
            <#if element.properties.readonly! != 'true' && element.properties.addMode?? && element.properties.addMode! == "enable">
                <button class="repeater-actions-add"><span>@@form.subformRepeater.add@@</span></button>
            </#if>
        </div>
    </div>
    <script>
        $(document).ready(function() {
            var messages = {
                "expand": "@@form.subformRepeater.expand@@",
                "collapse": "@@form.subformRepeater.collapse@@",
                "expandAll": "@@form.subformRepeater.expandAll@@",
                "collapseAll": "@@form.subformRepeater.collapseAll@@",
                "deleteRow": "@@form.subformRepeater.deleteRow@@",
            }
            $("#repeater_${elementParamName!}_${element.properties.elementUniqueKey!}").subformRepeater({
                messages : messages,
                readonly : "${element.properties.readonly!}",
                addMode : "${element.properties.addMode!}",
                deleteMode : "${element.properties.deleteMode!}",
                enableSorting : "${element.properties.enableSorting!}",
                collapsible : "${element.properties.collapsible!}",
                collapsedByDefault : "${element.properties.collapsedByDefault!}",
                url : "${element.serviceUrl!}"
            });
        });
    </script>
</div>


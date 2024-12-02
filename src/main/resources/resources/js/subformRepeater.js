(function($){
    
    $.fn.extend({
        subformRepeater : function(o){
            var target = this;
            if($(target)){
                $(target).find("> table > thead > tr.grid-row, > table > tbody > tr.grid-row, > table > tfoot > tr.grid-row").each(function(){
                    initRow($(this), o);
                });
                
                if (o.collapsedByDefault === "true" && o.collapsible === "true") {
                    $(target).find("> table > tbody > tr.grid-row").each(function(){
                        if(!$(this).hasClass("collapsed-row") && $(this).find("> td > a.repeater-collapsible").length > 0) {
                            collapseRow($(this), o);
                        }
                    });
                    var button = $(target).find("> .subform_repeater_action > .repeater_actions_collapsible");
                    $(button).removeClass("rows_collapse");
                    $(button).addClass("rows_expand");
                    $(button).find("span").text(o.messages['expandAll']);
                }
                
                if ($(target).find("> table > tbody > tr.grid-row").length === 0) {
                    $(target).find("> .subform_repeater_action > .repeater_actions_collapsible").hide();
                }
                
                $(target).find("> .subform_repeater_action > .repeater_actions_collapsible").click(function(){
                    if ($(this).hasClass("rows_collapse")) {
                        $(this).removeClass("rows_collapse");
                        $(this).addClass("rows_expand");
                        $(this).find("span").text(o.messages['expandAll']);
                        
                        $(target).find("> table > tbody > tr.grid-row").each(function(){
                            if(!$(this).hasClass("collapsed-row")) {
                                collapseRow($(this), o);
                            }
                        });
                    } else {
                        $(this).addClass("rows_collapse");
                        $(this).removeClass("rows_expand");
                        $(this).find("span").text(o.messages['collapseAll']);
                        
                        $(target).find("> table > tbody > tr.grid-row").each(function(){
                            if($(this).hasClass("collapsed-row")) {
                                expandRow($(this), o);
                            }
                        });
                    }
                    return false;
                });
                
                $(target).find("> .subform_repeater_action > .repeater-actions-add").click(function(){
                    addRow(o, target, "list");
                    return false;
                });
                
                var sortable = $(target).find(".sortable");
                
                if (sortable.length > 0) {
                    $(sortable).sortable({
                        handle: ".order",
                        start: function( event, ui ) {
                            var subform_wrapper = $(ui.item).find(".subform_wrapper");
                            var width = $(target).find("> table > tbody > tr.grid-row:not(.ui-sortable-helper) > td.subform_wrapper").width();
                            $(subform_wrapper).width(width);
                        },
                        stop: function( event, ui ) {
                            var subform_wrapper = $(ui.item).find(".subform_wrapper");
                            $(subform_wrapper).css("width", "auto");
                        },
                        update: function( event, ui ) {
                            updatePositionIndex($(target), o);
                        }
                    });
                }
                
                updatePositionIndex($(target), o);
            }
            return target;
        }
    });
    
    function initRow(row, o) {
        if(o.readonly === undefined || o.readonly !== 'true'){
            $(row).find("> td > a.repeater-action-delete").click(function(){
                if (confirm(o.messages['deleteRow'])) {
                    var target = $(row).closest(".subform_repeater_container");
                    $(row).remove();
                    updatePositionIndex(target, o);
                }
            });
            
            $(row).find("> td > a.repeater-action-add").click(function(){
                addRow(o, row, "row");
            });
            
            updatePositionIndex($(row).closest(".subform_repeater_container"), o);
        }
        
        $(row).find("> td > a.repeater-collapsible").click(function(){
            if ($(row).hasClass("collapsed-row")) {
                expandRow(row, o);
            } else {
                collapseRow(row, o);
            }
        });
        attachButtonEffect();
    }
    
    function attachButtonEffect() {
        setTimeout(function () {
            Waves.attach(".subform_repeater .btn:not(.waves-button), .subform_repeater .form-button:not(.waves-button), .subform_repeater button:not(.waves-button), .subform_repeater input[type=button]:not(.waves-button), .subform_repeater input[type=reset]:not(.waves-button), .subform_repeater input[type=submit]:not(.waves-button)", [
                "btn",
                "waves-button",
                "waves-float",
            ]);
        }, 0);
    }
    
    function updatePositionIndex(target, o) {
        var position = $(target).find("> input.position");
        var uv = "";
        $(target).find("> table > thead > tr.grid-row, > table > tbody > tr.grid-row, > table > tfoot > tr.grid-row").each(function(){
            uv += $(this).find("> td > input.unique_value").val() + ";";
        });
        $(position).val(uv);
        $(target).trigger("change");
    }
    
    function addRow(o, target, mode) {
        $.ajax({
            type: "POST",
            dataType : "text",
            url: o.url,
            success: function(response) {
                var newRow = $(response);
                
                if (mode === "list") {
                    $(target).find("> table > tbody").append(newRow);
                    initRow(newRow, o);
                    $(target).find("> .subform_repeater_action > .repeater_actions_collapsible").show();
                } else {
                    $(target).before(newRow);
                    initRow(newRow, o);
                }
            }
        });
    }
    
    function collapseRow(row, o) {
        $(row).addClass("collapsed-row");
        $(row).find("> td > a.repeater-collapsible").attr("title", o.messages['expand']);
        var form = $(row).find("> td > .subform-container");
        var firstField = $(form).find(".subform-cell");
        var height = $(firstField).height() + 8;
        form.css("height", height + "px");
        form.css("overflow", "hidden");
    }
    
    function expandRow(row, o) {
        $(row).removeClass("collapsed-row");
        $(row).find("> td > a.repeater-collapsible").attr("title", o.messages['collapse']);
        var form = $(row).find("> td > .subform-container");
        form.css("height", "auto");
        form.css("overflow", "visible");
    }
})(jQuery);
"use strict";function toggleIcons(o){var n=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],s=o.find(".sf-icon-right"),o=o.find(".sf-icon-down");n?(s.hide(),o.show()):(s.show(),o.hide())}$("[data-sf-role=toggleLink]").on("click",function(){var o=$(this);o.hasClass("expanded")?toggleIcons(o,!1):toggleIcons(o)}),$("[data-sf-role=expandAll]").on("click",function(){toggleIcons($(this).closest("[data-sf-role=lists]").find("[data-sf-role=toggleLink]"))}),$("[data-sf-role=collapseAll]").on("click",function(){toggleIcons($(this).closest("[data-sf-role=lists]").find("[data-sf-role=toggleLink]"),!1)}),$(function(){$(".list-item__panel").on("click",function(){$(this).find(".plus-minus-toggle").toggleClass("collapsed")})}),$(function(){var o=window.location.hash.substring(1),n=document.getElementById(o);o&&n.click()});
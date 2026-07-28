/*!
 * This file is part of FacturaScripts
 * Copyright (C) 2023-2026 Carlos Garcia Gomez <carlos@facturascripts.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
function widgetSubaccountDraw(t,e){const a=[];e.forEach((function(e){const c=parseFloat(e.saldo||0),n=c.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),o=c<0?" text-danger":"",i=widgetSubaccountDecodeHtml(e.codsubcuenta),u=widgetSubaccountDecodeHtml(e.descripcion||""),d=$("<tr/>",{class:"clickableRow widget-subaccount-option"}).data("widget-subaccount-id",t).data("widget-subaccount-value",i),s=$("<a/>",{class:"widget-subaccount-link",href:e.url||"#",target:"_blank"}).append($("<i/>",{class:"fa-solid fa-external-link-alt fa-fw"}));d.append($("<td/>",{class:"text-center"}).append(s)),d.append($("<td/>").append($("<b/>").text(i))),d.append($("<td/>").text(u)),d.append($("<td/>",{class:"text-end"+o}).text(n)),a.push(d[0])})),$("#list_"+t).empty().append(a)}function widgetSubaccountDecodeHtml(t){if(null==t)return"";const e=document.createElement("textarea");return e.innerHTML=String(t),e.value}function widgetSubaccountSearch(t){$("#list_"+t).empty();const e=$("#"+t),a={action:"widget-subcuenta-search",active_tab:e.closest("form").find('input[name="activetab"]').val(),col_name:e.attr("name"),query:$("#modal_"+t+"_q").val(),codejercicio:$("#modal_"+t+"_ej").val(),sort:$("#modal_"+t+"_s").val()};$.ajax({method:"POST",url:window.location.href,data:a,dataType:"json",success:function(e){widgetSubaccountDraw(t,e)},error:function(t){alert(t.status+" "+t.responseText)}})}let widgetSubaccountSearchTimeouts={};function widgetSubaccountSearchKp(t,e){widgetSubaccountSearchTimeouts[t]&&clearTimeout(widgetSubaccountSearchTimeouts[t]),widgetSubaccountSearchTimeouts[t]=setTimeout((function(){widgetSubaccountSearch(t)}),400)}function widgetSubaccountSelect(t,e){$("#"+t).val(e),$("#modal_"+t).modal("hide"),$("#modal_span_"+t).text(e)}$(document).on("click",".widget-subaccount-option",(function(){const t=$(this).data("widget-subaccount-value");widgetSubaccountSelect($(this).data("widget-subaccount-id"),null==t?"":String(t))})),$(document).on("click",".widget-subaccount-link",(function(t){t.stopPropagation()}));
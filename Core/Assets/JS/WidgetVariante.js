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
function widgetVarianteDraw(t,e){const a=[];e.forEach((function(e){let n=widgetVarianteDecodeHtml(e.descripcion||"");n.length>300&&(n=n.substring(0,300)+"...");let i="";e.precio<0?i=" text-danger":0==e.precio&&(i=" text-warning");let r="";e.stock<0?r=" text-danger":0==e.stock&&(r=" text-warning");const d=widgetVarianteDecodeHtml(e.match),o=widgetVarianteDecodeHtml(e.referencia||""),c=$("<tr/>",{class:"clickableRow widget-variante-option"}).data("widget-variante-id",t).data("widget-variante-value",d),l=$("<a/>",{class:"widget-variante-link",href:e.url||"#",target:"_blank"}).append($("<i/>",{class:"fa-solid fa-external-link-alt fa-fw"}));c.append($("<td/>",{class:"text-center"}).append(l)),c.append($("<td/>").append($("<b/>").text(o)).append(document.createTextNode(" "+n))),c.append($("<td/>",{class:"text-end text-nowrap"+i}).text(e.precio_str||"")),c.append($("<td/>",{class:"text-end text-nowrap"+r}).text(e.stock_str||"")),a.push(c[0])})),$("#list_"+t).empty().append(a)}function widgetVarianteDecodeHtml(t){if(null==t)return"";const e=document.createElement("textarea");return e.innerHTML=String(t),e.value}function widgetVarianteSearch(t){$("#list_"+t).empty();let e=$("#"+t),a={action:"widget-variante-search",active_tab:e.closest("form").find('input[name="activetab"]').val(),col_name:e.attr("name"),query:$("#modal_"+t+"_q").val(),codfabricante:$("#modal_"+t+"_fab").val(),codfamilia:$("#modal_"+t+"_fam").val(),sort:$("#modal_"+t+"_s").val()};$.ajax({method:"POST",url:window.location.href,data:a,dataType:"json",success:function(e){widgetVarianteDraw(t,e)},error:function(t){alert(t.status+" "+t.responseText)}})}let widgetVarianteSearchTimeouts={};function widgetVarianteSearchKp(t,e){widgetVarianteSearchTimeouts[t]&&clearTimeout(widgetVarianteSearchTimeouts[t]),widgetVarianteSearchTimeouts[t]=setTimeout((function(){widgetVarianteSearch(t)}),400)}function widgetVarianteSelect(t,e){$("#"+t).val(e),$("#modal_"+t).modal("hide"),$("#modal_span_"+t).text(e)}$(document).on("click",".widget-variante-option",(function(){const t=$(this).data("widget-variante-value");widgetVarianteSelect($(this).data("widget-variante-id"),null==t?"":String(t))})),$(document).on("click",".widget-variante-link",(function(t){t.stopPropagation()}));
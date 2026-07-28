/*!
 * This file is part of FacturaScripts
 * Copyright (C) 2017-2019 Carlos Garcia Gomez  <carlos@facturascripts.com>
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
function listFilterAutocompleteGetData(t,e,a){var i=$("form[id="+t+"]").serializeArray();return $.each(i,(function(t,a){e[a.name]=a.value})),e.action="autocomplete",e.term=a,e}$(document).ready((function(){$(".filter-autocomplete").each((function(){var t={field:$(this).attr("data-field"),fieldcode:$(this).attr("data-fieldcode"),fieldtitle:$(this).attr("data-fieldtitle"),name:$(this).attr("data-name"),source:$(this).attr("data-source")},e=$(this).closest("form").attr("id");$(this).autocomplete({source:function(a,i){$.ajax({method:"POST",url:window.location.href,data:listFilterAutocompleteGetData(e,t,a.term),dataType:"json",success:function(t){var e=[];t.forEach((function(t){null===t.key||t.key===t.value?e.push(t):e.push({key:t.key,value:t.key+" | "+t.value})})),i(e)},error:function(t){alert(t.status+" "+t.responseText)}})},select:function(a,i){if($("form[id="+e+"] input[name="+t.name+"]").val(i.item.key),null!==i.item.key){var o=i.item.value.split(" | ");o.length>1?i.item.value=o[1]:i.item.value=o[0]}$(this).form().submit()}})}))}));
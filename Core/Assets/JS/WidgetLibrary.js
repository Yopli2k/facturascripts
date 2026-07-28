/*!
 * This file is part of FacturaScripts
 * Copyright (C) 2023-2024 Carlos Garcia Gomez <carlos@facturascripts.com>
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
function widgetLibrarySearch(e){$("#list_"+e).html("<div class='col-12 text-center pt-5 pb-5'><i class='fa-solid fa-circle-notch fa-4x fa-spin'></i></div>");let i=$("div#"+e+" input.input-hidden"),t={action:"widget-library-search",active_tab:i.closest("form").find('input[name="activetab"]').val(),col_name:i.attr("name"),widget_id:e,query:$("#modal_"+e+"_q").val(),sort:$("#modal_"+e+"_s").val()};$.ajax({method:"POST",url:window.location.href,data:t,dataType:"json",success:function(i){$("div#list_"+e).html(i.html)},error:function(e){alert(e.status+" "+e.responseText)}})}let widgetLibrarySearchTimeouts={};function widgetLibrarySearchKp(e,i){widgetLibrarySearchTimeouts[e]&&clearTimeout(widgetLibrarySearchTimeouts[e]),widgetLibrarySearchTimeouts[e]=setTimeout((function(){widgetLibrarySearch(e)}),400)}function widgetLibrarySelect(e,i,t){$("div#"+e+" input.input-hidden").val(i),$("div#"+e+" span.file-name").text(t),$("div#list_"+e+" div.file").removeClass("border-primary"),$("div#list_"+e+' div[data-idfile="'+i+'"]').addClass("border-primary"),$("#modal_"+e).modal("hide")}function widgetLibraryUpload(e,i){let t=$("div#"+e+" input.input-hidden"),a=new FormData;a.append("action","widget-library-upload"),a.append("active_tab",t.closest("form").find('input[name="activetab"]').val()),a.append("col_name",t.attr("name")),a.append("widget_id",e),a.append("file",i),$.ajax({method:"POST",url:window.location.href,data:a,dataType:"json",processData:!1,contentType:!1,success:function(i){$("div#list_"+e).html(i.html),1===i.records&&widgetLibrarySelect(e,i.new_file,i.new_filename)},error:function(e){alert(e.status+" "+e.responseText)}})}
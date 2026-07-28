/*!
 * This file is part of FacturaScripts
 * Copyright (C) 2020-2025 Carlos Garcia Gomez <carlos@facturascripts.com>
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
$(document).ready((function(){$(".calc-cost").change((function(){const a=parseFloat($(this).val()),t=parseFloat($(this.form.margen).val());t>0&&$(this.form.precio).val(a*(100+t)/100)})),$(".calc-margin").change((function(){const a=parseFloat($(this.form.coste).val()),t=parseFloat($(this).val());t>0&&$(this.form.precio).val(a*(100+t)/100)})),$(".calc-price").change((function(){$(this.form.margen).val(0)})),$("#images-container").sortable({cursor:"move",tolerance:"pointer",opacity:.65,stop:(a,t)=>{const e=Array.from(a.target.children).map((a=>a.dataset.imageId));if(e.length>0){const a=new URL(window.location.href);a.searchParams.append("action","sort-images"),$.ajax({method:"POST",url:a,data:{orden:e},dataType:"json",success:function(a){"ok"!==a.status&&alert(a.message)},error:function(a){alert(a.status+" "+a.responseText)}})}}})}));
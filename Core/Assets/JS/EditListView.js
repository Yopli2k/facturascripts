/*!
 * This file is part of FacturaScripts
 * Copyright (C) 2017-2024 Carlos Garcia Gomez <carlos@facturascripts.com>
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
var editListViewDeleteCancel="",editListViewDeleteConfirm="",editListViewDeleteMessage="",editListViewDeleteTitle="";function editListViewDelete(e){const t=document.getElementById("dynamicEditListViewDeleteModal");t&&t.remove();const i=`\n    <div class="modal fade" id="dynamicEditListViewDeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="dynamicEditListViewDeleteModalLabel" aria-hidden="true">\n      <div class="modal-dialog">\n        <div class="modal-content">\n          <div class="modal-header">\n            <h5 class="modal-title" id="dynamicEditListViewDeleteModal">${editListViewDeleteTitle}</h5>\n            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n          </div>\n          <div class="modal-body">\n            ${editListViewDeleteMessage}\n          </div>\n          <div class="modal-footer">\n            <button type="button" class="btn btn-secondary btn-spin-action" data-bs-dismiss="modal">${editListViewDeleteCancel}</button>\n            <button type="button" id="saveDynamicEditListViewDeleteModalBtn" class="btn btn-danger btn-spin-action">${editListViewDeleteConfirm}</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  `;document.body.insertAdjacentHTML("beforeend",i);const n=new bootstrap.Modal(document.getElementById("dynamicEditListViewDeleteModal"));return n.show(),document.getElementById("saveDynamicEditListViewDeleteModalBtn").addEventListener("click",(function(){editListViewSetAction(e,"delete"),n.hide()})),document.getElementById("dynamicEditListViewDeleteModal").addEventListener("hidden.bs.modal",(function(){document.getElementById("dynamicEditListViewDeleteModal").remove()})),!1}function editListViewSetAction(e,t){$("#form"+e+' :input[name="action"]').val(t),$("#form"+e).submit()}function editListViewSetOffset(e,t){$("#form"+e+' :input[name="action"]').val(""),$("#form"+e+'Offset :input[name="offset"]').val(t),$("#form"+e+"Offset").submit()}$(document).ready((function(){var e=document.getElementById("EditListViewSelected");null!==e&&e.scrollIntoView()}));
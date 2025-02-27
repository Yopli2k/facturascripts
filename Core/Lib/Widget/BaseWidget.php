<?php
/**
 * This file is part of FacturaScripts
 * Copyright (C) 2017-2022 Carlos Garcia Gomez <carlos@facturascripts.com>
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

namespace FacturaScripts\Core\Lib\Widget;

use FacturaScripts\Core\Request;
use FacturaScripts\Core\Tools;

/**
 * Description of BaseWidget
 *
 * @author Carlos García Gómez <carlos@facturascripts.com>
 */
class BaseWidget extends VisualItem
{
    /**
     * @var bool
     */
    public $autocomplete;

    /**
     * @var string
     */
    public $fieldname;

    /**
     * @var string
     */
    public $icon;

    /**
     * @var string
     */
    public $onclick;

    /**
     * @var array
     */
    public $options = [];

    /**
     * @var string
     */
    public $readonly;

    /**
     * @var bool
     */
    public $required;

    /**
     * @var int
     */
    public $tabindex;

    /**
     * @var string
     */
    private $type;

    /**
     * @var mixed
     */
    protected $value;

    /**
     * @param array $data
     */
    public function __construct($data)
    {
        parent::__construct($data);
        $this->autocomplete = false;
        $this->fieldname = $data['fieldname'];
        $this->icon = $data['icon'] ?? '';
        $this->onclick = $data['onclick'] ?? '';
        $this->readonly = $data['readonly'] ?? 'false';
        $this->tabindex = intval($data['tabindex'] ?? '-1');
        $this->required = isset($data['required']) && strtolower($data['required']) === 'true';
        $this->type = $data['type'];
        $this->loadOptions($data['children']);
        $this->assets();
    }

    /**
     * @param object $model
     * @param string $title
     * @param string $description
     * @param string $titleurl
     *
     * @return string
     */
    public function edit($model, $title = '', $description = '', $titleurl = '')
    {
        $this->setValue($model);
        $descriptionHtml = empty($description) ? '' : '<small class="form-text text-muted">' . Tools::lang()->trans($description) . '</small>';
        $labelHtml = '<label class="mb-0">' . $this->onclickHtml(Tools::lang()->trans($title), $titleurl) . '</label>';

        if (empty($this->icon)) {
            return '<div class="mb-3">'
                . $labelHtml
                . $this->inputHtml()
                . $descriptionHtml
                . '</div>';
        }

        return '<div class="mb-3">'
            . $labelHtml
            . '<div class="input-group">'
            . '<span class="input-group-text"><i class="' . $this->icon . ' fa-fw"></i></span>'
            . $this->inputHtml()
            . '</div>'
            . $descriptionHtml
            . '</div>';
    }

    /**
     * Get the widget type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return array
     */
    public function gridFormat()
    {
        return [];
    }

    /**
     * @param object $model
     *
     * @return string
     */
    public function inputHidden($model)
    {
        $this->setValue($model);
        return '<input type="hidden" name="' . $this->fieldname . '" value="' . $this->value . '"/>';
    }

    /**
     * @param object $model
     *
     * @return string
     */
    public function plainText($model)
    {
        $this->setValue($model);
        return $this->show();
    }

    /**
     * @param object $model
     * @param Request $request
     */
    public function processFormData(&$model, $request)
    {
        $model->{$this->fieldname} = $request->request->get($this->fieldname);
    }

    /**
     * Set custom fixed value to widget
     *
     * @param mixed $value
     */
    public function setCustomValue($value)
    {
        $this->value = $value;
    }

    /**
     * @return bool
     */
    public function showTableTotals(): bool
    {
        return false;
    }

    /**
     * @param object $model
     * @param string $display
     *
     * @return string
     */
    public function tableCell($model, $display = 'left')
    {
        $this->setValue($model);
        $class = $this->combineClasses($this->tableCellClass('text-' . $display), $this->class);
        return '<td class="' . $class . '">' . $this->onclickHtml($this->show()) . '</td>';
    }

    /**
     * Adds assets to the asset manager.
     */
    protected function assets()
    {
        ;
    }

    /**
     * @param string $type
     * @param string $extraClass
     *
     * @return string
     */
    protected function inputHtml($type = 'text', $extraClass = '')
    {
        $class = $this->combineClasses($this->css('form-control'), $this->class, $extraClass);
        return '<input type="' . $type . '" name="' . $this->fieldname . '" value="' . $this->value
            . '" class="' . $class . '"' . $this->inputHtmlExtraParams() . '/>';
    }

    /**
     * @return string
     */
    protected function inputHtmlExtraParams()
    {
        $params = $this->required ? ' required=""' : '';
        $params .= $this->readonly() ? ' readonly=""' : '';
        $params .= $this->autocomplete ? '' : ' autocomplete="off"';
        $params .= $this->tabindex >= 0 ? ' tabindex="' . $this->tabindex . '"' : '';

        return $params;
    }

    /**
     * @param array $children
     */
    protected function loadOptions($children)
    {
        foreach ($children as $child) {
            if ($child['tag'] === 'option') {
                $child['text'] = html_entity_decode($child['text']);
                $this->options[] = $child;
            }
        }
    }

    /**
     * @param string $inside
     * @param string $titleurl
     *
     * @return string
     */
    protected function onclickHtml($inside, $titleurl = '')
    {
        if (empty($this->onclick) || is_null($this->value)) {
            return empty($titleurl) ? $inside : '<a href="' . $titleurl . '">' . $inside . '</a>';
        }

        $params = strpos($this->onclick, '?') !== false ? '&' : '?';
        return '<a href="' . FS_ROUTE . '/' . $this->onclick . $params . 'code=' . rawurlencode($this->value)
            . '" class="cancelClickable">' . $inside . '</a>';
    }

    /**
     * @return bool
     */
    protected function readonly()
    {
        if ($this->readonly === 'dinamic') {
            return !empty($this->value);
        }

        return $this->readonly === 'true';
    }

    /**
     * @param object $model
     */
    protected function setValue($model)
    {
        $this->value = $model->{$this->fieldname} ?? null;
    }

    /**
     * @return string
     */
    protected function show()
    {
        return is_null($this->value) ? '-' : (string)$this->value;
    }

    /**
     * @param string $initialClass
     * @param string $alternativeClass
     *
     * @return string
     */
    protected function tableCellClass($initialClass = '', $alternativeClass = '')
    {
        foreach ($this->options as $opt) {
            $textClass = $this->getColorFromOption($opt, $this->value, 'text-');
            if ($textClass) {
                $alternativeClass = $textClass;
                break;
            }
        }

        $class = [trim($initialClass)];
        if ($alternativeClass) {
            $class[] = $alternativeClass;
        } elseif (is_null($this->value)) {
            $class[] = $this->colorToClass('warning', 'text-');
        }

        return implode(' ', $class);
    }
}

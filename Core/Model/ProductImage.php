<?php
/**
 * This file is part of FacturaScripts
 * Copyright (C) 2012-2022 Carlos Garcia Gomez <carlos@facturascripts.com>
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

namespace FacturaScripts\Core\Model;

/**
 * Description of ProductImage
 *
 * @author José Antonio Cuello Principal <yopli2000@gmail.com>
 */
class ProductImage extends Base\ModelClass
{
    use Base\ModelTrait;

    /**
     * Primary key.
     *
     * @var int;
     */
    public $idimage;

    /**
     * Link to Product model.
     *
     * @var int
     */
    public $idproducto;

    /**
     * Link to Variant model.
     *
     * @var string
     */
    public $referencia;

    /**
     * Link to Attached File model.
     *
     * @var int
     */
    public $idfile;

    /**
     * Returns the name of the column that is the model's primary key.
     *
     * @return string
     */
    public static function primaryColumn(): string
    {
        return 'idimage';
    }

    /**
     * Returns the name of the table that uses this model.
     *
     * @return string
     */
    public static function tableName(): string
    {
        return 'productosimagenes';
    }

    public function test(): bool
    {
        $this->referencia = $this->toolBox()->utils()->noHtml($this->referencia);
        return parent::test();
    }
}

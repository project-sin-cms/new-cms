<?php
namespace App\Mod\ContentField\Domain\Models;

use App\Domain\Models\BaseModel;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ContentField extends BaseModel
{
    protected $table = "cms_content_field";
    protected $fillable = ['title'];
}

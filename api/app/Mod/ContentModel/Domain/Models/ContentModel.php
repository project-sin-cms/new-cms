<?php
namespace App\Mod\ContentModel\Domain\Models;

use App\Domain\Models\BaseModel;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ContentModel extends BaseModel
{
    protected $table = "cms_content_model";
    protected $fillable = ['title'];
}

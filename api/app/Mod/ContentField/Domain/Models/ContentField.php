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
    protected $model_name = 'content_field';

    protected $casts = [
        'is_list_heading' => 'boolean',
        'is_required' => 'boolean'
    ];

}

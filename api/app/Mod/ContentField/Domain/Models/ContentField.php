<?php
namespace App\Mod\ContentField\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Domain\Models\Traits\AuditObservable;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ContentField extends BaseModel
{
    use AuditObservable;

    protected $table = "cms_content_field";
    protected $fillable = ['title'];

    protected $casts = [
        'is_list_heading' => 'boolean',
        'is_required' => 'boolean'
    ];

}

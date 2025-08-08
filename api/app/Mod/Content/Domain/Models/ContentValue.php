<?php
namespace App\Mod\Content\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentValue extends BaseModel
{
    protected $table = "cms_content_value";
    protected $fillable = [
        'content_id',
        'field_id',
        'value'
    ];

    public function field(): BelongsTo
    {
        return $this->belongsTo(ContentField::class, 'field_id');
    }
}

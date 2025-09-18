<?php
namespace App\Mod\Content\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $content_id
 * @property int $field_id
 * @property string $value
 * @property \Carbon\Carbon|null $publish_at
 * @property \Carbon\Carbon|null $expires_at
 * @property int|null $sort_num
 * @property mixed $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\Mod\Content\Domain\Models\Content $content
 * @property-read \App\Mod\ContentField\Domain\Models\ContentField $field
 */
class ContentValue extends BaseModel
{
    protected $table = "cms_content_value";
    protected $fillable = [
        'content_id',
        'field_id',
        'value'
    ];
    protected $model_name = 'content_value';

    public function field(): BelongsTo
    {
        return $this->belongsTo(ContentField::class, 'field_id');
    }

    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class, 'content_id');
    }
}

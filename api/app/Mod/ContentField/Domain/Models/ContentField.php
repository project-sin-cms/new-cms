<?php
namespace App\Mod\ContentField\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Mod\ContentModel\Domain\Models\ContentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $name
 * @property string $field_id
 * @property int $model_id
 * @property string $title
 * @property string $body
 * @property bool $is_required
 * @property bool $is_list_heading
 * @property string $field_type
 * @property int|null $sort_num
 * @property \Carbon\Carbon|null $publish_at
 * @property \Carbon\Carbon|null $expires_at
 * @property mixed $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\Mod\ContentModel\Domain\Models\ContentModel $model
 */
class ContentField extends BaseModel
{
    protected $table = "cms_content_field";
    protected $fillable = ['name', 'field_id', 'model_id', 'is_required', 'is_list_heading', 'field_type', 'sort_num'];
    protected $model_name = 'content_field';

    protected $casts = [
        'is_list_heading' => 'boolean',
        'is_required' => 'boolean'
    ];

    public function model(): BelongsTo
    {
        return $this->belongsTo(ContentModel::class, 'model_id');
    }

}

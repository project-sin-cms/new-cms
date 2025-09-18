<?php
namespace App\Mod\Content\Domain\Models;

use App\Domain\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $title
 * @property int $model_id
 * @property \Carbon\Carbon|null $publish_at
 * @property \Carbon\Carbon|null $expires_at
 * @property int|null $sort_num
 * @property mixed $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Mod\Content\Domain\Models\Content[] $contents
 */
class ContentCategory extends BaseModel
{
    protected $table = "cms_content_category";
    protected $fillable = ['title', 'model_id'];
    protected $model_name = 'content_category';

    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'cms_content_to_categories', 'category_id', 'content_id');
    }
}

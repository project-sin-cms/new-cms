<?php
namespace App\Mod\Content\Domain\Models;

use App\Domain\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $title
 */
class ContentCategory extends BaseModel
{
    protected $table = "cms_content_category";
    protected $fillable = ['title', 'model_id'];

    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'cms_content_to_categories', 'category_id', 'content_id');
    }
}
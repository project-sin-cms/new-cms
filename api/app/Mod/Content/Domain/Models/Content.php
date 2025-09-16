<?php
namespace App\Mod\Content\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Mod\ContentModel\Domain\Models\ContentModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 */
class Content extends BaseModel
{
    protected $table = "cms_content";
    protected $fillable = ['title'];
    protected $model_name = 'content';

    public function model(): BelongsTo
    {
        return $this->belongsTo(ContentModel::class, 'model_id');
    }

    public function values(): HasMany
    {
        return $this->hasMany(ContentValue::class, 'content_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ContentCategory::class, 'cms_content_to_categories', 'content_id', 'category_id');
    }

    public function toFlatArray(): array
    {
        $flat = $this->toArray();
        foreach ($this->values as $value) {
            $flat[$value->field->field_id] = $value->value;
        }
        unset($flat['values']); // values自体はいらなければ削除
        return $flat;
    }
}

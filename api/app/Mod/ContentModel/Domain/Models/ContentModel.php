<?php
namespace App\Mod\ContentModel\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $title
 * @property string $alias
 * @property string $description
 * @property bool $is_use_category
 */
class ContentModel extends BaseModel
{

    protected $table = "cms_content_model";
    protected $fillable = ['title'];
    protected $model_name = 'content_model';

    protected $casts = [
        'is_use_category' => 'boolean'
    ];

    public function fields(): HasMany
    {
        return $this->hasMany(ContentField::class, 'model_id')->orderBy('sort_num');
    }
}

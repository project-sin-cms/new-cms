<?php
namespace App\Mod\ContentModel\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ContentModel extends BaseModel
{
    protected $table = "cms_content_model";
    protected $fillable = ['title'];

    public function fields(): HasMany
    {
        return $this->hasMany(ContentField::class, 'model_id')->orderBy('sort_num');
    }
}

<?php

namespace App\Mod\MediaLibrary\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Domain\Models\Traits\AuditObservable;
use App\Mod\Content\Domain\Models\ContentValue;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $file_name
 * @property string $file_path
 * @property string $file_url
 * @property string $mime_type
 * @property int $file_size
 * @property string $image_size
 * @property string $alt_text
 */
class MediaLibrary extends BaseModel
{
    use AuditObservable;

    protected $table = "cms_media_library";
    protected $fillable = [
        'file_name',
        'file_path',
        'file_url',
        'mime_type',
        'file_size',
        'image_size',
        'alt_text',
        'contentValues'
    ];
    protected $model_name = "media_library";

    /**
     * このメディアを参照している ContentValue（メディア系フィールドのみ）
     * value カラムに media_library.id が入っている前提
     */
    public function contentValues(): HasMany
    {
        return $this->hasMany(ContentValue::class, 'value', 'id')
            ->whereHas('field', function ($q) {
                $q->whereIn('field_type', ['media_image', 'media_file']);
            });
    }

    public function orderBy(): array
    {
        return ['created_at' => 'desc'];
    }

}

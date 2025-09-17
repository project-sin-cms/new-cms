<?php

namespace App\Mod\MediaLibrary\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Domain\Models\Traits\AuditObservable;

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
        'alt_text'
    ];
    protected $model_name = "media_library";

    public function orderBy(): array
    {
        return ['created_at' => 'desc'];
    }
}

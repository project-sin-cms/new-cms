<?php
namespace App\Mod\ContentModel\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ContentModel extends Model
{
    use HasFactory;

    protected $table = "cms_content_model";
    protected $fillable = ['title'];
}

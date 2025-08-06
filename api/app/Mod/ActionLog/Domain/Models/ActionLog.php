<?php
namespace App\Mod\ActionLog\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ActionLog extends Model
{
    use HasFactory;

    protected $table = "cms_action_log";
    protected $fillable = ['title'];
}

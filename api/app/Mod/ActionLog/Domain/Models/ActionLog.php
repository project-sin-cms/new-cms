<?php
namespace App\Mod\ActionLog\Domain\Models;

use App\Domain\Models\BaseModel;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ActionLog extends BaseModel
{

    protected $table = "cms_action_log";
    protected $fillable = ['ip', 'user_agent', 'path', 'method', 'params', 'http_status', 'error', 'message', 'duration'];
    protected $model_name = 'action_log';

    protected $casts = [
        'params' => 'array'
    ];

    public function orderBy(): array
    {
        return ['created_at' => 'desc'];
    }
}

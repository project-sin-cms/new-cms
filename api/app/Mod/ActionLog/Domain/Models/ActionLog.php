<?php
namespace App\Mod\ActionLog\Domain\Models;

use App\Domain\Models\BaseModel;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 * @property string $ip
 * @property string $user_agent
 * @property string $path
 * @property string $method
 * @property array $params
 * @property int $http_status
 * @property string|null $error
 * @property string|null $message
 * @property float|int|null $duration
 * @property \Carbon\Carbon|null $publish_at
 * @property \Carbon\Carbon|null $expires_at
 * @property int|null $sort_num
 * @property mixed $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
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

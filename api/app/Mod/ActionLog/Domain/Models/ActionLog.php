<?php
namespace App\Mod\ActionLog\Domain\Models;

use App\Domain\Models\BaseModel;
use App\Domain\Models\Traits\AuditObservable;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class ActionLog extends BaseModel
{
    use AuditObservable;

    protected $table = "cms_action_log";
    protected $fillable = ['ip', 'user_agent', 'path', 'method', 'params', 'http_status', 'error', 'message', 'duration'];

    protected $casts = [
        'params' => 'array'
    ];

    public function orderBy(): array
    {
        return ['created_at' => 'desc'];
    }
}

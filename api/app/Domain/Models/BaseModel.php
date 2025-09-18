<?php
namespace App\Domain\Models;

use App\Domain\Models\Traits\AuditObservable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {
    use HasFactory;
    use AuditObservable;

    protected $model_name = null;

    public function __construct(array $attributes = [])
    {
        $this->fillable += ['publish_at', 'expires_at', 'sort_num', 'status'];
        $this->casts += [
            'publish_at' => 'datetime',
            'expires_at' => 'datetime',
            'sort_num' => 'int',
        ];
        parent::__construct($attributes);
    }

    public function orderBy(): array
    {
        return ['id' => 'asc'];
    }

    public function getName(): ?string
    {
        return $this->model_name;
    }
}

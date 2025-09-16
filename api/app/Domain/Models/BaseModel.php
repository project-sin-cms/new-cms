<?php
namespace App\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {
    use HasFactory;

    public function orderBy(): array
    {
        return ['id' => 'asc'];
    }
}

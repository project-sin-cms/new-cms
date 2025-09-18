<?php
namespace App\Mod\ActionLog\Database\Factories;

use App\Mod\ActionLog\Domain\Models\ActionLog;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActionLogFactory extends Factory
{
    protected $model = ActionLog::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word
        ];
    }
}

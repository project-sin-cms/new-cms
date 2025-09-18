<?php
namespace App\Mod\ContentModel\Database\Factories;

use App\Mod\ContentModel\Domain\Models\ContentModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContentModelFactory extends Factory
{
    protected $model = ContentModel::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word
        ];
    }
}

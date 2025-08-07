<?php
namespace App\Mod\ContentField\Database\Factories;

use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContentFieldFactory extends Factory
{
    protected $model = ContentField::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word
        ];
    }
}

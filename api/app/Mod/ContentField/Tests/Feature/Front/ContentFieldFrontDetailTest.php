<?php

namespace App\Mod\ContentField\Tests\Feature\Front;

use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ContentFieldFrontDetailTest extends AbstractFeatureTest
{
    public function test_detail(): void
    {
        // データ作成
        $post = ContentField::factory()->create();

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson([
            'contents' => [
                'title' => $post->title
            ]
        ]);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->get($this->getUrl('api.content_field.front.detail', $params), $headers);
    }
}

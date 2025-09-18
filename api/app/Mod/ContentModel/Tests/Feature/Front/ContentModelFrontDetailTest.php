<?php

namespace App\Mod\ContentModel\Tests\Feature\Front;

use App\Mod\ContentModel\Domain\Models\ContentModel;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ContentModelFrontDetailTest extends AbstractFeatureTest
{
    public function test_detail(): void
    {
        // データ作成
        $post = ContentModel::factory()->create();

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
        return $this->get($this->getUrl('api.content_model.front.detail', $params), $headers);
    }
}

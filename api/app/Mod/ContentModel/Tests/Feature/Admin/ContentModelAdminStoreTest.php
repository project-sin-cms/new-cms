<?php

namespace App\Mod\ContentModel\Tests\Feature\Admin;

use App\Mod\ContentModel\Domain\Models\ContentModel;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ContentModelAdminStoreTest extends AbstractFeatureTest
{

    public function test_store(): void
    {
        // 登録データ
        $inputData = ContentModel::factory()->make()->toArray();

        $testResponse = $this->apiExec([], $inputData);
        $testResponse->assertStatus(201);
        $testResponse->assertJson([
            'payload' => [
                'data' => [
                    'title' => $inputData['title']
                ]
            ]
        ]);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->post($this->getUrl('api.content_model.admin.store'), $data, $headers);
    }
}

<?php

namespace App\Mod\ActionLog\Tests\Feature\Admin;

use App\Mod\ActionLog\Domain\Models\ActionLog;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ActionLogAdminStoreTest extends AbstractFeatureTest
{

    public function test_store(): void
    {
        // 登録データ
        $inputData = ActionLog::factory()->make()->toArray();

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
        return $this->post($this->getUrl('api.admin.action_log.store'), $data, $headers);
    }
}

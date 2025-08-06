<?php
namespace App\Mod\ActionLog\Tests\Feature\Front;

use App\Mod\ActionLog\Domain\Models\ActionLog;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ActionLogFrontListTest extends AbstractFeatureTest
{
    public function test_list(): void
    {
        // データ7件作成
        ActionLog::factory(7)->create();

        // 1ページ目テスト
        $testResponse = $this->apiExec(['current' => 1, 'limit' => 5]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson(['all' => 7]);
        $testResponse->assertJsonCount(5, 'contents');

        // 2ページ目テスト
        $testResponse = $this->apiExec(['current' => 2, 'limit' => 5]);
        $testResponse->assertStatus(200);
        $testResponse->assertJson(['all' => 7]);
        $testResponse->assertJsonCount(2, 'contents');
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        return $this->get($this->getUrl('api.action_log.front.list', $params), $headers);
    }
}

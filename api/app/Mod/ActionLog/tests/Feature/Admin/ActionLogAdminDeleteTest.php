<?php

namespace App\Mod\ActionLog\Tests\Feature\Admin;

use App\Mod\ActionLog\Domain\Models\ActionLog;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ActionLogAdminDeleteTest extends AbstractFeatureTest
{
    public function test_delete(): void
    {
        $post = ActionLog::factory()->create();
        $this->assertEquals(1, ActionLog::count());

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(204);

        $this->assertEquals(0, ActionLog::count());
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->delete($this->getUrl('api.admin.action_log.delete', $params), $data, $headers);
    }
}

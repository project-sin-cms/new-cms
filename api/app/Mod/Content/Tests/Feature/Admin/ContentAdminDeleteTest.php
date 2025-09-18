<?php

namespace App\Mod\Content\Tests\Feature\Admin;

use App\Mod\Content\Domain\Models\Content;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ContentAdminDeleteTest extends AbstractFeatureTest
{
    public function test_delete(): void
    {
        $post = Content::factory()->create();
        $this->assertEquals(1, Content::count());

        $testResponse = $this->apiExec(['id' => $post->id]);
        $testResponse->assertStatus(204);

        $this->assertEquals(0, Content::count());
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->delete($this->getUrl('api.content.admin.delete', $params), $data, $headers);
    }
}

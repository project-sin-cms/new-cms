<?php

namespace App\Mod\ContentField\Tests\Feature\Admin;

use App\Mod\ContentField\Domain\Models\ContentField;
use Illuminate\Testing\TestResponse;
use Tests\Feature\AbstractFeatureTest;

class ContentFieldAdminUpdateTest extends AbstractFeatureTest
{

    public function test_update(): void
    {
        // データ作成
        $updateData = ContentField::factory()->create()->toArray();
        $updateData['title'] = $updateData['title'] . ' edit';

        $testResponse = $this->apiExec(['id' => $updateData['id']], $updateData);
        $testResponse->assertStatus(204);

        // 更新確認
        $post = ContentField::find($updateData['id']);
        $this->assertEquals($updateData['title'], $post->title);
    }

    protected function apiExec(array $params = [], array $data = [], array $headers = []): TestResponse
    {
        // TODO: Implement apiExec() method.
        return $this->put($this->getUrl('api.content_field.admin.update', $params), $data, $headers);
    }
}

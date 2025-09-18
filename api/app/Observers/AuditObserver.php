<?php

namespace App\Observers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * データ登録時共通処理
 */
class AuditObserver
{
    /**
     * 保存時
     */
    public function saving(Model $model): void
    {
        $modelName = (string)$model->getName();

        // free_search登録処理
        if (config("{$modelName}.saving.update_free_search", true)) {
            $ignoreFields = ['password', 'free_search', 'created_by_roles', 'updated_by_roles', 'created_at', 'updated_at'];
            $modelData = $model->toArray();
            $freeSearch = $this->getFreeWordContents([], $ignoreFields, $modelData);
            $model->free_search = serialize($freeSearch);
        }
    }

    protected function getFreeWordContents(array $freeSearch = [], array $ignoreFields = [], array $modelData = []): array
    {
        foreach ($modelData as $key => $value) {
            if (is_array($value)) {
                $freeSearch = $this->getFreeWordContents($freeSearch, $ignoreFields, $value);
            } else if (is_string($value)) {
                if (in_array($key, $ignoreFields)) {
                    continue;
                }

                $freeSearch[] = $value;
            }
        }

        return $freeSearch;
    }
}

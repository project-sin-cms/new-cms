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
        $connection = $model->getConnection();
        $connectionName = $connection->getName();

        // contents登録処理
        $result = DB::connection($connectionName)->select("DESCRIBE {$model->getTable()} free_search");
        if (!empty($result)) {
            $contents = [];
            $allowType = ['text', 'varchar', 'longtext'];
            $ignoreFields = ['password', 'free_search', 'created_by_roles', 'updated_by_roles'];

            // カラム情報取得
            $columns = DB::connection($connectionName)->select("DESCRIBE {$model->getTable()}");
            foreach ($columns as $column) {
                $isAllow = false;
                $field = $column->Field;

                // テキスト型のみ
                foreach ($allowType as $type) {
                    if (strpos($column->Type, $type) !== false) {
                        $isAllow = true;
                        break;
                    }
                }

                // 除外カラム
                if (in_array($field, $ignoreFields)) {
                    $isAllow = false;
                }

                if ($isAllow) {
                    if (is_string($model->{$field})) {
                        $contents[] = $model->{$field};
                    }
                    elseif(is_array($model->{$field})) {
                        // 配列内のテキスト
                        $vals = [];
                        foreach ($model->{$field} as $value) {
                            if (is_string($value)) {
                                $vals[] = $value;
                            }
                        }
                        if (!empty($vals)) {
                            $contents[] = $vals;
                        }
                    }
                }
            }
            $model->free_search = serialize($contents);
        }
    }
}

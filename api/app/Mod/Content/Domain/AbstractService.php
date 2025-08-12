<?php
namespace App\Mod\Content\Domain;

use App\Domain\BaseService;
use App\Mod\Content\Domain\Models\Content;
use App\Mod\ContentModel\Domain\Models\ContentModel;
use Illuminate\Support\Facades\Route;

abstract class AbstractService extends BaseService
{
    protected $contentModel;
    
    public function __construct($model)
    {
        parent::__construct($model);
        
        // Content Modelの取得
        $route = Route::current();
        $modelName = $route->parameter('model_name');
        if (!$modelName) {
            abort(404);
        }
        $contentModel = ContentModel::where('alias', $modelName)->first();
        if (!$contentModel) {
            abort(404);
        }
        $this->contentModel = $contentModel;
    }

    protected function beforeSave($request, $post, &$inputs): void
    {
        // model idの追加
        $inputs['model_id'] = $this->contentModel->id;
    }

    protected function appendCriteria($criteria = [], $query): void
    {
        // デフォルトでmodelでフィルター
        $query->where('model_id', $this->contentModel->id);
        parent::appendCriteria($criteria, $query);
    }
}
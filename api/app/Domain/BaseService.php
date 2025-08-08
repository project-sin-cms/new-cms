<?php
namespace App\Domain;

use Symfony\Component\HttpFoundation\Request;

/**
 * 
 */
class BaseService
{
    protected $model = null;

    public function __construct(mixed $model)
    {
        $this->model = $model;
    }

    public function findList(Request $request, ?int $limit = 10, array $with = []): array
    {
        $current = (int)$request->query->get('current', 1);
        $limit = (int)$request->query->get('limit', $limit);
        $posts = $this->model::where(function ($query) use ($request) {
            $criteria = $request->get('criteria', []);
            $this->appendCriteria($criteria, $query);
        })->with($with)->paginate($limit, ['*'], 'page', $current);

        return [
            'total' => $posts->total(),
            'current' => $posts->currentPage(),
            'pages' => $posts->lastPage(),
            'limit' => $posts->perPage(),
            'data' => $posts->items(),
        ];
    }

    public function findAll(Request $request, array $with = []): array
    {
        $posts = $this->model::where(function ($query) use ($request) {
            $criteria = $request->get('criteria', []);
            $this->appendCriteria($criteria, $query);
        })->with($with)->get();

        return ['data' => $posts];
    }

    public function findDetail(Request $request, ?int $id, array $with = []): mixed
    {
        $post = $this->model::where(function($query) use ($request) {
            $criteria = $request->get('criteria', []);
            $this->appendCriteria($criteria, $query);
        })->with($with)->findOrFail($id);
        return $post;
    }

    public function findOneBy(Request $request, array $with = []): mixed
    {
        $post = $this->model::where(function ($query) use ($request) {
            $criteria = $request->get('criteria', []);
            $this->appendCriteria($criteria, $query);
        })->with($with)->first();

        return $post;
    }

    public function save(Request $request, ?int $id = null): mixed
    {
        $modelName = $this->model;
        $post = $id ? $this->findDetail($request, $id) : new $modelName();
        $this->validateRequest($request, $post);
        $inputs = $request->request->all();
        foreach ($inputs as $key => $val) {
            $post->{$key} = $val;
        }
        $post->save();

        return $post;
    }

    public function delete(Request $request, ?int $id = null): array
    {
        $model = $this->findDetail($request, $id);
        $model->delete();

        return [
            'id' => $model->id,
            'result' => true
        ];
    }

    protected function appendCriteria($criteria = [], $query): void
    {
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
    }

    protected function validateRequest(Request $request, mixed $post = null): void
    {
        // Default does nothing. Override in subclass.
    }
}
<?php
namespace App\Mod\Content\Actions\Admin\Category;

use App\Http\Actions\BaseAction;
use App\Mod\Content\Domain\ContentCategoryService as Domain;
use App\Mod\Content\Responder\Admin\Category\ResourceResponder as Responder;
use Symfony\Component\HttpFoundation\Request;

/**
 * @property Domain $domain
 * @property Responder $responder
 */
class ResourceAction extends BaseAction
{

    public function __construct(Domain $domain, Responder $responder)
    {
        parent::__construct($domain, $responder);
        $this->domain->setIsFlat(true);
    }

    protected function callback(Request $request): array
    {
        return [
            'success' => true,
            'timestamp' => now()->timestamp,
            'payload' => $this->domain->findAll($request)
        ];
    }
}

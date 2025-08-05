<?php
namespace App\Mod\ContentModel\Actions\Front;

use App\Http\Actions\BaseAction;
use App\Mod\ContentModel\Domain\ContentModelService as Domain;
use App\Mod\ContentModel\Responder\Front\ListResponder as Responder;
use Symfony\Component\HttpFoundation\Request;

/**
 * @property Domain $domain
 * @property Responder $responder
 */
class ListAction extends BaseAction
{
    public function __construct(Domain $domain, Responder $responder)
    {
        parent::__construct($domain, $responder);
    }

    protected function callback(Request $request): array
    {
        $list = $this->domain->findList($request);
        return [
            'success' => true,
            'timestamp' => now()->timestamp,
            'all' => $list['total'],
            'current' => $list['current'],
            'limit' => $list['limit'],
            'pages' => $list['pages'],
            'contents' => $list['data']
        ];
    }
}

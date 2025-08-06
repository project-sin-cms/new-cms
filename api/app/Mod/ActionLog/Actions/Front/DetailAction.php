<?php

namespace App\Mod\ActionLog\Actions\Front;

use App\Http\Actions\BaseAction;
use App\Mod\ActionLog\Domain\ActionLogService as Domain;
use App\Mod\ActionLog\Responder\Front\DetailResponder as Responder;
use Symfony\Component\HttpFoundation\Request;

/**
 * @property Domain $domain
 * @property Responder $responder
 */
class DetailAction extends BaseAction
{
    public function __construct(Domain $domain, Responder $responder)
    {
        parent::__construct($domain, $responder);
    }

    protected function callback(Request $request): array
    {
        $id = $request->route('id');
        return [
            'success' => true,
            'timestamp' => now()->timestamp,
            'contents' => $this->domain->findDetail($id)
        ];
    }
}

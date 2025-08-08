<?php

namespace App\Mod\Content\Actions\Admin;

use App\Http\Actions\BaseAction;
use App\Mod\Content\Domain\ContentService as Domain;
use App\Mod\Content\Responder\Admin\UpdateResponder as Responder;
use Symfony\Component\HttpFoundation\Request;

/**
 * @property Domain $domain
 * @property Responder $responder
 */
class UpdateAction extends BaseAction
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
            'payload' => [
                'data' => $this->domain->save($request, $id)
            ]
        ];
    }
}

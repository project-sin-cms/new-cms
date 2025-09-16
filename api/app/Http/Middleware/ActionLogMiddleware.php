<?php

namespace App\Http\Middleware;

use App\Mod\ActionLog\Domain\Models\ActionLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ActionLogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        $actionLog = [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'method' => $request->method(),
            'path' => $request->path(),
            'params' => $this->sanitizeParams($request->all())
        ];

        $response = $next($request);

        // 実行時間を計測
        $duration = microtime(true) - $startTime;
        $actionLog += [
            'duration' => $duration,
            'http_status' => $response->getStatusCode(),
        ];

        // ログ保存
        ActionLog::create($actionLog);

        return $response;
    }

    private function sanitizeParams(array $params): array
    {
        $mask = ['password', 'token', 'api_key'];

        foreach ($mask as $key) {
            if (isset($mask[$key])) {
                $params[$key] = '******';
            }
        }

        return $params;
    }
}

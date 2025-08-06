<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('front')->name('front.')->group(function () {
        Route::prefix('action_log')->name('action_log.')->group(function () {
            Route::get('/list', [App\Mod\ActionLog\Actions\Front\ListAction::class, '__invoke'])->name('list');
            Route::get('/detail/{id}', [App\Mod\ActionLog\Actions\Front\DetailAction::class, '__invoke'])->name('detail');
        });
    });
});

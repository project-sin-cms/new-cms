<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('front')->name('front.')->group(function () {
        Route::prefix('content_model')->name('content_model.')->group(function () {
            Route::get('/list', [App\Mod\ContentModel\Actions\Front\ListAction::class, '__invoke'])->name('list');
            Route::get('/detail/{id}', [App\Mod\ContentModel\Actions\Front\DetailAction::class, '__invoke'])->name('detail');
        });
    });
});

<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('front')->name('front.')->group(function () {
        Route::prefix('content_field')->name('content_field.')->group(function () {
            Route::get('/list', [App\Mod\ContentField\Actions\Front\ListAction::class, '__invoke'])->name('list');
            Route::get('/detail/{id}', [App\Mod\ContentField\Actions\Front\DetailAction::class, '__invoke'])->name('detail');
        });
    });
});

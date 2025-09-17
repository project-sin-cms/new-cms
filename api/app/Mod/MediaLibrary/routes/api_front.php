<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('front')->name('front.')->group(function () {
        Route::prefix('media_library')->name('media_library.')->group(function () {
            Route::get('/list', [App\Mod\MediaLibrary\Actions\Front\ListAction::class, '__invoke'])->name('list');
            Route::get('/detail/{id}', [App\Mod\MediaLibrary\Actions\Front\DetailAction::class, '__invoke'])->name('detail');
        });
    });
});

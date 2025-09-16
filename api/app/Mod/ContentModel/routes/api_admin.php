<?php

use App\Http\Middleware\ActionLogMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([ActionLogMiddleware::class])->prefix('api')->name('api.')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::prefix('content_model')->name('content_model.')->group(function () {
            Route::get('/', [App\Mod\ContentModel\Actions\Admin\ListAction::class, '__invoke'])->name('list');
            Route::get('/resource', [App\Mod\ContentModel\Actions\Admin\ResourceAction::class, '__invoke'])->name('resource');
            Route::get('/find', [App\Mod\ContentModel\Actions\Admin\FindAction::class, '__invoke'])->name('find');
            Route::post('/store', [App\Mod\ContentModel\Actions\Admin\StoreAction::class, '__invoke'])->name('store');
            Route::get('/{id}', [App\Mod\ContentModel\Actions\Admin\DetailAction::class, '__invoke'])->name('detail');
            Route::put('/{id}', [App\Mod\ContentModel\Actions\Admin\UpdateAction::class, '__invoke'])->name('update');
            Route::delete('/{id}', [App\Mod\ContentModel\Actions\Admin\DeleteAction::class, '__invoke'])->name('delete');
        });
    });

});

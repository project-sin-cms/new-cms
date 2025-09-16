<?php

use App\Http\Middleware\ActionLogMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([ActionLogMiddleware::class])->prefix('api')->name('api.')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::prefix('content_field')->name('content_field.')->group(function () {
            Route::get('/', [App\Mod\ContentField\Actions\Admin\ListAction::class, '__invoke'])->name('list');
            Route::post('/store', [App\Mod\ContentField\Actions\Admin\StoreAction::class, '__invoke'])->name('store');
            Route::get('/{id}', [App\Mod\ContentField\Actions\Admin\DetailAction::class, '__invoke'])->name('detail');
            Route::put('/{id}', [App\Mod\ContentField\Actions\Admin\UpdateAction::class, '__invoke'])->name('update');
            Route::delete('/{id}', [App\Mod\ContentField\Actions\Admin\DeleteAction::class, '__invoke'])->name('delete');
        });
    });

});

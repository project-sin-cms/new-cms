<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::prefix('action_log')->name('action_log.')->group(function () {
            Route::get('/', [App\Mod\ActionLog\Actions\Admin\ListAction::class, '__invoke'])->name('list');
            Route::post('/store', [App\Mod\ActionLog\Actions\Admin\StoreAction::class, '__invoke'])->name('store');
            Route::get('/{id}', [App\Mod\ActionLog\Actions\Admin\DetailAction::class, '__invoke'])->name('detail');
            Route::put('/{id}', [App\Mod\ActionLog\Actions\Admin\UpdateAction::class, '__invoke'])->name('update');
            Route::delete('/{id}', [App\Mod\ActionLog\Actions\Admin\DeleteAction::class, '__invoke'])->name('delete');
        });
    });
    
});

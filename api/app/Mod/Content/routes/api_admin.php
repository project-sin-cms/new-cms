<?php
use Illuminate\Support\Facades\Route;

Route::prefix('api')->name('api.')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::prefix('content')->name('content.')->group(function () {

            Route::prefix('{model_name}')->name('model.')->where(['model_name' => '[a-zA-Z0-9_-]+'])->group(function () {

                Route::prefix('category')->name('category.')->group(function () {
                    Route::get('/', [App\Mod\Content\Actions\Admin\Category\ListAction::class, '__invoke'])->name('list');
                    Route::post('/store', [App\Mod\Content\Actions\Admin\Category\StoreAction::class, '__invoke'])->name('store');
                    Route::get('/resource', [App\Mod\Content\Actions\Admin\Category\ResourceAction::class, '__invoke'])->name('resource');
                    Route::get('/find', [App\Mod\Content\Actions\Admin\Category\FindAction::class, '__invoke'])->name('find');
                    Route::get('/{id}', [App\Mod\Content\Actions\Admin\Category\DetailAction::class, '__invoke'])->name('detail');
                    Route::put('/{id}', [App\Mod\Content\Actions\Admin\Category\UpdateAction::class, '__invoke'])->name('update');
                    Route::delete('/{id}', [App\Mod\Content\Actions\Admin\Category\DeleteAction::class, '__invoke'])->name('delete');
                });

                Route::get('/', [App\Mod\Content\Actions\Admin\ListAction::class, '__invoke'])->name('list');
                Route::post('/store', [App\Mod\Content\Actions\Admin\StoreAction::class, '__invoke'])->name('store');
                Route::get('/resource', [App\Mod\Content\Actions\Admin\ResourceAction::class, '__invoke'])->name('resource');
                Route::get('/find', [App\Mod\Content\Actions\Admin\FindAction::class, '__invoke'])->name('find');
                Route::get('/{id}', [App\Mod\Content\Actions\Admin\DetailAction::class, '__invoke'])->name('detail');
                Route::put('/{id}', [App\Mod\Content\Actions\Admin\UpdateAction::class, '__invoke'])->name('update');
                Route::delete('/{id}', [App\Mod\Content\Actions\Admin\DeleteAction::class, '__invoke'])->name('delete');
            });
        });
    });

});

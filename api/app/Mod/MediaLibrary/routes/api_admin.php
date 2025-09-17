<?php
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\ActionLogMiddleware;

Route::middleware([ActionLogMiddleware::class])->prefix('api')->name('api.')->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::prefix('media_library')->name('media_library.')->group(function () {
            Route::get('/', [App\Mod\MediaLibrary\Actions\Admin\ListAction::class, '__invoke'])->name('list');
            Route::post('/store', [App\Mod\MediaLibrary\Actions\Admin\StoreAction::class, '__invoke'])->name('store');
            Route::get('/resource', [App\Mod\MediaLibrary\Actions\Admin\ResourceAction::class, '__invoke'])->name('resource');
            Route::get('/find', [App\Mod\MediaLibrary\Actions\Admin\FindAction::class, '__invoke'])->name('find');
            Route::post('/update_media/{id}', [App\Mod\MediaLibrary\Actions\Admin\UpdateMediaAction::class, '__invoke'])->name('update_media');
            Route::get('/{id}', [App\Mod\MediaLibrary\Actions\Admin\DetailAction::class, '__invoke'])->name('detail');
            Route::put('/{id}', [App\Mod\MediaLibrary\Actions\Admin\UpdateAction::class, '__invoke'])->name('update');
            Route::delete('/{id}', [App\Mod\MediaLibrary\Actions\Admin\DeleteAction::class, '__invoke'])->name('delete');
        });
    });

});

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cms_content_to_categories', function (Blueprint $table) {
            $table->foreignId('content_id');
            $table->foreignId('category_id');

            $table->foreign('content_id')
                ->references('id')
                ->on('cms_content')
                ->cascadeOnDelete()
            ;

            $table->foreign('category_id')
                ->references('id')
                ->on('cms_content_category')
                ->cascadeOnDelete()
            ;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cms_content_to_categories');
    }
};

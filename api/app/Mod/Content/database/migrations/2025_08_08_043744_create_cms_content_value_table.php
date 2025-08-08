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
        Schema::create('cms_content_value', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->nullable();
            $table->foreignId('field_id')->nullable();
            $table->longText('value');
            $table->schedule();
            $table->sortable();
            $table->statusable();
            $table->timestamps();
            $table->authoredBy();

            $table->foreign('content_id')
                ->references('id')
                ->on('cms_content')
                ->cascadeOnDelete()
            ;

            $table->foreign('field_id')
                ->references('id')
                ->on('cms_content_field')
                ->cascadeOnDelete()
            ;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cms_content_value');
    }
};

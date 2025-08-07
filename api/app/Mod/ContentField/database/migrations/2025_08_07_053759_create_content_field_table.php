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
        Schema::create('cms_content_field', function (Blueprint $table) {
            $table->id();
            $table->foreignId('model_id')->nullable();
            $table->longText('name')->nullable();
            $table->longText('field_id')->nullable();
            $table->boolean('is_required')->nullable()->default(0);
            $table->boolean('is_list_heading')->nullable()->default(0);
            $table->string('field_type')->nullable();
            $table->schedule();
            $table->sortable();
            $table->statusable();
            $table->timestamps();
            $table->authoredBy();

            $table->foreign('model_id')
                ->references('id')
                ->on('cms_content_model')
                ->cascadeOnDelete()
            ;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cms_content_field');
    }
};

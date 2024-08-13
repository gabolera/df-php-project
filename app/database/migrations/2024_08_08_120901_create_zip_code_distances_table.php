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
        Schema::create('zip_code_distance', function (Blueprint $table) {
            $table->id()->primary();
            $table->bigInteger('from_id');
            $table->foreign('from_id')->references('id')->on('zip_codes');
            $table->bigInteger('to_id');
            $table->foreign('to_id')->references('id')->on('zip_codes');
            $table->decimal('distance', 11, 3);
            $table->timestamps();
            $table->unique(['from_id', 'to_id']);
            $table->index(['from_id', 'to_id']);
            $table->index(['to_id', 'from_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zip_code_distance');
    }
};

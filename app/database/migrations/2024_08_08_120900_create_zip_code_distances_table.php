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
        Schema::create('zip_code_distances', function (Blueprint $table) {
            $table->id();
            $table->string('from', 8);
            $table->string('to', 8);
            $table->decimal('distance', 11, 3);
            $table->json('coordinates')->nullable();
            $table->timestamps();
            $table->unique(['from', 'to']);
            $table->index(['from', 'to']);
            $table->index(['to', 'from']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zip_code_distances');
    }
};

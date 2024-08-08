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
        Schema::create('zip_codes', function (Blueprint $table) {
            $table->string('cep', 8)->unique()->primary();
            $table->string('state', 2);
            $table->string('city');
            $table->string('neighborhood')->nullable();
            $table->string('street')->nullable();
            $table->json('coordinates')->nullable();
            $table->timestamps();
            $table->index('cep');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zip_code');
    }
};

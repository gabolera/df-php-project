<?php

use App\Enums\BatchFileItemStatusEnum;
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
        Schema::create('batch_file_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('batch_file_id')->unsigned();
            $table->foreign('batch_file_id')->references('id')->on('batch_files');
            $table->string('zip_code_from');
            $table->string('zip_code_to');
            $table->integer('status')->default(BatchFileItemStatusEnum::Pending->value);
            $table->longText('error_message')->nullable();
            $table->bigInteger('zip_code_distance_id')->unsigned()->nullable()->comment('Distance calculated reference id');
            $table->foreign('zip_code_distance_id')->references('id')->on('zip_code_distance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_file_items');
    }
};

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
        Schema::create('events', function (Blueprint $table) {
            $table->id('event_id');
            $table->foreignId('instructor_id')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->string('name', 255);
            $table->string('description', 255)->nullable();
            $table->string('event_color', 7)->default('#e3e3e3');
            $table->integer('participants_limit');
            $table->foreignId('offer_id')->nullable()->constrained('offers', 'offer_id')->nullOnDelete();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};

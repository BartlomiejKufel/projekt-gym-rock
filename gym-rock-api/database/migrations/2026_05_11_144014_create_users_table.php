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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('name', 100);
            $table->string('surname', 255);
            $table->string('login', 100)->unique();
            $table->string('password', 100);
            $table->string('email', 255)->unique();
            $table->date('date_of_birth')->nullable();
            $table->binary('profile_picture')->nullable();

            $table->foreignId('role_id')->constrained('roles', 'role_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

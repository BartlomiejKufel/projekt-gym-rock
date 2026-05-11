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
        Schema::create('purchase_histories', function (Blueprint $table) {
            $table->id('purchase_id');
            $table->foreignId('customer_id')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->foreignId('employee_id')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->float('price');
            $table->dateTime('purchase_date');
            $table->foreignId('offer_id')->nullable()->constrained('offers', 'offer_id')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_histories');
    }
};

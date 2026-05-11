<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Role::insert([
            ['name' => 'admin'],
            ['name' => 'pracownik'],
            ['name' => 'instruktor'],
            ['name' => 'klient'],
        ]);

        User::insert([
            [
                'name' => 'Jan',
                'surname' => 'Kowalski',
                'login' => 'admin',
                'password' => 'admin',
                'email' => 'jan.kowalski@example.com',
                'date_of_birth' => '1985-04-12',
                'role_id' => 1,
            ],
            [
                'name' => 'Anna',
                'surname' => 'Nowak',
                'login' => 'pracownik',
                'password' => 'pracownik',
                'email' => 'anna.nowak@example.com',
                'date_of_birth' => '1992-11-23',
                'role_id' => 2,
            ],
            [
                'name' => 'Piotr',
                'surname' => 'Wiśniewski',
                'login' => 'instruktor',
                'password' => 'instruktor',
                'email' => 'piotr.wisniewski@example.com',
                'date_of_birth' => '1995-07-08',
                'role_id' => 3,
            ],
            [
                'name' => 'Marta',
                'surname' => 'Wójcik',
                'login' => 'klient',
                'password' => 'klient',
                'email' => 'marta.wojcik@example.com',
                'date_of_birth' => '2002-02-15',
                'role_id' => 4,
            ]
        ]);
    }
}

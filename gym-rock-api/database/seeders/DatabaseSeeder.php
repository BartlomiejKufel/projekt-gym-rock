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
                'surname' => 'Wisniewski',
                'login' => 'instruktor',
                'password' => 'instruktor',
                'email' => 'piotr.wisniewski@example.com',
                'date_of_birth' => '1995-07-08',
                'role_id' => 3,
            ],
            [
                'name' => 'Marta',
                'surname' => 'Wojcik',
                'login' => 'klient',
                'password' => 'klient',
                'email' => 'marta.wojcik@example.com',
                'date_of_birth' => '2002-02-15',
                'role_id' => 4,
            ]
        ]);
        
        Offer::insert([
            [
                'name' => 'Karnet Standard',
                'price' => 200.0,
                'duration' => 30,
            ],
            [
                'name' => 'Karnet Studencki',
                'price' => 160.0,
                'duration' => 30,
            ],
            [
                'name' => 'MoonBoard',
                'price' => 100.0,
                'duration' => 15,
            ],
            [
                'name' => 'Sauna',
                'price' => 25.0,
                'duration' => 1,
            ],
            [
                'name' => 'Wejście jednorazowe',
                'price' => 45.0,
                'duration' => 1,
            ],
            [
                'name' => 'Wejście ulgowe',
                'price' => 35.0,
                'duration' => 1,
            ],
            [
                'name' => 'Wejście poranne',
                'price' => 30.0,
                'duration' => 1,
            ],
            [
                'name' => 'Karnet Półroczny',
                'price' => 950.0,
                'duration' => 180,
            ],
            [
                'name' => 'Trening personalny',
                'price' => 120.0,
                'duration' => 1,
            ],
            [
                'name' => 'Sekcja wspinaczkowa',
                'price' => 240.0,
                'duration' => 30,
            ],
            [
                'name' => 'Kurs asekuracji dołowej',
                'price' => 300.0,
                'duration' => 1,
            ],
        ]);

    }
}

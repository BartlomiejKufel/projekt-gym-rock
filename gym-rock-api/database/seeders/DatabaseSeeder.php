<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use App\Models\Offer;
use App\Models\PurchaseHistory;
use App\Models\Entrance;
use App\Models\Notification;
use App\Models\QrCard;
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

        $pp1Path = database_path('seeders/images/pp1.png');
        $pp2Path = database_path('seeders/images/pp2.png');
        $pp3Path = database_path('seeders/images/pp3.png');
        $pp4Path = database_path('seeders/images/pp4.png');

        User::insert([
            [
                'name' => 'Jan',
                'surname' => 'Kowalski',
                'login' => 'admin',
                'password' => Hash::make('admin'),
                'email' => 'jan.kowalski@example.com',
                'date_of_birth' => '1985-04-12',
                'profile_picture' => file_get_contents($pp1Path),
                'role_id' => 1,
            ],
            [
                'name' => 'Anna',
                'surname' => 'Nowak',
                'login' => 'pracownik',
                'password' => Hash::make('pracownik'),
                'email' => 'anna.nowak@example.com',
                'date_of_birth' => '1992-11-23',
                'profile_picture' => file_get_contents($pp2Path),
                'role_id' => 2,
            ],
            [
                'name' => 'Piotr',
                'surname' => 'Wisniewski',
                'login' => 'instruktor',
                'password' => Hash::make('instruktor'),
                'email' => 'piotr.wisniewski@example.com',
                'date_of_birth' => '1995-07-08',
                'profile_picture' => file_get_contents($pp3Path),
                'role_id' => 3,
            ],
            [
                'name' => 'Marta',
                'surname' => 'Wojcik',
                'login' => 'klient',
                'password' => Hash::make('klient'),
                'email' => 'marta.wojcik@example.com',
                'date_of_birth' => '2002-02-15',
                'profile_picture' => file_get_contents($pp4Path),
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
                'duration' => 0,
            ],
            [
                'name' => 'Sekcja wspinaczkowa',
                'price' => 240.0,
                'duration' => 30,
            ],
            [
                'name' => 'Kurs asekuracji dołowej',
                'price' => 300.0,
                'duration' => 0,
            ],
            [
                'name' => 'Wydarzenie',
                'price' => 30.0,
                'duration' => 0,
            ],
        ]);

        PurchaseHistory::insert([
            [
                'customer_id' => 4,
                'employee_id' => 2,
                'price' => 160.0,
                'purchase_date' => now(),
                'offer_id' => 2,
            ],
        ]);

        $entrances = [];

        for ($i = 0; $i < 30; $i+=2) {
            $entrances[] = [
                'user_id' => 4, 
                'date_of_entry' => now()->subDays($i)->toDateString(), 
                'start_time' => '15:20:00', 
                'end_time' => '19:50:00', 
                'time_spent' => '04:30:00'
            ];
        }

        Entrance::insert($entrances);

        Notification::insert([
            'creator_id' => 2,
            'name' => "Gratisy",
            'description' => "Na recepcji można jednorazowo odebrać magnezję w kostce.",
            'start_date' => now(),
            'end_date' => now()->addDays(30)
        ]);

        $qrPath = database_path('seeders/images/qr.png');
        $binaryQR = file_get_contents($qrPath);

        $qrs = [];

        for ($i = 2; $i <= 4; $i++) {
            $qrs[] = [
                'user_id' => "$i",
                'qr_code' => $binaryQR,
                'date_of_creation' => now(),
            ];
        }

        QrCard::insert($qrs);
    }
}

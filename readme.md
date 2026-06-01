# Gym Rock - aplikacja webowa dla klientów ścianki wspinaczkowej

**Gym Rock** to aplikacja webowa przeznaczona dla klientów ścianki wspinaczkowej. Jej głównym zadaniem jest możliwość śledzenia wykupionych usług i produktów, historii zakupów, organizacja wydarzeń grupowych oraz zarządzanie wejściami za pomocą wirtualnych kart QR. Aplikacja jest skierowana zarówno do użytkowników obiektu, jak i instruktorów.

### Jaki problem rozwiązuje Gym Rock?
Gym Rock automatyzuje operacje. Eliminuje konieczność posiadania fizycznych, plastikowych kart poprzez wbudowany system wejść oparty na kodach QR. Dzięki aplikacji, klienci mogą samodzielnie kupować wejścia na wydarzenia online, przeglądać historię swoich wejść(statystyki, kluczowe dla zapalonych wspinaczy) oraz otrzymywać powiadomienia na żywo. Co może znacząco skrócić kolejki i odciążyć pracowników recepcji.

### Czym wyróżnia się Gym Rock?
System stawia na bezpośrednią wygodę użytkownika i minimalizm. Gym Rock oferuje intuicyjny, responsywny interfejs oparty na technologii React. Integruje wszystko w jednym miejscu: powiadomienia na żywo, wirtualne karty, statystyki i proste płatności. Dostarczając szybkie i stabilne rozwiązania dla nowoczesnego klubu.

## Uruchomienie projektu

### Użyte technologie

| Kategoria | Technologia | Wersja |
|-----------|-------------|--------|
| **Frontend** | [React](https://react.dev/) | 19.2.4 |
| | [Vite](https://vitejs.dev/) | 8.0.0 |
| | [React Bootstrap](https://react-bootstrap.github.io/) | 2.10.10 |
| **Backend** | [PHP](https://www.php.net/) | ^8.3 |
| | [Laravel](https://laravel.com/) | 13.0 |
| **Baza Danych** | [SQLite](https://www.sqlite.org/index.html) | - |

### Wymagania programowe

Do uruchomienia projektu wymagane są:
- **Node.js** (zalecana wersja 20+) oraz menedżer pakietów **npm**.
- **PHP** (wersja 8.3 lub nowsza).
- **Composer** (do zarządzania zależnościami PHP).
- **Git** (do pobrania repozytorium).

### Proces instalacji i konfiguracji

Projekt składa się z dwóch głównych części: backendu (`gym-rock-api`) i frontendu (`gym-rock`). Należy skonfigurować obie aplikacje.

1. **Pobranie projektu:**
   ```bash
   git clone https://github.com/BartlomiejKufel/projekt-gym-rock.git
   cd projekt-gym-rock
   ```

2. **Konfiguracja backendu (API):**
   ```bash
   cd gym-rock-api
   composer install
   cp .env.example .env
   php artisan key:generate
   ```
   *Baza danych domyślnie wykorzystuje SQLite. W Laravel 13 plik `database/database.sqlite` tworzy się często automatycznie, ale upewnij się, że istnieje.*
   
   Uruchom migracje, aby zbudować strukturę bazy i załadować dane:
   ```bash
   php artisan migrate --seed
   ```

3. **Konfiguracja frontendu (Aplikacja klienta):**
   ```bash
   cd ../gym-rock
   npm install
   ```

### Uruchomienie projektu

Aplikacja wymaga równoległego uruchomienia dwóch serwerów (frontend i backend). Najlepiej otworzyć dwa osobne okna terminala.

**Uruchomienie serwera backend (z katalogu `gym-rock-api`):**
```bash
php artisan serve
```
*API będzie dostępne pod adresem: `http://localhost:8000`*

**Uruchomienie serwera frontend (z katalogu `gym-rock`):**
```bash
npm run dev
```
*Aplikacja frontendowa będzie dostępna w przeglądarce pod adresem wyświetlonym w terminalu (np. `http://localhost:5173`).*

## Podręcznik użytkownika

W tej części skup się na **biznesowej stronie aplikacji** (najlepiej wspomagając się zrzutami ekranu z działającego projektu).
- Pokaż ścieżki użytkownika (tzw. *user flow*): "Jak dodać nowy produkt", "Jak opłacić zamówienie", "Jak wygenerować raport".
- Wyjaśnij zasady działania najważniejszych funkcji.
- Opisz role w systemie (co może zwykły klient, a jakie dodatkowe zakładki widzi administrator).
- Opisz przypadki brzegowe jakie system obsługuje np. wpisanie tekstu w pole przeznaczone dla liczb.
- Opisz jakie dane system przechowuje i udostępnia.
- Pokaż (np. na zrzutach ekranu), jak interfejs dostosowuje się do mniejszych ekranów (responsywność / wersja mobilna).
- Wyjaśnij, jak działa najważniejszy mechanizm aplikacji, np. filtrowanie danych, obliczanie sum, czy proces wysyłki formularza.

Każde zdjęcie powinno mieć opis, który wyjaśnia, co jest na zdjęciu.

## Plany rozbudowy

- Czego zabrakło w pierwszej wersji projektu?
- Jakie funkcjonalności mogłyby powstać w "v2.0" (np. integracja z płatnościami, system powiadomień mailowych)?
- Gdzie dostrzegacie potencjał na optymalizację (np. dodanie cache'owania, zmiana bazy danych)?
1. Kazdy komponent w osobnym repozytorium, tak zeby maven mogl dobrze robic releasy
2. Pokrycie kodu pokazywane na sonarqube
    - webapp
    - mobileapp
    - backends
3. + Konfiguracja dla flyway standalone do zarządzania versjami bazy danych.
4. Wykonanie testów wydajnościowych
5. Wykonanie testów BDD
6. Wykonanie testów smoke
7. Wykonanie testów manualnych postman
8. Automatyczne testy UI
9. + Wybranie proxy nginx,apache,trafic,envoy
10. Certyfikaty SSL
11. Instalacja prometheus, loki + promtail, grafana + monitoring nginx
12. Pobieranie logów z stdout
13. Docker swarm do zarządzania dockerami
14. Jenkins CI/CD skrypty, docker
15. Liczenie kosztów
16. Mikroserwis heartbeat, który będzie sprawdzał kady serwis po gRPC 
17. Sprawdzanie OWASP
18. Generate OpenApi

LandingPage:
- WordPress - najnowszy z moliwie najnowszym php i acceleratorem CGI
+ szablon: poszukać tego starego
- połączenie z facebookiem
- nginx(ssl/ http2/3, domena) + php8 + mysql
- strona z policy dla google play/iOS
- strona z release notes / plugin wordpress
- domena (lkequiz.pl)
- domena (qa.lkequiz.pl)
- plugin do release list
- strona z pobieraniem paczek (develop)

Webapp:
+ dodonie css style bootstrap, buttony
-? dodanie logowania
+ okeślenie liczby paginacji
+ stylizacja tabel
-? testy 
+ nginx przekiewrowanie do głównej w przypadku wystąpienia 404
- poprawki sonar
- dodanie SSL, domeny
- spardzenie wg dobrych nawyków układu projektu
- release i deploy wg mvn
- ładowanie strony i indicator
- tworzenie komponentów
- releasenotes
- przekazywanie nazwy wybranej kategorii do bazy wiedzy
- obrazki/ikony
-? wysyłanie headera requestID
-? logi (moze z nginx)
- domena (app.lkequiz.pl)

Mobile:
+ Dodanie belki z Home,Quiz, Setting
+ Dodanie Quiz 
+ Dodanie bazy wiedzy
+ Dodanie ustawien
+ Poprawki SOLID 
+ Poprawki Sonar
+ Poprawki CSS
- usuniecie GlobalStyle
- podział katalogów wg norm
- przygotowanie konfiguracji do tworzenia branchy github
- Deploy
    - przygotowanie obrazków
    - przygotowanie opisu 
    - wypełnienie formularzy aplikacji 
- Deploy dla Android
- Deploy dla iOS
    - zmiana pakietu org.reactjs.native.example.mobileapp
    - zmiana nazwy
    - dodanie ikon/grafik
    - dodanie dodanie ikon w zakładkach
    - wykupienie konta developerskiego
+ Testy 
+ Ikony i obrazki
+ Poprawki paginacji in memo/cache
+ ładowanie strony i indicator
+ tworzenie komponentów
+ obrazek, która odpowiedź jest poprawna po zakończeniu testu + link do powrotu do kategorii
+ pobieranie danych z pliku konfiguracyjnego
+ notyfikacje lokalne i firebase
- 3 szybkie pytania + backend + przejście z powiadomienia do strony z pytaniami
+ dekompozycja strony quiz
- opcja pokaz tylko dobre odpowiedzi: rq do backendu 
+ wysyłanie rq z kluczem apikey
+ wersja aplikacji wysyłana w nagłówkach RQ
= co więcej
- model MVVM
- bardziej solid
- zastąpienie fetcha poprzez axios albo query
- dodanie bazy SQLite zamiast odpytywania API i aktualizacja bazy
- internationalize

Backend:
- endpoint quiz poprawić na prawidłową liczbę parametrów
- unit test
- integration tests
- SOLID
- automatyczne deployowanie wybranego serwisu
- healthcheck (status, versia)[poszukać rozwiazania]
- generowanie openApi
- release i deploy wg mvn
- poprawki sonar,
- logi
- docker healthcheck
- błąd połączenia z bazą danych po kilkunastu połączeniach
-? dodanie bazy dla droniarzy
- wprowadzenie API_KEY
- wprowadzenie versja
- wprowadzenie wersji w url 
- wprowadzenie paraametru lastPage
- zwraca listę albo obiekt. trzeba zwrobić eby zwracał listę opiektów
- ssl http/2-3 tls1.3 (api.lkequiz.pl)
- ssl http/2-3 tls1.3 (api.qa.lkequiz.pl)

Tests:
- unit (wewnętrzne)
- integration
- smoke
- load (jmeter)
- perf (jmeter)
- manual (postman, manually)

Ci/CD
- Jenkins script
- Tests
- Release
- git flow
- Sprawdzenie OWASP
- smoke test
- sample test
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

Webapp:
- dodonie css style bootstrap
- dodanie logowania
+ okeślenie liczby paginacji
- stylizacja tabel
- testy ?
+ nginx przekiewrowanie do głównej w przypadku wystąpienia 404
- poprawki sonar
- dodanie SSL, domeny
- spardzenie wg dobrych nawyków układu projektu
- release i deploy wg mvn

Mobile:
- Dodanie belki z Home,Quiz, Setting
- Dodanie Quiz 
- Dodanie bazy wiedzy
- Dodanie ustawien
- Poprawki SOLID 
- Poprawki Sonar
- Deploy dla Android
- Deploy dla iOS
- Testy ?
- Ikony i obrazki
- Poprawki paginacji

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

Tests:
- unit
- integration
- smoke
- load
- perf
- manual

Ci/CD
- Jenkins script
- Tests
- Release
- git flow
- 
-- -- insert into categories (id, department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values (nextval('categories_id_seq'), 6, 35, 'Własne', 'PL080', 45, 16, 370, '1', 1, 'PPL(A)');

-- -- insert into questions  (category_id, number, question_val, update_date) values ( currval('categories_docker_id_seq'), '', '1. Which command do you use to create a new swarm?', '0');
-- -- insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'docker swarm init --advertise-addr &lt;MANAGER-IP&gt;', '1');



-- 1: Łączność

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Jakim rodzajem łączności jest nadawanie ze statku powietrznego?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Praca simpleks', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Praca dupleks', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Praca multipleks', '0');


insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Jaki rodziaj modulacji występuje w lotniczych urządzeniach radiowych', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Amplitudy', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Kluczowanie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Częstotliwości', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'W radiowej frazeologi lotniczej, której literze odpowiada transkrypcja fonetyczna "EKSREJ"', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'X', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'E', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'K', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Której literze odpowiada transkrypcja fonetyczna "DŻULJIET"', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'J', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'D', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'DŻ', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'W sytuacjach niebezpiecznych i naglących nalezy korzystać', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'z częstotliwości radiowej na której prowadzona jest aktualnie wymiana korespondencji. Jezeli nawiązanie takiej łączności nie jest mozliwe, nalezy korzystać z częstotliwości 121,5 MHz lub 123,1 MHz', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zawsze z jednej częstotliwości w niebezpieczęstwie, tj. 121,5 MHz lub 123,1 MHz', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tylko z jednej z częstotliwości w niebezpieczęstwie, tj. 121,5 MHz, 123,1 MHz lub 243MHz', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Kazda literaz w znaku wywoławczym powinna być', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przekazana oddzielnie przez stosowanie fonetycznego literowania, z wyjątkiem radiotelefonicznego oznacznika i typu statku powietrznego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przekazywana oddzielnie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przekazywana odddzielnie, z wyjątkiem radiotelefonicznego oznacznika i typu statku powietrznego', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Jaka obecnie obowiązuje separacja częstotliwości lotniczych w Polsce?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '8,33 kHz', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '25 kHz', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '50 kHz', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Co oznacza QNH w kodzie Q', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ciśnienie na poziomie morza', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ciśnienie na lotnisku', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ciśnienie standardowe 1013 hPa', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 37, 'Która konwencja międzynarodowa reguluje tematykę łączności w lotnictwie?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Konwencja chicagowska', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Konwencja paryska', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Konwencja warszawska', '0');


-- 2: Człowiek - moliwości i ograniczenia ID 31
-- 1. Zniekształceniu ulegają informacje:
-- - nowe 
-- - niezrozumiałe 
-- + obie odpowiedzi są prawidłowe
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Zniekształceniu ulegają informacje:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'obie odpowiedzi są prawidłowe', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nowe', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'niezrozumiałe', '1');

-- 2. Czy dieta ma wpływ na występowanie i przebieg choroby powietrznej
-- + tak 
-- - nie 
-- - tylko u osób po 40 roku zycia
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Czy dieta ma wpływ na występowanie i przebieg choroby powietrznej:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tak', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tylko u osób po 40 roku zycia', '0');

-- 3. Pełna adaptacja wzroku do ciemności następuje:
-- + po około 1 godzinie 
-- - po 30 minutach
-- - po 10 minutach 
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Pełna adaptacja wzroku do ciemności następuje:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'po około 1 godzinie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'po 30 minutach', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'po 10 minutach', '0');

-- 4. Stres: 
-- - pomaga w podejmowaniu decyzji
-- - przyspiesza działanie
-- + obie odpowiedzi są poprawne
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Stres:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'obie odpowiedzi są poprawne', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pomaga w podejmowaniu decyzji', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przyspiesza działanie', '0');

-- 5. Cechy skutecznego komunikatu to:
-- - jasność, głośność, wyrazistość
-- - intencjonalność, właściwy język
-- + jasność, zwięzłość, dopasowanie do odbiorcy
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Cechy skutecznego komunikatu to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'jasność, zwięzłość, dopasowanie do odbiorcy', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'jasność, głośność, wyrazistość', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'intencjonalność, właściwy język', '0');

-- 6. Wybierz prawdziwe stwierdzenie dotyczące hiperwentylacji:
-- - nie występuje u pilotów
-- + moze prowadzić do omdlenia, a jej pierwsze objawy są podobne do objawów niedotlenienia
-- - występuje u pilotów, ale nie ma znaczenia podczas lotu
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Wybierz prawdziwe stwierdzenie dotyczące hiperwentylacji:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'moze prowadzić do omdlenia, a jej pierwsze objawy są podobne do objawów niedotlenienia', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie występuje u pilotów', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'występuje u pilotów, ale nie ma znaczenia podczas lotu', '0');

-- 7. Który z niezej wymienionych elementów nie dotyczy układu nerwowego człowieka:
-- - mózg
-- - rdzeń kręgowy
-- + śledziona
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Który z niezej wymienionych elementów nie dotyczy układu nerwowego człowieka:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'śledziona', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'mózg', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'rdzeń kręgowy', '0');

-- 8. Hiperwentylacja moze być wywołana przez:
-- - stres 
-- - toksyny
-- + obie odpowiedzi są prawidłowe
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Hiperwentylacja moze być wywołana przez:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'obie odpowiedzi są prawidłowe', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'stres', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'toksyny', '0');

-- 9. Praktycznie nieograniczony czas przechowywania informacji to cecha pamięci:
-- - operacyjnej
-- - sensorycznej
-- + długotrwałej
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Praktycznie nieograniczony czas przechowywania informacji to cecha pamięci:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'długotrwałej', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'operacyjnej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'sensorycznej', '0');

-- 10. Pamięć krótkotrwała ma pojemność:
-- - nieograniczoną
-- + 6 do 9 elementów
-- - 3 elementy
insert into questions  (category_id, number, question_val, update_date) values ( 31, '', 'Pamięć krótkotrwała ma pojemność:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '6 do 9 elementów', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nieograniczoną', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '3 elementy', '0');


insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Narząd najbardziej wrazliwy na dekompresję to', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Płuca', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'narząd wzroku', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pęcherz moczowy', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Podstawowym prawem gazowym jest równanie stanu gazu doskonałego, równanie Clapeyrona zapisuje się wwzorem: p*V/T=const. Co oznacza T?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'temperaturę', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'czas', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pręzność', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Błąd i wykroczenie', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'róznią się od siebie udziałem świadomości', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'to pojęcia tozsame', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zadna z powyzszych', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Organizm ludzki najlepiej toleruje działanie przyspieszeń poprzecznych w kierunku +GX. Moze on wytrzymać większe przyspieszenie niz w podłuznej osi ciała. Ile razy większe?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '3x', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '1x', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2x', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Dokończ zdanie. Ze względu na przeciązenia pozycja kosmonauty podczas startu rakiety jest', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'półleząca', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'stojąca', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'siedząca', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Podczas wznoszenia objętość gazów w przewodzie pokarmowym wzrasta, ile razy wzrośnie ich objętość na wysokości 3000m.n.p.m', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '1,5x', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '10x', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '5x', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Dokończ zdanie. Łagiewka znajdująca się w uchu wewnętrznym, odpowiada za...', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'percepcję poziomych przyspieszeń liniowych', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'percepcję kątowych przyspieszeń', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'percepcję słuchową', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Zakres i natęzenie to cechy', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'uwagi dowolnej', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'uwagi mimowolnej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'percepcji sensorycznej', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Jaką powierzchnię obejmują pęcherzyki płucne dorosłego człowieka', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '70 m2', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '7 m2', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '700 m2', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 31, 'Akomodacja to', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'dostosowanie układu optycznego oka do odległości', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'to samo co konwergencja', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przystosowanie do zmiany oświetlenia', '0');





-- 3: Meteorologia ID = 32
-- 1. Równowaga stała występuje, gdy gradient rzeczywisty jest:
-- + Mniejszy od wilgotnoadiabatycznego
-- - Większy od suchoadiabatycznego
-- - Równy suchoadiabatycznemu
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Równowaga stała występuje, gdy gradient rzeczywisty jest:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Mniejszy od wilgotnoadiabatycznego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Większy od suchoadiabatycznego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Równy suchoadiabatycznemu', '0');

-- 2. Mapa istotnych zjawisk pogody SWC to:
-- - Mapa FL 
-- + SIGNIFIKANT 
-- - SIGMET 
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Mapa istotnych zjawisk pogody SWC to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'SIGNIFIKANT', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Mapa FL', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'SIGMET', '0');

-- 3. Opady przelotne występują głównie:
-- + Na frontach chłodnych
-- - Na froncie ciepłym
-- - W centrum układu wyzowego
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Opady przelotne występują głównie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na frontach chłodnych', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na froncie ciepłym', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'W centrum układu wyzowego', '0');

-- 4. Krótkotrwała zmiana prędkości wiatru często połączona ze zmianą kierunku to:
-- - Prąd strumieniowy
-- - Front ciepły
-- + Uskok wiatru
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Krótkotrwała zmiana prędkości wiatru często połączona ze zmianą kierunku to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Uskok wiatru', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Prąd strumieniowy', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Front ciepły', '0');

-- 5. Na podstawie prezentowanego fragmentu depeszy TAF - BECMG 0618/0621 2000 BR BKN004 BECMG 0621/0624 0500 FG VV001 prognozowana widzialność na godzinę 23.00 UTC wynosi:
-- + 500m 
-- - 2000m 
-- - W przedziale od 500 do 2000 m
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Na podstawie prezentowanego fragmentu depeszy TAF - BECMG 0618/0621 2000 BR BKN004 BECMG 0621/0624 0500 FG VV001 prognozowana widzialność na godzinę 23.00 UTC wynosi:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '500m', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2000m', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'W przedziale od 500 do 2000 m', '0');

-- 6. NOSIG oznacza:
-- - Brak depeszy TAF 
-- + Brak istotnych zmian warunków na lądowanie 
-- - Brak depeszy METAR 
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'NOSIG oznacza:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Brak istotnych zmian warunków na lądowanie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Brak depeszy TAF', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Brak depeszy METAR', '0');

-- 7. Opad gradu występuje z chmur:
-- + Cb 
-- - Ac 
-- - Sc
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Opad gradu występuje z chmur:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Cb', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ac', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Sc', '0');

-- 8. Masa powietrzna dająca bardzo wysoką temperaturę przy niskiej wilgotności latem to:
-- - PPm 
-- - PAk 
-- + PZk
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Masa powietrzna dająca bardzo wysoką temperaturę przy niskiej wilgotności latem to:
-- - PPm :', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'PZk', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'PPm', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'PAk', '0');

-- 9. Najbardziej gwałtowne zmiany pogody występują:
-- + Przy przejściu frontu chłodnego II rodzaju 
-- - Na osi klina 
-- - Przy przejściu frontu ciepłego
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Najbardziej gwałtowne zmiany pogody występują:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Przy przejściu frontu chłodnego II rodzaju', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na osi klina', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Przy przejściu frontu ciepłego', '0');

-- 10. Do ustalenia wysokości poziomu lotu FL stosujemy ciśnienia:
-- + QNE 
-- - QFF 
-- - QFE
insert into questions  (category_id, number, question_val, update_date) values ( 32, '', 'Do ustalenia wysokości poziomu lotu FL stosujemy ciśnienia:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'QNE', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'QFF', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'QFE', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 32, 'Opad marznącego deszczu w kluczu TAF oznaczany', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'FZRA', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'RA', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'SHRA', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 32, 'Depesza AIRMET to', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Informacja o niebezpiecznych zjawiskach dla uzytkowników do poziomu lotu FL100/150', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'informacja o aktualnym stanie warunków na lotnisku', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'informacja o pionowym profilu wiatru w warstwie przyziemnej', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 32, 'Określenie SCT002 BKN010 w kluczach TAF oznacza', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zachmurzenie 3-5/8 o podstawie 200 stóp i 5-7/8 o podstawie 1000 stóp', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zachmurzenie 7-8/8 o podstawwie 200 stóp i 3-5/8 o podstawie 1000 stóp', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Brak chmur niskich', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 32, 'Podstawę chmur w kluczach METAR/SPECI podaje się co', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '30m', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '10m', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '50m', '0');



-- 4: Nawigacja
-- 1. Ile centymetrów na mapie w skali 1:10 000 ma odcinek odpowiadający odległości 2 km w terenie:
-- - 40 cm 
-- + 20 cm
-- - 5 cm
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Ile centymetrów na mapie w skali 1:10 000 ma odcinek odpowiadający odległości 2 km w terenie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '20 cm', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '40 cm', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '5 cm', '0');

-- 2. Na odwzorowaniu walcowym, południki są:
-- + równologłe do siebie oddalone w równych odstępach
-- - równoległe do siebie oddalone w rónych odstępach 
-- - prostymi, rozchodzącymi się promieniście od bieguna
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Na odwzorowaniu walcowym, południki są:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'równologłe do siebie oddalone w równych odstępach', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'równoległe do siebie oddalone w rónych odstępach', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'prostymi, rozchodzącymi się promieniście od bieguna', '0');

-- 3. Szerokość geograficzna to:
-- - kąt dwuścienny, zawarty między płaszczyzną południka zerowego a płaszczyzną południka przechodzącego przez dany punkt na powierzchni Ziemi
-- - łuk powstały w wyniku przecięcia powierzchni Ziemi płaszczyzną prostopadłą do osi Ziemi przechodzącą przez jej środek
-- + kąt zawarty między płaszczyzną równika a pionem (promieniem) danego punktu
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Szerokość geograficzna to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kąt zawarty między płaszczyzną równika a pionem (promieniem) danego punktu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kąt dwuścienny, zawarty między płaszczyzną południka zerowego a płaszczyzną południka przechodzącego przez dany punkt na powierzchni Ziemi', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'łuk powstały w wyniku przecięcia powierzchni Ziemi płaszczyzną prostopadłą do osi Ziemi przechodzącą przez jej środek', '0');

-- 4. Z ponizszej listy wybierz obiekt orientacyjny punktowy:
-- + most 
-- - duze miasto 
-- - masyw leśny
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Z ponizszej listy wybierz obiekt orientacyjny punktowy:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'most', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'duze miasto', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'masyw leśny', '0');

-- 5. Odbiornik DME podaje dane w jednostkach:
-- - km, km/h, min 
-- + NM, kt, min 
-- - w zaleności od nastawy
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Odbiornik DME podaje dane w jednostkach:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'NM, kt, min', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'km, km/h, min', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'w zaleności od nastawy', '0');

-- 6. Z ponizszej listy wybierz obiekt orientacyjny punktowy:
-- + most 
-- - duze miasto 
-- - tory kolejowe
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Z ponizszej listy wybierz obiekt orientacyjny punktowy:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'most', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'duze miasto', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tory kolejowe', '0');

-- 7. Deklinacja to:
-- - kąt zawarty między kierunkiem wektora magnetycznego Ziemi a płaszczyzną statyczną do jej powierzchni
-- + kąt zawarty między południkiem geograficznym a południkiem magnetycznym 
-- - linia łącząca punkty o jednakowej wartości inklinacji
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Deklinacja to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kąt zawarty między południkiem geograficznym a południkiem magnetycznym', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kąt zawarty między kierunkiem wektora magnetycznego Ziemi a płaszczyzną statyczną do jej powierzchni', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'linia łącząca punkty o jednakowej wartości inklinacji', '0');

-- 8. Prędkość podrózna GS (Ground Speed) to:
-- + Predkość przemieszczania się statku powietrznego względem ziemi
-- - CAS z uwzględnieniem wiatru 
-- - IAS z uwzględnieniem wiatru
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Prędkość podrózna GS (Ground Speed) to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Predkość przemieszczania się statku powietrznego względem ziemi', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'CAS z uwzględnieniem wiatru', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'IAS z uwzględnieniem wiatru', '0');

-- 9. Jaki kierunek określamy jako SW?
-- + 225 st 
-- - 295 
-- - 165
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Jaki kierunek określamy jako SW:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '225', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '295', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '165', '0');

-- 10. Najbardziej dokładne określenie prędkości podróznej jest mozliwe przy uzyciu:
-- - stacji VOR usytuowanej poprzecznie do trasy lotu 
-- + stacji DME usytuowanej na trasie lotu 
-- - radiolatarni NDB usytuowanej na trasie lotu
insert into questions  (category_id, number, question_val, update_date) values ( 33, '', 'Najbardziej dokładne określenie prędkości podróznej jest mozliwe przy uzyciu:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'stacji DME usytuowanej na trasie lotu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'stacji VOR usytuowanej poprzecznie do trasy lotu', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'radiolatarni NDB usytuowanej na trasie lotu', '0');



-- 5: Ogólna wiedza o samolocie - napędy, instalacje, przyrządy
-- 1. W silniku gaźnikowym mieszanka palna wytwarzana jest poprzez:
-- + Rozpraszanie paliwa w strumieniu powietrza 
-- - Wtrysk paliwa do układu dolotowego
-- - Bezpośredni wtrysk paliwa do cylindrów
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'W silniku gaźnikowym mieszanka palna wytwarzana jest poprzez:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozpraszanie paliwa w strumieniu powietrza', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wtrysk paliwa do układu dolotowego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Bezpośredni wtrysk paliwa do cylindrów', '0');

-- 2. W silniku gwiazdowym sterowanie zaworami zapewnia:
-- + Tarcza rozrządu
-- - Wałek rozrządu 
-- - Dźwignia zaworowa
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'W silniku gwiazdowym sterowanie zaworami zapewnia:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Tarcza rozrządu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wałek rozrządu', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Dźwignia zaworowa', '0');

-- 3. Podstawowe przyrządy nawigacyjne to:
-- - Busola magnetyczna, wysokościomierz i wariometr 
-- + Busola magnetyczna i  zyrobusola
-- - Obrotomierz, prędkościomerz, busola
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Podstawowe przyrządy nawigacyjne to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Busola magnetyczna i  zyrobusola', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Busola magnetyczna, wysokościomierz i wariometr', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Obrotomierz, prędkościomerz, busola', '0');

-- 4 Inklinacja jest największa:
-- + na biegunach
-- - na równiku
-- - na średnich szerokościach geograficznych
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Inklinacja jest największa:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na biegunach', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na równiku', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na średnich szerokościach geograficznych', '0');

-- 5. Kolorem niebieskim oznaczona jest lotnicza benzyna:
-- + AVGAS 100LL 
-- - AVGAS 95/1115 
-- - Etylina 95
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Kolorem niebieskim oznaczona jest lotnicza benzyna:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'AVGAS 100LL', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'AVGAS 95/1115', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Etylina 95', '0');

-- 6. Kolor biały na skali prędkościomierza oznacza:
-- + Zakres prędkości lotu na otwartych klapach skrzydłowych
-- - Zakres dopuszczalnych prędkości w warunkach turbulencji
-- - Zakres prędkości manewrowej
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Kolor biały na skali prędkościomierza oznacza:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zakres prędkości lotu na otwartych klapach skrzydłowych', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zakres dopuszczalnych prędkości w warunkach turbulencji', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zakres prędkości manewrowej', '0');

-- 7. Przyczyną spalania stukowego moze być:
-- - Za mała energia zapłonu
-- - Za duza liczba oktanowa
-- + Za mała liczba oktanowa lub za wysoki stopień spręzania
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Przyczyną spalania stukowego moze być:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Za mała liczba oktanowa lub za wysoki stopień spręzania', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Za mała energia zapłonu', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Za duza liczba oktanowa', '0');

-- 8. Zbyt duzy luz zaworowy moze powodować:
-- - Jest poządany poniewaz zawory otwierane i zamykane są precyzyjnie
-- - Jest niekorzystny poniewaz będzie powodował po rozgrzaniu silnika niedomykanie się zaworów co spowoduje spadek mocy silnika.
-- + Jest niekorzystny poniewaz będzie powodował po rozgrzaniu silnika niepełne ich otwieranie co spowoduje spadek mocy silnika
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'PYTANI4:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ODP_DOBRA', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ODP', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ODP', '0');

-- 9. Wskazania przyrządu zyroskopowego zwanego zakrętomierzem pokazuje:
-- - Obrót samolotu względem osi poprzecznej zwany pochylaniem
-- + kierunek oraz prędkość kątowa zakrętu samolotu 
-- - wysokość lotu nad danym terenem
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Zbyt duzy luz zaworowy moze powodować:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kierunek oraz prędkość kątowa zakrętu samolotu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Obrót samolotu względem osi poprzecznej zwany pochylaniem', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wysokość lotu nad danym terenem', '0');

-- 10. Ile stopni swobody ma sztuczny horyzont:
-- - 1 
-- - 2 
-- + 3 
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Ile stopni swobody ma sztuczny horyzont:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '3', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '1', '0');

-- 6: Ogólna wiedza o samolocie - płatowiec
-- 1. Podczas przeglądu przedlotowego połączenie skrzydło - kadłub nalezy sprawdzić:
-- + mocowanie czy nie ma w okolicach pęknięć oraz czy sworznie posiadają zabezpieczenia
-- - Czy nie ma w tej okolicy zadnych zabrudzeń oraz osób postronnych
-- - ilość paliwa w zbiornikach
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Podczas przeglądu przedlotowego połączenie skrzydło - kadłub nalezy sprawdzić:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'mocowanie czy nie ma w okolicach pęknięć oraz czy sworznie posiadają zabezpieczenia', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Czy nie ma w tej okolicy zadnych zabrudzeń oraz osób postronnych', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ilość paliwa w zbiornikach', '0');

-- 2. Odstoje paliwa mozemy spuszczać w samolocie:
-- - Podczas przeglądu przedlotowego w dowolnym momencie
-- + Przed wypchnięciem samolotu z hangaru albo po okresie minimum pół godziny postoju samolotu w jednym miejscu
-- - Po wypchnięciu samolotu z hangaru
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Odstoje paliwa mozemy spuszczać w samolocie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Przed wypchnięciem samolotu z hangaru albo po okresie minimum pół godziny postoju samolotu w jednym miejscu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Podczas przeglądu przedlotowego w dowolnym momencie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Po wypchnięciu samolotu z hangaru', '0');

-- 3. Tłumik shimmy przeznaczony jest do tłumienia drgań:
-- - podwozia głownego
-- - steru kierunku 
-- + podwozia przedniego
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Tłumik shimmy przeznaczony jest do tłumienia drgań:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'podwozia przedniego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'podwozia głownego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'steru kierunku', '0');

-- 4. Prądnica prądu stałego posiada:
-- - Ruchome obracające się pole magnetyczne i nieruchome uzwojenie
-- + Ruchome obracające się uzwojenie i nieruchome pole magnetyczne 
-- - Ruchome obracające się pole magnetyczne i ruchome uzwojenie
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Prądnica prądu stałego posiada:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ruchome obracające się uzwojenie i nieruchome pole magnetyczne', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ruchome obracające się pole magnetyczne i nieruchome uzwojenie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ruchome obracające się pole magnetyczne i ruchome uzwojenie', '0');

-- 5. Jak nazywa się klapka wywazająca, której połozenie mozna zmieniać podczas lotu niezaleznie dzięki czemu zmniejszyć siły na sterze?
-- + trymer 
-- - flettner 
-- - klapka dociązająca
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Jak nazywa się klapka wywazająca, której połozenie mozna zmieniać podczas lotu niezaleznie dzięki czemu zmniejszyć siły na sterze:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'trymer', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'flettner', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'klapka dociązająca', '0');

-- 6. Samolot w układzie klasycznym posiada usterzenie poziome umieszczone:
-- - nad płatem nośnym 
-- - przed płatem nośnym 
-- + za płatem nośnym
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Samolot w układzie klasycznym posiada usterzenie poziome umieszczone:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'za płatem nośnym', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nad płatem nośnym', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przed płatem nośnym', '0');

-- 7. Podczas przeglądu przedlotowego zauwazono nie działające światła pozycyjne. Co powinien zrobić pilot?
-- - Wykonać lot poniewaz będzie od wykonywany w dzień, a powstrzymać się od lotu jeśli planowany lot miał być w nocy 
-- - Wymienić spaloną zarówkę pod nadzorem mechanika i wykonać lot 
-- + Zgłosić fakt mechanikowi oraz koniecznie odnotować usterkę w pokładowym dzienniku technicznym
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Podczas przeglądu przedlotowego zauwazono nie działające światła pozycyjne. Co powinien zrobić pilot?:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zgłosić fakt mechanikowi oraz koniecznie odnotować usterkę w pokładowym dzienniku technicznym', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wykonać lot poniewaz będzie od wykonywany w dzień, a powstrzymać się od lotu jeśli planowany lot miał być w nocy', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wymienić spaloną zarówkę pod nadzorem mechanika i wykonać lot ', '0');

-- 8. Sloty znajdują się na:
-- - Krawędzi spływu skrzydeł.
-- - Krawędzi bocznej kadłuba.
-- + Krawędzi natarcia skrzydeł.
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Sloty znajdują się na:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Krawędzi natarcia skrzydeł', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Krawędzi spływu skrzydeł', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Krawędzi bocznej kadłuba', '0');

-- 9. Całkowita odporność oporników połączonych w układzie szeregowym:
-- - jest równa sumie odwrotności oporności poszczególnych oporników 
-- - Odwrotności całkowitej oporności jest równa sumie odwrotności poszczególnych oporników
-- + jest równa sumie oporności poszczególnych oporników
insert into questions  (category_id, number, question_val, update_date) values ( 29, '', 'Całkowita odporność oporników połączonych w układzie szeregowym:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'jest równa sumie oporności poszczególnych oporników', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'jest równa sumie odwrotności oporności poszczególnych oporników', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Odwrotności całkowitej oporności jest równa sumie odwrotności poszczególnych oporników', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Poziom oleju w silniku lotniczym sprawdza', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Pilot przed lotem', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Uprawniony mechanik', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Kontroler nadzoru technicznego', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Biały zakres na prędkościomierzu kończy się na prędkości', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Maksymalnej prędkości na klapach', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Maksymalnej prędkości na otwartym podwoziu', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Vno czyli prędkości normalnego uzytkowania', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Wysokosciomierz wskazuje wysokość według', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ciśnienia barometrycznego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Gęstości powietrza i ciśnienia barometrycznego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Gęstości powietrza (1,225 kg/m3)', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Lambda to', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Współczynnika nadmiaru powietrza', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Oznaczenie szerokści geograficznej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Czujnik spalania detonacyjnego', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'W silniku czterosuwowym kazdy jeden suw tłoka to obrót wału korbowego o', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '180 stopni', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '90', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '360', '0');



insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Górnopłat to taki samolot w którym', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Skrzydło jest umieszczone w górnej części kadłuba', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Silnik jest umieszczony ponizej skrzydła', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Kadłub jest nad skrzydłem', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'W konstrukcji kratownicowej pojedynczy element jest poddawany napręzeniom', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozciąganie i ściskanie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozciąganie i ścinanie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozciąganie i zginanie', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Przykładem pasywnej instalacji hydraulicznej jest', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'układ hamulców w małych samolotach', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'układ chowania i wypuszczania podwozia', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'układ chowania i wypuszczania klap', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'W jakim dokumencie znajdują się wszystkie informacje niezbędne pilotowi do właściwego operowania samolotem', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Instrukcja Uzytkowania w Locie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Pokładowy Dziennik Techniczny', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Instrukcja Obsługi Technicznej', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Podstawowym źródłem prądu w samolocie podczas lotu jest', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Prądnica', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Akumulator', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Kondensator', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Czy pilot moze w ramach obsługi przedlotowej samolotu uzywanego do szkolenia naprawić lub wymienić uszkodzoną dętkę w kole przednim?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tak, jezeli posiada taką umiejętność', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tak, jezeli zezwoli na to dyrektor ośrodka', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Lotki znajdują się', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na krawędzi spływu na końcach skrzydeł', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na krawędzi natarcia na końcach skrzydeł', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na krawędzi spływu w części przy kadłubowej skrzydła', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Prawidłowo zaprojektowany i uzytkowany element jest poddawany odkształceniom', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'W zakresie jedynie spręzystym', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Bez limitów', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'W zakresie spręzystym i plastycznym', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Najwięcej jest samolotów posiadających', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Jeden płat', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'dwa płaty', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'trzy płaty', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 29, 'Jak nazywa się klapka wywazająca, której połozenie mozna zmieniać podczas lotu niezaleznie?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'trymer', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'flettner', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'klapka dociązająca', '0');


-- 7: Planowanie i wykonywanie lotu
-- 1. Przewozony ładunek (pasazerowie, bagaze, etc), to:
-- - Zero fuel mass 
-- + Traffic load lub payload 
-- - Dry operating mass
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Przewozony ładunek (pasazerowie, bagaze, etc), to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Traffic load lub payload', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zero fuel mass', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Dry operating mass', '0');

-- 2. Uzytkownik statku powietrznego, organ ruchu lotniczego, zarządzający lotniskiem są zobowiązani powiadomić PKBWL o zdarzeniu lotniczym w nieprzekraczalnym czasie:
-- - 24 godziny
-- - 48 godziny
-- + 72 godziny
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Uzytkownik statku powietrznego, organ ruchu lotniczego, zarządzający lotniskiem są zobowiązani powiadomić PKBWL o zdarzeniu lotniczym w nieprzekraczalnym czasie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '72 godziny', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '48 godziny', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '24 godziny', '0');

-- 3. W ramach przygotowania do lotu dane o zajętości przestrzeni uzyskujemy z:
-- - AIP
-- + AUP 
-- - ADF
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'W ramach przygotowania do lotu dane o zajętości przestrzeni uzyskujemy z:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'AUP', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'AIP', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ADF', '0');

-- 4. Wazenie statku powietrznego (SP): odczyt na wadze pod przednim podwoziem 155kg, odczyt - suma na głównym 320kg. Odległość przód SP - przednie podwozie 0.8, przód SP - główne 2.4m. Jaka jest odległość przód SP - środek cięzkości?
-- - 3.12 m 
-- - 2.04 m 
-- + 1.88 m
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Wazenie statku powietrznego (SP): odczyt na wadze pod przednim podwoziem 155kg, odczyt - suma na głównym 320kg. Odległość przód SP - przednie podwozie 0.8, przód SP - główne 2.4m. Jaka jest odległość przód SP - środek cięzkości?:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '1.88 m', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2.04 m', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '3.12 m ', '0');

-- 5. Zbór aktualnych danych dotyczących wybranego lotniska docelowo, dopuszczonych DO UŻYTKU OPERACYJNEGO do zapoznania się przed lotem znajdziemy w:
-- - ATIS 
-- - AUP 
-- + AIP w wersji papierowej
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Zbór aktualnych danych dotyczących wybranego lotniska docelowo, dopuszczonych DO UŻYTKU OPERACYJNEGO do zapoznania się przed lotem znajdziemy w:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'AIP w wersji papierowej', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'AUP', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ATIS', '0');

-- 6. Kierunek pasa 040 (stopni), wiatr 270 / 18 kt (ATIS). Jakie są składowe wiatru:
-- + W ogon: 12 kt, boczna - z lewej 14 kt.
-- - Czołowa: 12 kt, boczna - z prawej 14 kt.
-- - Czołowa: 16 kt, boczna - z prawej 16 kt.
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Kierunek pasa 040 (stopni), wiatr 270 / 18 kt (ATIS). Jakie są składowe wiatru:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'W ogon: 12 kt, boczna - z lewej 14 kt.', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Czołowa: 12 kt, boczna - z prawej 14 kt.', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Czołowa: 16 kt, boczna - z prawej 16 kt.', '0');

-- 7. NOTAM to:
-- + Zbiór istotnych informacji dotyczących np. czasowego wyłączenia pomocy radionawigacyjnej, zamknięcia lotniska, lub jego części, aktywności danych stref 
-- - Depesza meteorologiczna 
-- - Zbiór kart podejścia
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'NOTAM to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zbiór istotnych informacji dotyczących np. czasowego wyłączenia pomocy radionawigacyjnej, zamknięcia lotniska, lub jego części, aktywności danych stref ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Depesza meteorologiczna ', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zbiór kart podejścia', '0');

-- 8. Samolot niestatyczny będzie:
-- - opierał się na skrzydło stojąc na ziemi
-- + zwiększał swoje oscylacje po wychyleniu ze stanu równowagi 
-- - zmniejszał oscylacje po wychyleniu ze stanu równowagi
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Samolot niestatyczny będzie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zwiększał swoje oscylacje po wychyleniu ze stanu równowagi ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'opierał się na skrzydło stojąc na ziemi', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zmniejszał oscylacje po wychyleniu ze stanu równowagi', '0');

-- 9. Informacje o aktualnej sytuacji meteorologicznej na lotnisku kontrolowanym uzyskamy z:
-- - GAMET-u (obserwacja obszarowa dla lotnictwa GA)
-- - TAF-u (prognoza)
-- + METAR-u (to bieząca obserwacja pogody)
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Informacje o aktualnej sytuacji meteorologicznej na lotnisku kontrolowanym uzyskamy z:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'METAR-u (to bieząca obserwacja pogody)', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'GAMET-u (obserwacja obszarowa dla lotnictwa GA)', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'TAF-u (prognoza)', '0');

-- 10. Środek cięzkości mozna zdefiniować jako:
-- + Punkt, w którym skoncentrowana jest masa statku powietrznego.
-- - Punkt, do którego przyłozone są wszystkie siły działające na statek powietrzny.
-- - Punkt, do którego przyłozone są siły nośna i cięzkości - działające na statek powietrzny.
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Środek cięzkości mozna zdefiniować jako:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Punkt, w którym skoncentrowana jest masa statku powietrznego.', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Punkt, do którego przyłozone są wszystkie siły działające na statek powietrzny.', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Punkt, do którego przyłozone są siły nośna i cięzkości - działające na statek powietrzny.', '0');

-- 11. Cięzar elementu 55kg, ramie 2.3 m. Moment = [kgm]
-- + 126.5 
-- - 23.0 
-- - 6957
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Cięzar elementu 55kg, ramie 2.3 m. Moment = [kgm]:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '126.5 ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '23.0 ', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '6957', '0');

-- 12. Żeby zamienić wartość zatankowanego paliwa wyrazoną w litrach na kg nalezy pomnozyć ilość w litrach przez:
-- + cięzar właściwy paliwa 
-- - 0.88 
-- - 2.2015
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Żeby zamienić wartość zatankowanego paliwa wyrazoną w litrach na kg nalezy pomnozyć ilość w litrach przez:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'cięzar właściwy paliwa ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '0.88 ', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2.2015', '0');

-- 13. TC (NKDM) wynosi 270 (st). Pilot na trasie utrzymując idealnie TC 270 (wg linii wyznaczonej na ekranie GPS) odczytuje na zyrobusoli HEADING (kurs) 300(st). Róznica 30 (st) wynika najprawdopodobniej z:
-- + "Poprawki na wiatr"
-- - Deklinacji magnetycznej
-- - Rozstrojenia zyrobusoli
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'TC (NKDM) wynosi 270 (st). Pilot na trasie utrzymując idealnie TC 270 (wg linii wyznaczonej na ekranie GPS) odczytuje na zyrobusoli HEADING (kurs) 300(st). Róznica 30 (st) wynika najprawdopodobniej z:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '"Poprawki na wiatr"', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Deklinacji magnetycznej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozstrojenia zyrobusoli', '0');

-- 14. Nastawienie QNH daje nam odczyt wysokości:
-- - rzeczywistej 
-- + nad poziomem morza 
-- - na terenem 
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Nastawienie QNH daje nam odczyt wysokości:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nad poziomem morza ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'rzeczywistej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na terenem ', '0');

-- 15. Kalkulacja paliwowa składa się z następujących elementów:
-- + taxi fuel (kołowanie), trip fuel (przelot z pkt A do pkt B), alternate fuel (paliwo na dolot na lotnisko zapasowe), final reserve (niezbędna rezerwa paliwa), additional fuel (dodatkowe paliwo na zyczenie dowódcy)
-- - main flight fuel, exrtra fuel 
-- - nie ma tutaj rozróznienia
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Kalkulacja paliwowa składa się z następujących elementów:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'taxi fuel (kołowanie), trip fuel (przelot z pkt A do pkt B), alternate fuel (paliwo na dolot na lotnisko zapasowe), final reserve (niezbędna rezerwa paliwa), additional fuel (dodatkowe paliwo na zyczenie dowódcy)', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'main flight fuel, exrtra fuel', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie ma tutaj rozróznienia', '0');

-- 16. Ograniczenia masy i wywazenie samolotu są ustalane przez:
-- - mechanika 
-- - pilota 
-- + producenta samolotu
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Ograniczenia masy i wywazenie samolotu są ustalane przez:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'producenta samolotu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'mechanika', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pilota', '0');

-- 17. Produkty TAF i METAR w Polsce opracowywane są dla lotnisk:
-- + kontrolowanych 
-- - niekontrolowanych 
-- - wszystkich
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Produkty TAF i METAR w Polsce opracowywane są dla lotnisk:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kontrolowanych', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'niekontrolowanych', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wszystkich', '0');

-- 18. Gdzie dostępny jest komunikat ATIS?
-- + Jest on nagrany na osobnej częstotliwości, która podana będzie na kartach danego lotniska, lub tez pod numerem telefonu
-- - Jest on wywieszony w sali briefingowej 
-- - Jest on dostępny w AIP 
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Gdzie dostępny jest komunikat ATIS?:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Jest on nagrany na osobnej częstotliwości, która podana będzie na kartach danego lotniska, lub tez pod numerem telefonu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Jest on wywieszony w sali briefingowej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Jest on dostępny w AIP', '0');

-- 19. Produkt meteorologiczny (depesza) najbardziej przystosowany dla lotnictwa General Aviation to:
-- + GAMET 
-- - METAR 
-- - TAF
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Produkt meteorologiczny (depesza) najbardziej przystosowany dla lotnictwa General Aviation to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'GAMET', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'METAR', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'TAF', '0');

-- 20. Do kogo mozemy zadzwonić, aby uzyskać informację o zajętości przestrzeni?
-- + ASM3 
-- - Birefing lotniskowy
-- - Wieza lotniska kontrolowanego
insert into questions  (category_id, number, question_val, update_date) values ( 27, '', 'Do kogo mozemy zadzwonić, aby uzyskać informację o zajętości przestrzeni:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ASM3', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Birefing lotniskowy', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wieza lotniska kontrolowanego', '0');


insert into questions  (category_id, number, question_val, update_date) values ( 27, 'Kto odpowiada za zatankowanie odpowiedniej ilości paliwa przed lotem?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'dowódca statku powietrznego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'mechanik', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'dowolna osoba wyznaczona przez dowódcę', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 27, 'Podczas lotu w przestrzeni G informator słuzby FIS', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Moze udzielić nam informacji o ruchu w miarę posiadanych danych, nie zwlniając nas z obowiązku utrzymania separacji z innymi statkami powietrznymi', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Ma obowiązek informować nas o otaczającym nas ruchu lotniczym', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Odpowie nam na kazde zapytanie o zajętości przestrzeni niezaleznie od naszej wysokości lotu i miejsca z którego nadajemy', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 27, 'Komunikaty ATIS są w Polsce dostępne', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na lotniskach kontrolowanych', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na lotniskach niekontrolowanych', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'na wszystkich lotniskach', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 27, 'Na co powinien zwrócić uwagę dowódca wykonując kalkulację paliwową?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na mozliwość przekroczenia maksymalnej dopuszczalnej masy do startu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Na cenę paliwa', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Nie musi zwracać uwagi na zadne elementy', '0');



-- 8: Prawo lotnicze oraz procedury kontroli ruchu lotniczego
-- 1. W polu 13 formularza planu lotu, po wskaźniku lokalizacji ICAO wpisuje się:
-- - Czas startu (DEP)
-- - Wyliczony czas startu (CTOT)
-- + Przewidywany czas odblokowania (EOBT)
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'W polu 13 formularza planu lotu, po wskaźniku lokalizacji ICAO wpisuje się:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Przewidywany czas odblokowania (EOBT)', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Czas startu (DEP)', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wyliczony czas startu (CTOT)', '0');

-- 2. Gdy w polu 10a (wyposazenie łączności i nawigacji) formularza planu lotu wpisano literę G, nalezy podać w polu 18 po wskaźniku NAV/ systemy zewnętrznego wspomagania GNSS:
-- - Fałsz
-- + Prawda
-- - Tylko w lotach IFR
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Gdy w polu 10a (wyposazenie łączności i nawigacji) formularza planu lotu wpisano literę G, nalezy podać w polu 18 po wskaźniku NAV/ systemy zewnętrznego wspomagania GNSS:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Prawda', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Fałsz', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Tylko w lotach IFR', '0');

-- 3. Strefa zakazana oznaczna jest literą:
-- + P 
-- - D 
-- - R 
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Strefa zakazana oznaczna jest literą:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'P', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'D', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'R', '0');

-- 4. Prędkość lotu 250 km/h zapisuje się w formularzu planu lotu następująco:
-- + K0250
-- - K250 
-- - K0250+
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Prędkość lotu 250 km/h zapisuje się w formularzu planu lotu następująco:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'K0250', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'K250', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'K0250+', '0');

-- 5. Brak skreślenia litery J po wskaźniku S/ w polu 19 planu lotu oznacza, e na pokładzie znajduje się następujące wyposazenie do przetrwania:
-- - Pustynne
-- + Dzunglowe
-- - Morskie
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Brak skreślenia litery J po wskaźniku S/ w polu 19 planu lotu oznacza, e na pokładzie znajduje się następujące wyposazenie do przetrwania:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Dzunglowe', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Pustynne', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Morskie', '0');

-- 6. Skrót NOTAM rozwija się następująco:
-- - Notice to Airman
-- - Notices To Airmen
-- + Notice To Airmen
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Skrót NOTAM rozwija się następująco:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Notice To Airmen', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Notice to Airman', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Notices To Airmen', '0');

-- 7. Litera G w polu 10a formularza planu lotu (wyposazenie łączności i nawigacji) oznacza:
-- - GPS 
-- + Global Navigation Satellite System (GNSS)
-- - System lądowania GBAS
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Litera G w polu 10a formularza planu lotu (wyposazenie łączności i nawigacji) oznacza:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Global Navigation Satellite System (GNSS)', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'GPS', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'System lądowania GBAS', '0');

-- 8. Zapis M0200 w polu 15 (trasa lotu) planu lotu oznacza:
-- + wysokość bezwzględną w dziesiątkach metrów
-- - wysokość bezwzględną w setkach metrów
-- - wysokość względną w dziesiątkach metrów
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Zapis M0200 w polu 15 (trasa lotu) planu lotu oznacza:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wysokość bezwzględną w dziesiątkach metrów', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wysokość bezwzględną w setkach metrów', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wysokość względną w dziesiątkach metrów', '0');

-- 9. Załącznik 19 do Konwencji o Międzynarodowym Lotnictwie Cywilnym dotyczy:
-- - Zarządzania ruchem lotniczym
-- - Zarządzania lotnictwem Cywilnym
-- + Zarządzania bezpieczeństwem
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Załącznik 19 do Konwencji o Międzynarodowym Lotnictwie Cywilnym dotyczy:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zarządzania bezpieczeństwem', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zarządzania ruchem lotniczym', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zarządzania lotnictwem Cywilnym', '0');

-- 10. Po wskaźniku TALT/ w polu 18 planu lotu podaje się:
-- - Wskaźnik lokalizacji lotniska zapasowego na trasie
-- + Wskaźnik lokalizacji lotniska zapasowego po starcie
-- - Wskaźnik lokalizacji lotniska zapasowego
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Po wskaźniku TALT/ w polu 18 planu lotu podaje się:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wskaźnik lokalizacji lotniska zapasowego po starcie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wskaźnik lokalizacji lotniska zapasowego na trasie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Wskaźnik lokalizacji lotniska zapasowego', '0');

-- 11. EASA to:
-- - Organizacja Miedzynarodowego Lotnictwa Cywilnego
-- + Agencja UE ds. Bezpieczeństwa Lotniczego
-- - Urząd Lotnictwa Cywilnego
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'EASA to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Agencja UE ds. Bezpieczeństwa Lotniczego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Organizacja Miedzynarodowego Lotnictwa Cywilnego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Urząd Lotnictwa Cywilnego', '0');

-- 12. Słuzba dozorowania moze zidentyfikowac statek powietrzny wykorzystując transponder (SSR) poprzez:
-- - rozpoznanie bezpośrednie za pomocą modu S 
-- - rozpoznanie przydzielonego indywidualnego kodu SSR 
-- + obie odpowiedzi są poprawne 
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Słuzba dozorowania moze zidentyfikowac statek powietrzny wykorzystując transponder (SSR) poprzez:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'obie odpowiedzi są poprawne ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'rozpoznanie bezpośrednie za pomocą modu S ', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'rozpoznanie przydzielonego indywidualnego kodu SSR', '0');

-- 13. Skreślenie wszystkich liter (P, D, J, M) znajdujących się po wskaźniku S/ w polu 19 planu lotu oznacza:
-- + całkowity brak wyposazenia do przetrwania
-- - całkowity brak wyposazenia standardowego
-- - całkowity brak wyposazenia ratowniczego
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Skreślenie wszystkich liter (P, D, J, M) znajdujących się po wskaźniku S/ w polu 19 planu lotu oznacza:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'całkowity brak wyposazenia do przetrwania', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'całkowity brak wyposazenia standardowego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'całkowity brak wyposazenia ratowniczego', '0');

-- 14. Zintegrowany Pakiet Informacji Lotniczych to składowa część Zbioru Informacji Lotniczych:
-- - Prawda
-- + Fałsz
-- - Zintegrowany Pakiet Informacji Lotniczych nie istnieje
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Zintegrowany Pakiet Informacji Lotniczych to składowa część Zbioru Informacji Lotniczych:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Fałsz', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Prawda', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Zintegrowany Pakiet Informacji Lotniczych nie istnieje', '0');

-- 15. Co zawiera pole B) NOTAM 
-- - Datę i czas zakończenie ograniczenia
-- + Datę i czas UTC rozpoczęcia ograniczenia
-- - Datę i czas LMT rozpoczęcia ograniczenia
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Co zawiera pole B) NOTAM :', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Datę i czas UTC rozpoczęcia ograniczenia', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Datę i czas zakończenie ograniczenia', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Datę i czas LMT rozpoczęcia ograniczenia', '0');

-- 16. O ile moze zostać zmniejszony czas 45 godzin lotu na samolotach jednosilnikowych tłokowych, kiedy kandydat do licencji pilota samolotowego turystycznego jest posiadaczem świadectwa kwalifikacji pilota statku powietrznego ultralekkiego o cechach samolotu?
-- + O czas lotu wynoszący 10% czasu lotu wykonanego przez kandydata w charakterze dowódcy tego statku powietrznego, jednak nie więcej ni 10 godzin pod warunkiem prowadzenia szkolenia wegług programu szkolenia zatwierdzonego dla tego typu kandydatów
-- - O 10 godzin
-- - nie ma takiej mozliwości
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'O ile moze zostać zmniejszony czas 45 godzin lotu na samolotach jednosilnikowych tłokowych, kiedy kandydat do licencji pilota samolotowego turystycznego jest posiadaczem świadectwa kwalifikacji pilota statku powietrznego ultralekkiego o cechach samolotu?:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'O czas lotu wynoszący 10% czasu lotu wykonanego przez kandydata w charakterze dowódcy tego statku powietrznego, jednak nie więcej ni 10 godzin pod warunkiem prowadzenia szkolenia wegług programu szkolenia zatwierdzonego dla tego typu kandydatów', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'O 10 godzin', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie ma takiej mozliwości', '0');

-- 17. Poniewaz formularz planu lotu zawiera dwa pola do wpisania lotnisk zapasowych, składający taki plan lotu na lot IFR musi wpisać co najmniej dwa przewidywane lotniska zapasowe, np. EPBC i EPWA
-- - Prawda
-- + Fałsz
-- - W ogóle nie trzeba podawać lotniska zapasowego w planie lotu
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Poniewaz formularz planu lotu zawiera dwa pola do wpisania lotnisk zapasowych, składający taki plan lotu na lot IFR musi wpisać co najmniej dwa przewidywane lotniska zapasowe, np. EPBC i EPWA:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Fałsz', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Prawda', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'W ogóle nie trzeba podawać lotniska zapasowego w planie lotu', '0');

-- 18. Zmiana zwykła do AIP zawiera dane:
-- + mało istotne
-- - wazne dla wybranych grup uytkowników
-- - bardzo wazne dla wszystkich uzytkownikow
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Zmiana zwykła do AIP zawiera dane:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'mało istotne', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wazne dla wybranych grup uytkowników', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'bardzo wazne dla wszystkich uzytkownikow', '0');

-- 19. Brak skreślenia litery P po wskazaniu S/ w polu 19 planu lotu oznacza, ze na pokładzie znajduje się następujące wyposazenie do przetrwania:
-- - Polarno-Pustynne
-- - Pustynne
-- + Polarne
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Brak skreślenia litery P po wskazaniu S/ w polu 19 planu lotu oznacza, ze na pokładzie znajduje się następujące wyposazenie do przetrwania:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Polarne', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Polarno-Pustynne', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Pustynne', '0');

-- 20. Statek powietrzny o znakach SP-0123 to:
-- + motoszybowiec
-- - samolot ultralekki
-- - wiatrakowiec
insert into questions  (category_id, number, question_val, update_date) values ( 28, '', 'Statek powietrzny o znakach SP-0123 to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'motoszybowiec', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'samolot ultralekki', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wiatrakowiec', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Biuro NOTAM w Polsce jest czynne', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'całodobowo', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'od 08.00 do 20.00 czasu UTC', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'od 06.00. do 22.00 czasu UTC', '0');


insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Jak długo wazne jest uprawnienie do wykonywania lotów na samolotach jednosilnikowych SEP(L)', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2 lata', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '5 lat', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'bezterminowo', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Czy w Biurze Odpraw Załóg mozna złozyć meldunek dotyczący np. incydentu na lotnisku?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Tak', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Nie, trzeba go przesłać faksem do ULC', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Nie, trzeba go przesłać faksem do zarządzającego lotniskiem', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Litera G w polu 8 (rodzaj lotu) formularza planu lotu oznacza', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Lot lotnictwa ogólnego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Lot lotnictwa państwowego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Lot VFR', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Samolot kategorii turbulencji w śladzie M wylądował na pasie. Ile minut musi wynosić separacja podchodzącego za niem statku o kategorii turbulencji L?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '3 min', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '5 min', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '2 min', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Punkt oczekiwania to', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'miejsce wyznaczone w celu ochrony drogi startowej, za który statek powietrzny nie ma prawa przekołować bez zezwolenia na zajęcie pasa', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'miejsce wyznaczone przed drogą startową w którym statek powietrzny powinien zwrobić próbę silnika', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'miejsce na lotnisku słuzące oczekiwaniu statków powietrznych na przydzielenie miejsca postojowego', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Minima w lotach nocnych VFR w przestrzeni kontrolowanej wynoszą', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'widzialność 5km, podstawy 150 stóp', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'widzialność 1500m, podstawy 1000 stóp ', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'widzialność 10km, podstawy 1000 stóp', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Decyzję o rodzaju wydawanej publikacji (np. NOTAM, Suplement do AIP, Zmiana AIRAC lub Zmiana zwykła do AIP) podejmuje', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Słuzba Informaji Lotniczej', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Urząd Lotnictwa Cywilnego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Dostawca danych do tej publikacji (np. zarządzający lotniskiem)', '0');


insert into questions  (category_id, number, question_val, update_date) values ( 28, 'Co oznacza squawk 7600', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'awaria radia', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'porwanie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'powazne awaria na pokładzie statku', '0');


-- 9: Procedury operacyjne
-- 1. O eksploatacji statków powietrznych mówi:
-- + Aneks 6 ICAO
-- - Aneks 12 ICAO
-- - Aneks 1 ICAO
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'O eksploatacji statków powietrznych mówi:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Aneks 6 ICAO', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Aneks 12 ICAO', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Aneks 1 ICAO', '0');

-- 2. W przypadku wlotu w chmury i znalezienia się w warunkach IMC, nalezy:
-- - ustawić kod transpondera 7600
-- - kontynuować lot 
-- + kontrolując parametry lotu niezwłocznie opuścić ten rejon
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'W przypadku wlotu w chmury i znalezienia się w warunkach IMC, nalezy:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kontrolując parametry lotu niezwłocznie opuścić ten rejon', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ustawić kod transpondera 7600', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kontynuować lot', '0');

-- 3. W przypadku niezamierzonego wlotu w miejsca w których występują warunki oblodzenia, nalezy,
-- - powiadomić odpowiednie słuzby
-- + niezwołocznie opóścić przestrzeń w której oblodzenie występuje, np. poprzez zmniejszenie wysokości
-- - kontynuować lot
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'W przypadku niezamierzonego wlotu w miejsca w których występują warunki oblodzenia, nalezy:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'niezwołocznie opóścić przestrzeń w której oblodzenie występuje, np. poprzez zmniejszenie wysokości', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'powiadomić odpowiednie słuzby', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kontynuować lot', '0');

-- 4. Przed przystąpieniem do startu dowódca statku powietrznego musi upewnić się na podstawie dostępnych mu informacji, ze warunki meteorologiczne na lotnisku startu oraz stan planowanej do startu drogi startowej:
-- - odpowiadają danym z API
-- - są zgodne z podawanymi przez odpowiednie słuzby
-- + nie wpłyną ujemnie na bezpieczeństwo startu i odlotu
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Przed przystąpieniem do startu dowódca statku powietrznego musi upewnić się na podstawie dostępnych mu informacji, ze warunki meteorologiczne na lotnisku startu oraz stan planowanej do startu drogi startowej:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie wpłyną ujemnie na bezpieczeństwo startu i odlotu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'odpowiadają danym z API', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'są zgodne z podawanymi przez odpowiednie słuzby', '0');

-- 5. Raport o zdarzeniu w locie jest wazny jeśli złozy go:
-- + jeden z członków załogi
-- - wszyscy członkowie załogi
-- - pilot
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Raport o zdarzeniu w locie jest wazny jeśli złozy go:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'jeden z członków załogi', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'wszyscy członkowie załogi', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pilot', '0');

-- 6. Za sprawdzenie wyposazenia do lotu samolotu odpowiada:
-- + Dowódca załogi
-- - Obsługa techniczna
-- - Obsługa lotniskowa
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Za sprawdzenie wyposazenia do lotu samolotu odpowiada:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Dowódca załogi', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Obsługa techniczna', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Obsługa lotniskowa', '0');

-- 7. Lądowanie zapobiegawcze to:
-- + lądowanie samolotem z usterką, która doprowadziłaby do powanych konsekwencji w przypadku kontynuowania lotu (np. wyciek oleju z silnika)
-- - jest to to samo, co lądowanie awaryjne
-- - nie wyróznia się takiego pojęcia
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Lądowanie zapobiegawcze to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'lądowanie samolotem z usterką, która doprowadziłaby do powanych konsekwencji w przypadku kontynuowania lotu (np. wyciek oleju z silnika)', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'jest to to samo, co lądowanie awaryjne', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie wyróznia się takiego pojęcia', '0');

-- 8. Za separację pomiędzy statkami powietrznymi w przestrzeni kontrolowanej odpowiada:
-- - pilot
-- - nikt nie ponosi odpowiedzialności
-- - kontroler
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Za separację pomiędzy statkami powietrznymi w przestrzeni kontrolowanej odpowiada:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kontroler', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pilot', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nikt nie ponosi odpowiedzialności', '0');

-- 9. Procedury awaryjne opisane są w:
-- + Rozdziale 3 Instrukcji Uzytkowania w Locie
-- - Rozdziale 4 Instrukcji Uzytkowania w Locie
-- - Rozdziale 5 Instrukcji Uzytkowania w Locie
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Procedury awaryjne opisane są w:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozdziale 3 Instrukcji Uzytkowania w Locie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozdziale 4 Instrukcji Uzytkowania w Locie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Rozdziale 5 Instrukcji Uzytkowania w Locie', '0');

-- 10. Ilość paliwa w samolocie mozna sprawdzić w następującym dokumencie:
-- - Instrukcja uzytkowania w locie
-- + PDT - Pokładowy Dziennik Techniczny
-- - Świadectwo Antyhałasowe
insert into questions  (category_id, number, question_val, update_date) values ( 34, '', 'Ilość paliwa w samolocie mozna sprawdzić w następującym dokumencie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'PDT - Pokładowy Dziennik Techniczny', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Instrukcja uzytkowania w locie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Świadectwo Antyhałasowe', '0');


insert into questions  (category_id, number, question_val, update_date) values ( 34, 'Kontrola pracy pokładowego radaru meteorologicznego w czasie postoju na płycie peronowej lotniska powinna odbywać się przez', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kontrola radaru na płycie peronowej jet niedopuszczalna', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'uzycie trybu testowego, jeśli taki jest dostępny', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'włączenie wiązki skanującej i obserwacje zgodności obrazu na ekranie z otoczeniem', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 34, 'Kod transpondera 7700 oznacza', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'bezpośrednie niebezpieczeństwo', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'utratę łączności', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'próbę uprowadzenia samolotu', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 34, 'W przypadku utraty mocy po starcie, kiedy samolot znajduje się ponizej 100 metrów nad terenem', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nalezy lądować na wprost dokonując jedynie niewielkiej odchyłki od kursu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'mozna wykonywać dowrót do lotniska', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kierunek lądowania jest dowolny', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 34, 'Czy nalezy zgłosić kolizję z ptakiem?', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tak, zawsze', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie ma to znaczenia', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 34, 'Lista kontrolna "Read and do" wykonywana jest w następujący sposób', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'elementy sprawdzane są punkt po punkcie w trakcie czytania listy kontrolnej', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'czynności wykonywane są najpierw, a następnie sprawdzane za pomocą listy kontrolnej', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'najpierw czytamy  listę, a następnie wykonujemy wszystkie punktu', '0');

-- 10: Zasady lotu
-- 1. Opór, który jest wynikiem zawirowań na końcówkach płata lotniczego spowodowanych wyrównaniem ciśnienia na górnej i dolnej powierzchni nosi nazwę:
-- + oporu indukowanego
-- - oporu interferyncyjnego
-- - oporu falowego
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Opór, który jest wynikiem zawirowań na końcówkach płata lotniczego spowodowanych wyrównaniem ciśnienia na górnej i dolnej powierzchni nosi nazwę:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'oporu indukowanego', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'oporu interferyncyjnego', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'oporu falowego', '0');

-- 2. Samolot po wytrąceniu z równowagi wykonuje oscylacje o powiększającej się amplitudzie. Ten samolot jest dynamicznie:
-- - statyczny
-- + niestatyczny
-- - obojętny (neutralny)
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Samolot po wytrąceniu z równowagi wykonuje oscylacje o powiększającej się amplitudzie. Ten samolot jest dynamicznie:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'niestatyczny', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'statyczny', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'obojętny (neutralny)', '0');

-- 3. Kąt natarcia płata o profilu wklęsło-wypukłym, dla którego nie powstaje siła nośna ma wartość:
-- + ujemną
-- - dodatnią
-- - zerową
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Kąt natarcia płata o profilu wklęsło-wypukłym, dla którego nie powstaje siła nośna ma wartość:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'ujemną', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'dodatnią', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zerową', '0');

-- 4. Vs to:
-- + prędkość przeciągnięcia
-- - prędkość dopuszczalna
-- - maksymalna prędkość dla klap
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Vs to:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'prędkość przeciągnięcia', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'prędkość dopuszczalna', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'maksymalna prędkość dla klap', '0');

-- 5. Gdy klapy są chowane przy stałym kącie natarcia:
-- - siła nośna nie zmienia się
-- - siła nośna rośnie
-- + siła nośna maleje
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Gdy klapy są chowane przy stałym kącie natarcia:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'siła nośna maleje', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'siła nośna nie zmienia się', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'siła nośna rośnie', '0');

-- 6. Kompensacja masowa (wywazenie masowe)
-- + Stosowana do wyeliminowania drgań samowzbudnych lotek i sterów
-- - Stosowana do wyeliminowania drgań klap
-- - Stosowana do wyeliminowania drgań hamulca aerodynamicznego
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Kompensacja masowa (wywazenie masowe):', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Stosowana do wyeliminowania drgań samowzbudnych lotek i sterów', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Stosowana do wyeliminowania drgań klap', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Stosowana do wyeliminowania drgań hamulca aerodynamicznego', '0');

-- 7. Jeśli ster wysokości jest zablokowany, przestawienie klapki trymera w pozycję: nos w dół, spowoduje:
-- - zmniejszenie kąta natarcia samolotu
-- + zwiększenie kąta natarcia samolotu
-- - nie spowoduje zadnej zmiany
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Jeśli ster wysokości jest zablokowany, przestawienie klapki trymera w pozycję: nos w dół, spowoduje:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zwiększenie kąta natarcia samolotu', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zmniejszenie kąta natarcia samolotu', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie spowoduje zadnej zmiany', '0');

-- 8. Nieprzekraczalna prędkość lotu dla wszystkich operacji ma symbol:
-- + Vne 
-- - Vfe 
-- - Vno 
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Nieprzekraczalna prędkość lotu dla wszystkich operacji ma symbol:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Vne', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Vfe', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Vno', '0');

-- 9. Zwichrzenie geometryczne skrzydła charakteryzuje się tym, ze:
-- + cięciwy profili geometrycznych w kolejnych przekrojach nie lezą w jednej płaszczyźnie
-- - skrzydła wygięte są w górę podczas lotu
-- - skrzydła wygięte są w dół podczas postoju samolotu na ziemi
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Zwichrzenie geometryczne skrzydła charakteryzuje się tym, ze:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'cięciwy profili geometrycznych w kolejnych przekrojach nie lezą w jednej płaszczyźnie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'skrzydła wygięte są w górę podczas lotu', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'skrzydła wygięte są w dół podczas postoju samolotu na ziemi', '0');

-- 10. Gdy powietrze przepływa przez kanał o zmiennej powierzchni przekroju zmienia się w nim ciśnienie statyczne. Jak?
-- + zmniejsza się przy maleniu powierzchni przekroju
-- - zmniejsza się przy wzroście powierzchni przekroju
-- - nie zmienia się wcale
insert into questions  (category_id, number, question_val, update_date) values ( 35, '', 'Gdy powietrze przepływa przez kanał o zmiennej powierzchni przekroju zmienia się w nim ciśnienie statyczne. Jak?:', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zmniejsza się przy maleniu powierzchni przekroju', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zmniejsza się przy wzroście powierzchni przekroju', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nie zmienia się wcale', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 35, 'Samolot wykonuje zakręt w prawo, kulka chyłomierza jest na lewo od środka. Zakręt jest', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'z wyślizgiem', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'prawidłowy', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'z ześlizgiem', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 35, 'Przy pełnym wychyleniu klap opór samolotu', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'rośnie', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'maleje', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'pozostaje stały', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 35, 'Do zmniejszania oporu indukowanego oraz turbulencji w śladzie aerodynamicznym stosuje się', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'winglety', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'chowane podwozie', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'przestawialne śmigła', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 35, 'Wywazenie aerodynamiczne staru kierunku słuzy', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zmniejszeniu sił uzywanych do sterowania sterem kierunku', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zapobiezeniu odwrotnemu działaniu staru kierunku', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'zapobiezeniu flatterowi staru kierunku', '0');

insert into questions  (category_id, number, question_val, update_date) values ( 35, '1013 hPa to', ':', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '101 300 Pa', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '10 130 Pa', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '1013 Pa', '0');

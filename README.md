# lkequiz
LKEQuiz3

## webapp:

### tworzenie nowej aplikacji:

 - npx create-react-app webapp

### sprawdzanie kodu:

- mvn clean install sonar:sonar -Psonar --settings=../settings.xml

### budowanie paczki javascript

- mvn clean install

### tworzenie nowej aplikacji

- mvn -B -DdevelopmentVersion="0.0.2-SNAPSHOT" -DreleaseVersion="0.0.1" -Dresume=false release:prepare release:perform

## mobileapp
 
### tworzenie nowej aplikacji:

- npx react-native@0.71.8 init mobileapp

### synchronizacja wersji mvn i npm

- npm run sync-pom-version
- npm i cors
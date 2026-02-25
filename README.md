# lkequiz
LKEQuiz3

## webapp:

### tworzenie nowej aplikacji:

 - npx create-react-app webapp

### sprawdzanie kodu:

- mvn clean install sonar:sonar -Psonar --settings=../settings.xml -Dsonar.qualitygate.wait=true

### budowanie paczki javascript

- mvn clean install

### tworzenie nowej aplikacji

- mvn -B -DdevelopmentVersion="0.0.2-SNAPSHOT" -DreleaseVersion="0.0.1" -Dresume=false release:prepare release:perform

## mobileapp

## Nowe podejście

### Frontend/Mobile
nvm use node 25
npx create-expo-app@latest --template default@next
echo n | npm run reset-project
npx expo install expo-dev-client

<!-- npm i @react-native-community/async-storage -->
<!-- npm i @react-native-async-storage/async-storage -->
<!-- npm i @supabase/supabase-js -->
npx expo install expo-image-picker
npx expo install expo-file-system
<!-- npx expo install axios -->
npx expo install react-native-mmkv  react-native-nitro-modules
npx expo install expo-build-properties

<!-- npm install react-native-session-storage -->
<!-- npx expo install expo-native-storage -->
npx expo prebuild --clean

npx expo run:android

npm install @react-native-community/cli



info
https://www.youtube.com/watch?v=RdJhqaOIWn0
https://github.com/machadop1407/react-native-app-course/blob/main/src/lib/date-helper.ts
https://github.com/machadop1407/react-native-app-course/blob/main/src/lib/supabase/storage.ts
https://github.com/machadop1407/react-native-app-course/blob/main/src/context/AuthContext.tsx
https://github.com/machadop1407/react-native-app-course/blob/main/src/lib/date-helper.ts



## BUILD bundle

### Android

npx expo optimize
npx react-native build-android --mode=release
sshpass -p 'xxx' scp android/app/build/outputs/apk/release/app-release.apk ubuntu@e-strix.pl:/home/ubuntu/wp/releases/lkequiz/0.0.1/lkequiz.apk

### Web

mv .env .env-tmp
mv .env-web .env
npx expo export --platform web
mv .env .env-web
mv .env-tmp .env








###
alter table public.profile enable row level security;

create policy "User can insert their own profile "
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "User can update their own profile "
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "User can select their own profile "
on public.profiles
for update
to authenticated
using (auth.uid() = id);

create policy "User can select others profile "
on public.profiles
for update
to authenticated
using (auth.uid() <> id);

###
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW 
EXECUTE FUNCTION public.handle_new_user;
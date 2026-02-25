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
npm i @react-native-community/async-storage
<!-- npm i @react-native-async-storage/async-storage -->
npm i @supabase/supabase-js
npm i expo-image-picker
npx expo install expo-file-system

<!-- npm install react-native-session-storage -->
npx expo install expo-native-storage
npx expo prebuild --clean

npm ls @react-native-community/cli









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
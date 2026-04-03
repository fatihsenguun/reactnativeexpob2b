// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // The moment the app boots, instantly send them to the login screen!
  return <Redirect href="/(auth)/login" />;
}
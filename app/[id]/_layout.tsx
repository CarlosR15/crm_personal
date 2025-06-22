import { Tabs } from 'expo-router';

export default function ContactTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Info' }} />
      <Tabs.Screen name="notes" options={{ title: 'Notas' }} />
      <Tabs.Screen name="settings" options={{ title: 'Config' }} />
    </Tabs>
  );
}
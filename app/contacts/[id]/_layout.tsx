import { Tabs } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function ContactTabsLayout() {
  const { id } = useLocalSearchParams();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info" size={24} color={color} />
          ),
        }}
        initialParams={{ id }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notes" size={24} color={color} />
          ),
        }}
        initialParams={{ id }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Config',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
        initialParams={{ id }}
      />
    </Tabs>
  );
}
import { Tabs } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function ContactTabsLayout() {
  // se obtiene el parametro 'id' de la URL usando el hook useLocalSearchParams
  const { id } = useLocalSearchParams();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info" size={24} color={color} />
          ),
        }}
        initialParams={{ id }} // se pasa el id como parámetro inicial
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notes" size={24} color={color} />
          ),
        }}
        initialParams={{ id }} // se pasa el id como parámetro inicial
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Config',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
        initialParams={{ id }} // se pasa el id como parámetro inicial
      />
    </Tabs>
  );
}
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="plan/index"
        options={{ title: "Plan d'Affaires", tabBarIcon: ({ color, size }) => (
          <Ionicons name="document-text-outline" color={color} size={size} />
        ) }}
      />
      <Tabs.Screen
        name="devis/index"
        options={{ title: 'Devis', tabBarIcon: ({ color, size }) => (
          <Ionicons name="pricetag-outline" color={color} size={size} />
        ) }}
      />
      <Tabs.Screen
        name="budget/index"
        options={{ title: 'Budget', tabBarIcon: ({ color, size }) => (
          <Ionicons name="pie-chart-outline" color={color} size={size} />
        ) }}
      />
      <Tabs.Screen
        name="demarches/index"
        options={{ title: 'Démarches', tabBarIcon: ({ color, size }) => (
          <Ionicons name="list-circle-outline" color={color} size={size} />
        ) }}
      />
    </Tabs>
  );
}

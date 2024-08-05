import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import BorrowedBooksScreen from '../screens/BorrowedBooksScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ books, borrowedBooks, setBorrowedBooks }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Books') {
              iconName = 'book';
            } else if (route.name === 'Borrowed') {
              iconName = 'list';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: '#3d8ecc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Books" options={{headerShown:false}}>
          {props => <StackNavigator {...props} books={books} borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks} />}
        </Tab.Screen>
        
        <Tab.Screen name="Borrowed">
          {props => <BorrowedBooksScreen {...props} setBorrowedBooks={setBorrowedBooks} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

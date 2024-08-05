import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksListScreen from '../screens/BooksListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = ({ books, borrowedBooks, setBorrowedBooks }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3d8ecc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="BooksList" options={{ title: 'Books List' }}>
        {props => <BooksListScreen {...props} books={books} borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks} />}
      </Stack.Screen>
      
      <Stack.Screen name="BookDetail" options={{ title: 'Book Detail' }}>
        {props => <BookDetailScreen {...props} borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;

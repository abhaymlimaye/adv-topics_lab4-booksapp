import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BooksListScreen = ({ books, borrowedBooks }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isBorrowed = borrowedBooks.some(borrowedBook => borrowedBook.id === item.id);

          return (
            <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
              <View style={[styles.bookItem, isBorrowed && styles.borrowedBookItem]}>
                <Text style={styles.bookName}>{item.name}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bookItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  borrowedBookItem: {
    backgroundColor: '#f0f0f0', // Change to desired color for borrowed books
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default BooksListScreen;

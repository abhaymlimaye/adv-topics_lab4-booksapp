import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { firestore, serverTimestamp } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const BookDetailScreen = ({ route, borrowedBooks, setBorrowedBooks }) => {
  const { book } = route.params;
  const [loading, setLoading] = useState(false);

  const isAlreadyBorrowed = borrowedBooks.some(borrowedBook => borrowedBook.id === book.id);

  const handleBorrow = async () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert('Borrow Limit Exceeded', 'You cannot borrow more than 3 books at a time.');
      return;
    }

    if (isAlreadyBorrowed) {
      Alert.alert('Book Already Borrowed', 'You have already borrowed this book.');
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, 'borrowedBooks'), {
        ...book,
        borrowedAt: serverTimestamp(),
      });

      setBorrowedBooks(prev => [...prev, { ...book, ID: docRef.id }]);
      Alert.alert('Success', 'Book borrowed successfully.');
    } catch (error) {
      console.error('Error borrowing book:', error);
      Alert.alert('Error', 'Could not borrow the book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3d8ecc" />
      ) : (
        <Button title="Borrow Book" onPress={handleBorrow} disabled={isAlreadyBorrowed} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    color: '#888',
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default BookDetailScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore } from '../../../firebase';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const BorrowedBooksScreen = ({ setBorrowedBooks }) => {
  const [borrowedBooks, setBorrowedBooksState] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'borrowedBooks'), snapshot => {
      const borrowedList = snapshot.docs.map(doc => ({
        ID: doc.id,
        ...doc.data()
      }));
      setBorrowedBooksState(borrowedList);
      setBorrowedBooks(borrowedList); // Update parent state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [setBorrowedBooks]);

  const handleReturn = async (ID) => {
    try {
      await deleteDoc(doc(firestore, 'borrowedBooks', ID));
      // The listener will automatically update the list
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={item => item.ID}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View style={styles.detailsContainer}>
              <Text style={styles.bookTitle}>{item.name}</Text>
              <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              <Text style={styles.bookRating}>Rating: {item.rating}</Text>
              <TouchableOpacity onPress={() => handleReturn(item.ID)}>
                <Text style={styles.returnText}>Return</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  bookRating: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  returnText: {
    fontSize: 16,
    color: '#3d8ecc',
  },
});

export default BorrowedBooksScreen;

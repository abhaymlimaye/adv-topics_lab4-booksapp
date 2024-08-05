import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import TabNavigator from './src/components/navigation/TabNavigator';

const App = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(firestore, 'books');
        const booksSnapshot = await getDocs(booksCollection);
        const booksData = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const fetchBorrowedBooks = async () => {
      try {
        const borrowedBooksCollection = collection(firestore, 'borrowedBooks');
        const borrowedBooksSnapshot = await getDocs(borrowedBooksCollection);
        const borrowedBooksData = borrowedBooksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBorrowedBooks(borrowedBooksData);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchBooks(), fetchBorrowedBooks()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <TabNavigator books={books} borrowedBooks={borrowedBooks} setBorrowedBooks={setBorrowedBooks} />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;

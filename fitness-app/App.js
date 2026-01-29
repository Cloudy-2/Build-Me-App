import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import NavigationBar from './components/NavigationBar';
import Feed from './pages/Feed';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import Profile from './pages/Profile';

export default function App() {
  const [activePage, setActivePage] = useState('logworkout');

  const renderPage = () => {
    switch (activePage) {
      case 'feed':
        return <Feed />;
      case 'dashboard':
        return <Dashboard />;
      case 'logworkout':
        return <LogWorkout />;
      case 'profile':
        return <Profile />;
      default:
        return <LogWorkout />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>BUILD ME APP</Text>
      </View>

      {/* Active Page Content */}
      {renderPage()}

      {/* Navigation Bar */}
      <NavigationBar activePage={activePage} onPageChange={setActivePage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#808080',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

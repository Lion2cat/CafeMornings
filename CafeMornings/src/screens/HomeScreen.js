// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.jpg')} style={styles.logo} />

      <View style={styles.userInfo}>
        <View style={styles.profileImage}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>光</Text>
          <Text style={styles.userId}>NO.2187 0003 857</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Menu')}>
          <Image source={require('../../assets/yellowButton.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>点咖啡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Order')}>
          <Image source={require('../../assets/yellowButton.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>外送</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Profile')}>
          <Image source={require('../../assets/yellowButton.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>咖啡豆/周边</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 20,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700', // 黄色占位符
  },
  profileText: {
    fontSize: 16,
    color: '#fff',
  },
  userDetails: {
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 16,
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
  buttonImage: {
    width: 60,
    height: 60,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000', // 按钮文本颜色
  },
});

export default HomeScreen;

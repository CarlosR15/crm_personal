import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export const ContactAvatar = ({ uri }: { uri?: string }) => {
  return (
    <View style={styles.avatar}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: { width: 50, height: 50, borderRadius: 25, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  placeholder: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AstrologerCard = ({ astrologer }:{astrologer:AstrologersFromApi}) => {
  return (
    <View style={styles.container}>
        <View style={styles.leftContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={80} source={{ uri: astrologer.imageUrl }} />
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {Array(5).fill(0).map((_, index) => (
                <Icon key={index} name="star" size={15} color="black" />
              ))}
            </View>
            <Text style={styles.ordersText}>1213 orders</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.nameText}>{astrologer.name}</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.infoText}>{astrologer.experties.join(', ')}</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.infoText}>{astrologer.languages.join(', ')}</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.infoText}>Exp: {astrologer.experience} Years</Text>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.infoText}>₹ {astrologer.price}/min</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Icon name="verified" size={30} color="green" />
        <Button mode="outlined">Chat</Button>
      </View>
    </View>
  );
};

export default AstrologerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '78%',
    maxWidth: '78%',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'column',
    gap: 3,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ordersText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 3,
  },
  nameText: {
    fontWeight: '900',
    color: 'black',
  },
  infoText: {
    color: 'black',
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

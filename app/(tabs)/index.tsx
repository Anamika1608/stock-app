import { Image, StyleSheet, Platform, TextInput, Button , View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';


export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [stock, setStock] = useState('');

  const searchStock = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${search}&interval=5min&apikey=9TUQLE0LFZH1GKXC`);
      console.log(response);
      const data = await response.json();
      console.log('data', data);
      setStock(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    searchStock();
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 50 }}>
    
        <TextInput  aria-label='stock-name' value={search} onChangeText={setSearch} />
        <Button onPress={searchStock} title="Search" />
  




    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

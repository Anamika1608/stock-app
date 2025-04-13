import { TextInput, Button, View } from 'react-native';
import { useState } from 'react';


export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [stock, setStock] = useState('');

  const searchStock = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${search}&interval=5min&apikey=9TUQLE0LFZH1GKXC`);
      const data = await response.json();
      console.log('data', data);
      setStock(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 50 }}>

      <TextInput aria-label='stock-name' value={search} onChangeText={setSearch} />
      <Button onPress={searchStock} title="Search" />

    </View>
  );
}

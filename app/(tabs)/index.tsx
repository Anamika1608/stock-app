import { TextInput, Button, View, ScrollView, Dimensions, Text } from 'react-native';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [stockData, setStockData] = useState(null);

  const searchStock = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${search}&apikey=9TUQLE0LFZH1GKXC`);
      const data = await response.json();
      console.log('data', data);
      setStockData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChartData = () => {
    if (!stockData || !stockData['Weekly Time Series']) return null;
  
    const weeklyData = stockData['Weekly Time Series'];
  
    const dates = Object.keys(weeklyData).slice(0, 10).reverse(); // latest 10 entries
    const closePrices = dates.map(date => parseFloat(weeklyData[date]['4. close']));
  
    return {
      year: dates[0].slice(0, 4), // Extract year from the earliest shown date
      chart: {
        labels: dates.map(d => {
          const [year, month, day] = d.split('-');
          return `${day}`; // newline between day and month
        }),
        
        datasets: [
          {
            data: closePrices,
            strokeWidth: 2,
          },
        ],
      },
    };
  };
  
  const chartResult = getChartData();
  const chartData = chartResult?.chart;
  const year = chartResult?.year;
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', marginTop: 50, paddingHorizontal: 10 }}>
      <TextInput
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={search}
        onChangeText={setSearch}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button onPress={searchStock} title="Search" />

      {chartData && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
            Year: {year}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
            {stockData['Meta Data']['2. Symbol']} Weekly Closing Prices
          </Text>
          <LineChart
            data={chartData}
            width={screenWidth - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#007AFF',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </>
      )}

    </ScrollView>
  );
}

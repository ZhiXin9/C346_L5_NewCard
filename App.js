import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SectionList, StyleSheet, TextInput } from 'react-native';

const datasource = [
  {
    title: "Europe",
    backgroundColor: "#E0E0E0",  // Light gray for a neutral, modern look
    data: [
      { key: 'Big Ben', country: 'United Kingdom', landmarkId: 'big_ben', imageUrl: require('./assets/img/BigBen.jpg') },
      { key: 'Eiffel Tower', country: 'France', landmarkId: 'eiffel_tower', imageUrl: require('./assets/img/EiffelTower.jpg') },
    ]
  },
  {
    title: "Asia",
    backgroundColor: "#B2FF59",  // A soft green that is pleasant to the eyes
    data: [
      { key: 'Mount Fuji', country: 'Japan', landmarkId: 'mount_fuji', imageUrl: require('./assets/img/MountFuji.jpg') },
      { key: 'Great Wall of China', country: 'China', landmarkId: 'great_wall_of_china', imageUrl: require('./assets/img/GreatWallOfChina.jpg') },
    ]
  },
  {
    title: "America",
    backgroundColor: "#FF7043",  // A warm orange for contrast
    data: [
      { key: 'Machu Picchu', country: 'Peru', landmarkId: 'machu_picchu', imageUrl: require('./assets/img/MachuPicchu.jpg') },
      { key: 'Statue of Liberty', country: 'United States', landmarkId: 'statue_of_liberty', imageUrl: require('./assets/img/StatueOfLiberty.jpg') }
    ]
  },
  {
    title: "Africa",
    backgroundColor: "#FFF176",  // A cheerful yellow for the African section
    data: [
      { key: 'Mount Kilimanjaro', country: 'Tanzania', landmarkId: 'mount_kilimanjaro', imageUrl: require('./assets/img/MountKilimanjaro.jpg') },
      { key: 'Victoria Falls', country: 'Zimbabwe/Zambia', landmarkId: 'victoria_falls', imageUrl: require('./assets/img/VictoriaFalls.jpg') }
    ]
  }
];

const LandmarkCardListApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(datasource);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const newData = datasource.map(section => {
        return {
          ...section,
          data: section.data.filter(item =>
              item.key.toLowerCase().includes(query.toLowerCase()) ||
              item.country.toLowerCase().includes(query.toLowerCase())
          )
        };
      });
      setFilteredData(newData);
    } else {
      setFilteredData(datasource);
    }
  };

  const renderItem = ({ item, section }) => {
    return (
        <View style={[styles.itemContainer, { backgroundColor: section.backgroundColor }]}>
          <Text style={styles.textStyle}>{item.key} ({item.country})</Text>
          <Image source={item.imageUrl} style={styles.landmarkImage} />
        </View>
    );
  };

  return (
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
            style={styles.searchInput}
            placeholder="Search landmarks..."
            value={searchQuery}
            onChangeText={handleSearch}
        />

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Landmark</Text>
        </TouchableOpacity>

        <SectionList
            contentContainerStyle={{ padding: 10 }}
            sections={filteredData}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.headerText}>{title}</Text>
                </View>
            )}
            keyExtractor={(item) => item.landmarkId}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#0D98BA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionHeader: {
    padding: 10,
    marginBottom: 5,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  landmarkImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
});

export default LandmarkCardListApp;

import React from 'react';
import { FlatList, Text, View } from 'react-native';

const ItemListComponent = () => {

    return (
        <FlatList data={[]}
        renderItem={({item}) => (
          <View>
            <Text>Name</Text>
            <Text>
              Cost
            </Text>
          </View>
        )}></FlatList>
    );


}

export default ItemListComponent;
import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {addItem, updateItem} from '../store/item/action';

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  costStyle: {
    height: 50,
  },
  addAndTotalFlex: {
    height: 60,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
const ItemListComponent = (props) => {
  const [addItemModal, setAddItemModal] = useState(false);
  const {route, event} = props;
  const {eventName} = route.params;
  const ev = event.events.find((e) => e.name === eventName);
  const dispatch = useDispatch();
  const totalCost = ev?.items.reduce((acc, item) => acc + item.cost, 0);
  const onUpdateCost = (item, newCost) => {
    dispatch(updateItem({name: item.name, cost: Number(newCost), eventName}));
  };
  return (
    <View>
      {/* <View style={{flex: 1, flexDirection: 'row', height: 100}}> */}
      <View>
        <View>
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => setAddItemModal(true)}>
            <Text style={{alignItems: 'center'}}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.costStyle}>
          <Text>Total Cost : {totalCost}</Text>
        </View>
      </View>
      <AddItemComponent
        isVisible={addItemModal}
        onCancel={() => {
          setAddItemModal(false);
        }}
        onSubmit={(item) => {
          const {cost, name} = item;
          setAddItemModal(false);
          dispatch(addItem({name, cost, eventName}));
        }}></AddItemComponent>

      <FlatList
        data={ev?.items}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>Name : {item.name}</Text>
            <Text>Cost</Text>
            <TextInput
              style={{height: 40, backgroundColor: 'pink'}}
              keyboardType={'number-pad'}
              placeholder="Item name"
              onChangeText={(text) => onUpdateCost(item, text)}
              defaultValue={item.cost.toString()}></TextInput>
          </View>
        )}></FlatList>
    </View>
  );
};

const AddItemComponent = (props) => {
  const {isVisible, onSubmit, onCancel} = props;
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Event</Text>
            <TextInput
              style={{height: 40}}
              placeholder="Item name"
              onChangeText={(text) => setName(text)}></TextInput>
            <TextInput
              style={{height: 40}}
              keyboardType="number-pad"
              placeholder="Cost"
              onChangeText={(text) => setCost(Number(text))}></TextInput>

            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={onCancel}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                onSubmit({name, cost});
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  event: state.event,
});

const connector = connect(mapStateToProps);
export default connector(ItemListComponent);

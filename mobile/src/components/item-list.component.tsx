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
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import {EventState, Item} from '../store/event/types';
import {addItem, updateItem} from '../store/item/action';
import {RootState} from '../store/reducer';

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
type Props = {
  event: EventState;
  // style or dispatcher
  route: {
    params: {
      items: Item[];
      eventName: string;
    };
  };
  navigation: {
    navigate: (name: string, meta: {items: Item[]; eventName: string}) => void;
  };
};
const ItemListComponent = (props: Props) => {
  const [addItemModal, setAddItemModal] = useState(false);
  const {route, event} = props;
  const {eventName} = route.params;
  const ev = event.events.find((e) => e.name === eventName);
  const dispatch = useDispatch();
  const totalCost = ev?.items.reduce((acc, item) => acc + item.cost, 0);
  const onUpdateCost = (item: Item, newCost: string) => {
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
        onSubmit={(item: Item) => {
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

interface AddItemProps {
  isVisible: boolean;
  onSubmit: (item: Item) => void;
  onCancel: () => void;
}
const AddItemComponent = (props: AddItemProps) => {
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

const mapStateToProps = (state: RootState) => ({
  event: state.event,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ItemListComponent);

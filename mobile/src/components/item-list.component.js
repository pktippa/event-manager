import React, {useState} from 'react';
import {View} from 'react-native';
import {Modal, Button, Text, TextInput, List, Portal} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';
import {addItem, updateItem} from '../store/item/action';

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
      <Button mode="contained" onPress={() => setAddItemModal(true)}>Add</Button>
      <Text>Total Cost : {totalCost}</Text>
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

      <List.Section>
        {ev?.items.map((item) => (
          <>
          <List.Item
            title={item.name}
          />
          <TextInput
              keyboardType={'number-pad'}
              label="Cost"
              onChangeText={(text) => onUpdateCost(item, text)}
              defaultValue={item.cost.toString()}></TextInput>
          </>
        ))}
      </List.Section>
    </View>
  );
};

const AddItemComponent = (props) => {
  const {isVisible, onSubmit, onCancel} = props;
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={onCancel}>
        <TextInput
          style={{height: 40}}
          label="Item name"
          onChangeText={(text) => setName(text)}></TextInput>
        <TextInput
          keyboardType="number-pad"
          label="Cost"
          onChangeText={(text) => setCost(Number(text))}></TextInput>

        <Button mode="contained" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            onSubmit({name, cost});
          }}>
          Submit
        </Button>
      </Modal>
    </Portal>
  );
};

const mapStateToProps = (state) => ({
  event: state.event,
});

const connector = connect(mapStateToProps);
export default connector(ItemListComponent);

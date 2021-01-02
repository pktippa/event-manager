import React, {useState} from 'react';
import {TextInput, Button, Modal, Portal, List} from 'react-native-paper';
import {Provider, connect, useDispatch} from 'react-redux';
import {store} from '../store';
import {addEvent} from '../store/event/action';

const EventComponent = (props) => {
  const {event, navigation} = props;
  console.log('events ', event);
  const [addEventModal, setAddEventModal] = useState(false);
  const dispatch = useDispatch();

  const onShowAddEventModal = () => {
    setAddEventModal(true);
  };

  const onModalAddEventSubmit = (event) => {
    setAddEventModal(false);
    const {name, description} = event;
    if (name && description) {
      dispatch(addEvent(event));
    }
  };
  const onModalCancel = () => {
    setAddEventModal(false);
  };
  return (
    <>
      <Provider store={store}>
          <Button mode="contained" onPress={onShowAddEventModal}>
            Add Event
          </Button>
          <AddEventComponent
            isVisible={addEventModal}
            onSubmit={onModalAddEventSubmit}
            onCancel={onModalCancel}
          />
          {(event['events'] && (
            <List.Section>
              {event['events'].map((item) => (
                <List.Item title={item.name} description={item.description} onPress={() =>
                  navigation.navigate('ItemList', {
                    items: item.items,
                    eventName: item.name,
                  })
                }/>
              ))}
            </List.Section>
          )) ||
            null}
      </Provider>
    </>
  );
};

const AddEventComponent = (props) => {
  const {isVisible, onSubmit, onCancel} = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={onCancel}>
        <TextInput
          label="Event name"
          onChangeText={(text) => setName(text)}></TextInput>
        <TextInput
          label="Event Description"
          onChangeText={(text) => setDescription(text)}></TextInput>

        <Button mode="contained" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            onSubmit({name, description, items: []});
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
export default connector(EventComponent);

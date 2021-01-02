import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Modal, Portal} from 'react-native-paper';
import {Provider, connect, useDispatch} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <View style={styles.button}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={onShowAddEventModal}>
                    <Text style={styles.textStyle}>Add Event</Text>
                  </TouchableHighlight>
                  <AddEventComponent
                    isVisible={addEventModal}
                    onSubmit={onModalAddEventSubmit}
                    onCancel={onModalCancel}
                  />
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.container}>
                  <FlatList
                    data={event['events']}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ItemList', {
                            items: item.items,
                            eventName: item.name,
                          })
                        }>
                        <View>
                          <Text style={styles.item}>Name: {item.name}</Text>
                          <Text style={styles.item}>
                            Description: {item.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    </>
  );
};

const AddEventComponent = (props) => {
  const {isVisible, onSubmit, onCancel} = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.centeredView}>
      <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Add Event</Text>
            <TextInput
              label="Event name"
              onChangeText={(text) => setName(text)}></TextInput>
            <TextInput
              label="Event Description"
              onChangeText={(text) => setDescription(text)}></TextInput>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={onCancel}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <Button  mode="contained" onPress={onCancel}>Cancel</Button>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                onSubmit({name, description, items: []});
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    color: Colors.dark,
    height: 100,
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  event: state.event,
});

const connector = connect(mapStateToProps);
export default connector(EventComponent);

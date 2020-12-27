import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Modal,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {Provider, connect, ConnectedProps, useDispatch} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {store} from '../store';
import {ADD_EVENT, Event} from '../store/event/types';
import {RootState} from '../store/reducer';

declare const global: {HermesInternal: null | {}};

type Props = PropsFromRedux & {
  // style or dispatcher
};

const EventComponent = (props: Props) => {
  const {event, addEvent} = props;
  console.log('events ', event);
  const [addEventModal, setAddEventModal] = useState(false);
  const dispatch = useDispatch();

  const onShowAddEventModal = () => {
    setAddEventModal(true);
  };

  const onModalAddEventSubmit = (event: Event) => {
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
                  <Button
                    title="Add Event"
                    onPress={onShowAddEventModal}></Button>
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
                      <View>
                        <Text style={styles.item}>Name: {item.name}</Text>
                        <Text style={styles.item}>
                          Description: {item.description}
                        </Text>
                      </View>
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

interface AddEventProps {
  isVisible: boolean;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
}
const AddEventComponent = (props: AddEventProps) => {
  const styles = StyleSheet.create({
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

  const {isVisible, onSubmit, onCancel} = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TextInput
              style={{height: 40}}
              placeholder="Event name"
              onChangeText={(text) => setName(text)}
              defaultValue={name}></TextInput>
            <TextInput
              style={{height: 40}}
              placeholder="Event Description"
              onChangeText={(text) => setDescription(text)}
              defaultValue={description}></TextInput>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={onCancel}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                onSubmit({name, description});
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
});

const mapStateToProps = (state: RootState) => ({
  event: state.event,
});

const mapDispatchToProps = {
  addEvent: (event: Event) => ({type: ADD_EVENT, payload: event}),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EventComponent);

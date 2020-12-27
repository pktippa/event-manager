import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import {Provider,connect, ConnectedProps, useDispatch} from 'react-redux';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {store} from '../store';
import { ADD_EVENT, Event } from '../store/event/types';
import { RootState } from '../store/reducer';

declare const global: {HermesInternal: null | {}};


type Props = PropsFromRedux & {
  // style or dispatcher
}

const EventComponent = (props: Props) => {
  const {event, addEvent} = props;
  console.log('events ', event);
  const dispatch = useDispatch();
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
                  <Button title="Add Event" onPress={() => {
                    dispatch(addEvent({name: 'hello', description: 'hello world'}))
                  }}></Button>

                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
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
    width: 200
  }
});

const mapStateToProps = (state: RootState) => ({
  event: state.event
})

const mapDispatchToProps = {
  addEvent: (event: Event) => ({type: ADD_EVENT, payload: event})
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(EventComponent);

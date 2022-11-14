import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  requestUserPermission,
  NotificationListner,
} from './src/notify/notificationService';
import {removeItem} from './src/services/storageServices';
import NotifService from './src/notify/NotifService';

const App = () => {
  let notfy;
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    notfy = new NotifService(onRegister, onNotif);
    // notfy.localNotif();
    // requestUserPermission();
    // await removeItem('fcmToken');
  };

  const onRegister = token => {
    console.log('onRegister', {
      registerToken: token.token,
      fcmRegistered: true,
    });
  };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
    notfy.localNotif(notif.title, notif.message);
  };

  const handlePerm = perms => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

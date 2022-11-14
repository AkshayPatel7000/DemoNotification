import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {getItem, setItem} from '../services/storageServices';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    // GetFCMToken();
  }
}

async function GetFCMToken() {
  let fcmToken = await getItem('fcmToken');
  if (!fcmToken) {
    try {
      const FCM = await messaging().getToken();
      if (FCM) {
        console.log('NEW TOKEN', FCM);

        await setItem('fcmToken', FCM);
      }
    } catch (error) {
      console.log('error', error);
    }
  } else {
    let oldToken = await getItem('fcmToken');
    console.log('oldToken', oldToken);
  }
}
export async function NotificationListner() {
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );

        // notifyService.localNotif(remoteMessage);

        // showToast(
        //   'getInitialNotification:' +
        //     'Notification caused app to open from quit state',
        // );
      }
    });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // notifyService.localNotif(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // notifyService.localNotif(remoteMessage);
      }
    });

  messaging().onMessage(async remoteMessage => {
    notifyService.localNotif(remoteMessage);
    console.log('Notification on forground mode', remoteMessage);
  });
}
const ShowNotification = remoteMessage => {
  const details = {
    channelId: 'test',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  };
  PushNotification.localNotification(details);
};

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './core/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      FCM.subscribeToTopic('marketing');

      FCM.getToken().then(token => {
        console.log(token);
        this.authService.setFireKeyInfo(token);
        this.toastr.success("Welcome")
      });

      FCM.onNotification().subscribe(data => {
  if (data.wasTapped){
    console.log("Received in background");
    this.router.navigate(['/tabs/tab1']);
  } else {
    console.log("Received in foreground");
  };
});

      FCM.onTokenRefresh().subscribe(token => {
        console.log(token);
});

      FCM.hasPermission().then(hasPermission => {
  if (hasPermission) {
    console.log("Has permission!");
  }
})

      // FCM.clearAllNotifications();

      // FCM.unsubscribeFromTopic('marketing');
    });
  }
}

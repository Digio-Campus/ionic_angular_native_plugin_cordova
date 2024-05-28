import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

declare var cordova: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton],
})

export class Tab1Page {
  resultMessage: string;
  sum: number;

  constructor() { 
    this.resultMessage = '';
    this.sum = 0;
  }

  callNativeFunction() {
    if (cordova && cordova.plugins && cordova.plugins.miplugin) {
      cordova.plugins.miplugin.coolMethod("Mundo", (result: any) => {
        this.resultMessage = result;
      }, (error: any) => {
        console.error(error);
      });

      cordova.plugins.miplugin.calculator(1,2, (result: any) => {
        this.sum = result
      }, (error: any) => { 
        console.error(error);
      })

    } else {
      console.error('Cordova plugin MiPlugin not available');
    }
  }
}

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="wallet" href="/tabs/wallet">
          <ion-icon aria-hidden="true" :icon="walletOutline" />
          <ion-label>Wallet</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="new" href="/tabs/newtrx" >
          <ion-button class="circle-button">
            <ion-icon slot="icon-only" :icon="addCircleOutline" size="large"></ion-icon>
          </ion-button>
        </ion-tab-button>

        <ion-tab-button tab="news" href="/tabs/news">
          <ion-icon aria-hidden="true" :icon="notificationsOutline" />
          <ion-label>News</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { addCircleOutline, personOutline, homeOutline, walletOutline, notificationsOutline } from 'ionicons/icons';
</script>


<style scoped>
  .circle-button {
    width: 48px;
    height: 48px;
    --border-radius: 50%;
    --box-shadow: 0 6px 10px rgba(0, 137, 255, 0.24), 0 1px 18px rgba(0, 137, 255, 0.14);
  }
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home Page</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Home Page" />
      <TestValidation></TestValidation>
      <ion-label>{{ username }}</ion-label>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import IonRippleEffect from '@/components/IonRippleEffect.vue';
import TestValidation from '@/components/TestValidation.vue';

import { inject } from 'vue'
const apiUrl = inject<string>('API_URL')
const username = localStorage.getItem('username')

</script>

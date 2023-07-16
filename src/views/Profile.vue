<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item button lines="inset" style="margin-top: 10px;" href="/profile/username">
        <ion-label class="items">Update Username</ion-label>
      </ion-item>
      <ion-item button lines="inset" href="/profile/password">
        <ion-label class="items">Change Password</ion-label>
      </ion-item>
      <ion-item button lines="inset" href="/profile/preferredwallet">
        <ion-label class="items">Set Preferred Wallet</ion-label>
      </ion-item>
      <ion-item button lines="inset" href="#">
        <ion-label class="items">Logout</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton } from '@ionic/vue';
import { defineComponent, inject, reactive } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonTitle,
    IonHeader,
    IonToolbar,
    ExploreContainer,
    IonList,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    IonButton,
  },
  data() {
    return {
      isloading: false,
      apiUrl: inject<string>('API_URL'),
      form: reactive({
        userid: localStorage.getItem('userid'),
      }),
      notifications: [{ description: '', date: '' }],
    };
  },
  created() {
  },
  methods: {
  }
});
</script>

<style scoped>
.items{
  padding: 10px;
}
</style>

<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Login</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ExploreContainer name="Login" />
        <ion-button color="primary" @click="login()">Login</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function login(){
    router.push("/tabs");
  }
  </script>
  
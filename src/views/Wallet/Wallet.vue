<template>
  <ion-page>
    
    <ion-content :fullscreen="true">
      

      <ExploreContainer name="wallet page" />
      <WalletCard WalletName="TNG" Balance="RM1000000"/>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="addOutline" color="light"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button href="/wallettypes">
          <ion-icon :icon="walletOutline" ></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/vue';
import { addOutline, walletOutline } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
import WalletCard from '@/components/WalletCard.vue';
</script>

<style scoped>
.ion-icon{
  --color: white;
}
</style>

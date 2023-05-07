<template>
    <div>
        <ion-card>
            <ion-card-header>
                <ion-row>
                <ion-img class="img mx-1" :src="'img/logos/' + WalletName + '.png'"></ion-img>
                <ion-card-title class="font-weight-bolder px-2 mt-2 title" :style="{ color: textColor }">{{ WalletName
                }}</ion-card-title>
                </ion-row>
                <!-- <ion-card-subtitle class="px-2">Available Balance: {{ Balance }}</ion-card-subtitle> -->
            </ion-card-header>

            <ion-card-content class="mx-2">
                Available Balance: {{ Balance }}
                <slot></slot>
            </ion-card-content>
            <ion-row class="mx-2">
                <ion-button fill="clear">Transfer</ion-button>
                <ion-button fill="clear">Pay</ion-button>
                <ion-button :routerLink="{ name: 'trx.view', params: { name: WalletName, id: walletID} }" fill="clear" >View</ion-button>
            </ion-row>

        </ion-card>
    </div>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonRow, IonCol, IonImg } from '@ionic/vue';
defineProps({
    WalletName: String,
    Balance: Number,
    walletID: Number,
    textColor: {
        type: String,
        default: "white",
    },
});
</script>

<style scoped>
.title {
    font-family: "Open Sans", sans-serif;
}

ion-card {
    --background: #333333;
}
.img {
    width: 2.8em;
    height: 2.8em;
}
</style>

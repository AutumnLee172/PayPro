<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-grid class="card-center">
                <!-- <ion-header>
                <ion-toolbar>
                    <ion-title class="mx-2">Simulated Wallet</ion-title>
                </ion-toolbar>
            </ion-header> -->
                <div class="container">
                    <ion-card>
                        <ion-row class="ion-justify-content-center ">
                            <ion-card-header class="">
                                <img alt="logo" :src="'img/logos/' + name + '.png'" />
                                <div class="ion-text-center">
                                    <ion-card-title class="font-weight-bolder px-2 mt-2 title" style="color:white;">{{ name
                                    }}</ion-card-title>

                                    <ion-card-subtitle class="px-2">{{ name }}</ion-card-subtitle>
                                </div>
                            </ion-card-header>
                        </ion-row>
                        <ion-card-content>
                            <ion-row class="my-1">
                                <ion-col>
                                    <ion-input class="form-control textfield" placeholder="Username"
                                        style="color: white;"></ion-input>
                                </ion-col>
                            </ion-row>
                            <ion-row class="my-1">
                                <ion-col>
                                    <ion-input class="form-control textfield" placeholder="Password"
                                        style="color: white;"></ion-input>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col class="ion-text-center">
                                    <ion-button class="w-100 primary-btn mt-3" disabled v-if="isloading">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </ion-button>
                                    <ion-button class="w-100 primary-btn mt-3" type="submit" v-if="!isloading">Sign
                                        In</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
                        <div class="mx-4 my-3 text-justify">
                            <span>Disclaimer: This page is a simulation for external wallets or banking service provider. It
                                does not involve actual authorization from the external parties. Your username and password
                                will not be stored as well.</span>
                        </div>
                    </ion-card>
                </div>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg, IonTitle, IonLabel, IonHeader, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        name: {
            default: null
        }
    },
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonCol,
        IonGrid,
        IonIcon,
        IonRow,
        IonImg,
        IonTitle,
        IonLabel,
        IonHeader,
        IonToolbar,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonInput,
    },
    data() {
        return {
            ewallets: [
                { name: 'TNG', img: 'img/logos/TNG.png' },
                { name: 'GrabPay', img: 'img/logos/GrabPay.png' },
                { name: 'Boost', img: 'img/logos/Boost.png' },
                { name: 'Shopee', img: 'img/logos/Shopee.png' },
                { name: 'LazPay', img: 'img/logos/LazPay.png' },
                { name: 'SamPay', img: 'img/logos/SamPay.png' },
                { name: 'AliPay', img: 'img/logos/AliPay.webp' },
                { name: 'RazerPay', img: 'img/logos/RazerPay.png' },
                { name: 'BigPay', img: 'img/logos/BigPay.png' },
                { name: 'FavePay', img: 'img/logos/FavePay.png' },
            ],
            banks: [
                { name: 'CIMB', img: 'img/logos/CIMB.png' },
                { name: 'MayBank', img: 'img/logos/MayBank.png' },
                { name: 'PublicBank', img: 'img/logos/PublicBank.png' },
                { name: 'RHBNow', img: 'img/logos/RHBNow.png' },
                { name: 'HongLeong', img: 'img/logos/HongLeong.png' },
                { name: 'UOB Bank', img: 'img/logos/UOB Bank.png' },
                { name: 'CitiBank', img: 'img/logos/CitiBank.png' },
                { name: 'HSBC Bank', img: 'img/logos/HSBC Bank.png' },
                { name: 'OCBC Bank', img: 'img/logos/OCBC Bank.png' },
            ],
            isLoading: false,
        };
    }
});

</script>
  
<style scoped>
.card-center {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 800px;
}

img {
    width: 13.5em;
    height: 13.5em;
}
</style>

  
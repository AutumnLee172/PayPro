<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/tabs/wallet" :icon="caretBack"></ion-back-button>
                    </ion-buttons>
                    <ion-title class="mx-2">Adding new wallet</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="container">
                <ion-title class="mt-4">E-wallets</ion-title>
                <hr class="mx-4 my-1" style="background:white" />
                <ion-grid class="mx-2">
                    <ion-row>
                        <ion-col v-for="(ewallet, index) in ewallets" :key="index" size="3">
                            <!-- <router-link :to="{ name: 'wallet.new', params: { name: ewallet.name } }"> -->
                            <!-- <ion-button class="btnlogo" :href="'wallet/new/' + ewallet.name"> -->
                            <ion-button class="btnlogo"
                                :routerLink="{ name: 'wallet.new', params: { name: ewallet.name } }">
                                <ion-row class="ion-justify-content-center">
                                    <ion-col class="ion-text-center">
                                        <ion-img class="img mx-1" :src="'img/logos/' + ewallet.name + '.png'"></ion-img>
                                        <!-- <ion-img class="img mx-1" :src="ewallet.img"></ion-img> -->
                                        <ion-label class="logolabel">{{ ewallet.name }}</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-button>
                            <!-- </router-link> -->
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <div class="container">
                <ion-title class="mt-4">Banks</ion-title>
                <hr class="mx-4 my-1" style="background:white" />
                <ion-grid class="mx-2">
                    <ion-row>
                        <ion-col v-for="(bank, index) in banks" :key="index" size="3">
                            <ion-button class="btnlogo" :routerLink="{ name: 'wallet.new', params: { name: bank.name } }">
                                <ion-row class="ion-justify-content-center">
                                    <ion-col class="ion-text-center">
                                        <ion-img class="img mx-1" :src="'img/logos/' + bank.name + '.png'"></ion-img>
                                        <!-- <ion-img class="img mx-1" :src="bank.img"></ion-img> -->
                                        <ion-label class="logolabel">{{ bank.name }}</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg, IonTitle, IonLabel, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { caretBack } from 'ionicons/icons';


export default defineComponent({
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
        IonButtons,
        IonBackButton,
    },
    setup() {
        return { caretBack };
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
        };
    }
});

</script>
  
<style scoped>
.ion-icon {
    --color: white;
}

.img {
    width: 3.0em;
    height: 3.0em;
}

.btnlogo {
    width: 4.0em;
    height: 4.0em;
    --background: clear;
}

.logolabel {
    color: #afadad;
    font-size: 8.5px;
}
</style>
  
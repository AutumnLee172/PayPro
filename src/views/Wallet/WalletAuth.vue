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
                        <form @submit.prevent="submitForm">
                            <ion-row class="ion-justify-content-center ">
                                <ion-card-header class="">
                                    <img alt="logo" :src="'img/logos/' + name + '.png'" />
                                    <div class="ion-text-center">
                                        <ion-card-title class="font-weight-bolder px-2 mt-2 title" style="color:white;">{{
                                            name
                                        }}</ion-card-title>

                                        <ion-card-subtitle class="px-2">{{ name }}</ion-card-subtitle>
                                    </div>
                                </ion-card-header>
                            </ion-row>
                            <ion-card-content>
                                <ion-row class="my-1">
                                    <ion-col>
                                        <ion-input class="form-control textfield" placeholder="Username"
                                            style="color: white;" required></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row class="my-1">
                                    <ion-col>
                                        <ion-input class="form-control textfield" placeholder="Password"
                                            style="color: white;" type="password" required></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col class="ion-text-center">
                                        <ion-button class="w-100 primary-btn mt-3" disabled v-if="isloading">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </ion-button>
                                        <ion-button class="w-100 primary-btn mt-3" type="submit" v-if="!isloading">Submit</ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-card-content>
                            <div class="mx-4 my-3 text-justify">
                                <span>Disclaimer: This page is a simulation for external wallets or banking service
                                    provider. It
                                    does not involve actual authorization from the external parties. Your username and
                                    password
                                    will not be stored as well.</span>
                            </div>
                        </form>
                    </ion-card>
                </div>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg, IonTitle, IonLabel, IonHeader, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, alertController } from '@ionic/vue';
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive } from 'vue';

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
        alertController,
    },
    data() {
        return {
            isloading: false,
            apiUrl: inject<string>('API_URL'),
            form: reactive({
                walletname: this.name,
                userid: localStorage.getItem('userid'),
            }),
            router: useRouter(),
        };
    },
    methods: {
        async submitForm() {
            this.isloading = true;
            try {
                const response = await axios.post(`${this.apiUrl}/api/wallet/new`, this.form);
                if (response.data.created == true) {
                    this.isloading = false;
                    const alert = await alertController.create({
                        header: 'Success',
                        message: 'A new wallet was linked to your PayPro account',
                        buttons: ['OK'],
                    });
                    await alert.present();
                    this.router.push('/tabs/wallet');
                } else if (response.data.created == false) {
                    const alert = await alertController.create({
                        header: 'Invalid Credential',
                        message: 'Please check your email and password again',
                        buttons: ['OK'],
                    });
                    await alert.present();
                    this.isloading = false;
                }
            } catch (error) {
                console.log(error);
                const alert = await alertController.create({
                    header: 'Warning',
                    message: "Unexpected System Error",
                    buttons: ['OK'],
                });
                await alert.present();
                this.isloading = false;
            }
        }
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

  
<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/tabs/profile" :icon="caretBack"></ion-back-button>
                    </ion-buttons>
                    <ion-title class="mx-2">Updating Preferred Wallet</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-grid class="card-center">
                <!-- <ion-header>
                <ion-toolbar>
                    <ion-title class="mx-2">Updating Username</ion-title>
                </ion-toolbar>
            </ion-header> -->
                <div class="container">
                    <ion-card>
                        <form @submit.prevent="submitForm">
                            <ion-row class="ion-justify-content-center ">
                                <ion-card-header class="">
                                    <ion-title class="mx-2">Updating Preferred Wallet</ion-title>
                                </ion-card-header>
                            </ion-row>
                            <ion-card-content>
                                <ion-row class="my-1">
                                    <ion-col>
                                        <ion-select fill="outline" aria-label="transfer" interface="action-sheet"
                                            label="Transfer from" label-placement="floating" v-model="form.walletid"
                                            required>
                                            <ion-select-option :value="wallet.id" v-for="(wallet, index) in wallets"
                                                :key="index"> {{
                                                    wallet.wallet_type }} <span class="small-text"> (bal: RM {{ wallet.balance
    }})
                                                </span></ion-select-option>
                                        </ion-select>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col class="ion-text-center">
                                        <ion-button class="w-100 primary-btn mt-3" disabled v-if="isloading">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </ion-button>
                                        <ion-button class="w-100 primary-btn mt-3" type="submit"
                                            v-if="!isloading">Submit</ion-button>
                                    </ion-col>
                                </ion-row>
                            </ion-card-content>
                            <div class="mx-4 my-3 text-justify">

                            </div>
                        </form>
                    </ion-card>
                </div>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg, IonTitle, IonLabel, IonHeader, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, alertController, IonBackButton, IonButtons, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import { caretBack } from 'ionicons/icons';
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
        IonBackButton,
        IonButtons,
        IonSelect,
        IonSelectOption,
    },
    setup() {
        return { caretBack };
    },
    data() {
        return {
            isloading: false,
            apiUrl: inject<string>('API_URL'),
            form: reactive({
                email: localStorage.getItem('email'),
                userid: localStorage.getItem('userid'),
                walletid: '',
            }),
            wallets: [{ id: '', wallet_type: '', balance: 0 }],
            router: useRouter(),
        };
    },
    
  created() {
    this.getwallets();

  },
    methods: {
        async submitForm() {
            this.isloading = true;
            try {
                const response = await axios.post(`${this.apiUrl}/api/biometric/set`, this.form);
                if (response.data.updated == true) {
                    this.isloading = false;
                    const alert = await alertController.create({
                        header: 'Success',
                        message: 'You have successfully updated your preferred wallet',
                        buttons: ['OK'],
                    });
                    await alert.present();
                    this.router.push('/tabs/profile');
                } else if (response.data.updated == false) {
                    const alert = await alertController.create({
                        header: 'Error',
                        message: 'Unable to update preferred wallet',
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
        },
        async getwallets() {
            try {
                const response = await axios.post(`${this.apiUrl}/api/wallet/get`, this.form);
                if (response.data.status == true) {
                    this.isloading = false;
                    this.wallets = response.data.data;
                } else if (response.data.created == false) {
                    console.log("error fetching data");
                    this.isloading = false;
                }
            } catch (error) {
                console.log(error);
                this.isloading = false;
            }
        },


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
    margin-top: -50px;
}
</style>

  
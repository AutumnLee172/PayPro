<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New Transaction</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-segment value="internal" v-model="selectedSegment">
        <ion-segment-button value="internal">
          <ion-label>Internal</ion-label>
        </ion-segment-button>
        <ion-segment-button value="external">
          <ion-label>External</ion-label>
        </ion-segment-button>
      </ion-segment>
      <div v-if="selectedSegment === 'internal'">
        <div class="container">
          <LargeCard class="ion-justify-content-center mt-5" Title="Internal Transaction">

            <form @submit.prevent="submitInternalForm">
              <ion-row class="mb-2">
                <ion-col>
                  <ion-select fill="outline" aria-label="transfer" interface="action-sheet" label="Transfer from"
                    label-placement="floating" v-model="form.walletid" required>
                    <ion-select-option :value="wallet.id" v-for="(wallet, index) in wallets" :key="index"> {{
                      wallet.wallet_type }} <span class="small-text"> (bal: RM {{ wallet.balance }})
                      </span></ion-select-option>
                  </ion-select>
                </ion-col>
              </ion-row>

              <ion-row class="my-2">
                <ion-col>
                  <ion-select fill="outline" aria-label="transfer" interface="action-sheet" label="Transfer to"
                    label-placement="floating" v-model="form.to_account" required>
                    <ion-select-option :value="wallet.id" v-for="(wallet, index) in wallets" :key="index"> {{
                      wallet.wallet_type }} (bal: RM {{ wallet.balance }})</ion-select-option>
                  </ion-select>
                </ion-col>
              </ion-row>

              <ion-row class="my-2">
                <ion-col>
                  <ion-input class="form-control textfield" type="number" placeholder="Transfer amount"
                    style="color: white;" v-model="form.amount" required></ion-input>
                </ion-col>
              </ion-row>

              <ion-row class="my-2">
                <ion-col>
                  <ion-input class="form-control textfield" placeholder="Reference (Optional)" v-model="form.reference"
                    style="color: white;"></ion-input>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col class="ion-text-center">
                  <!-- <ion-button class="w-100 primary-btn mt-3" disabled v-if="isloading">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </ion-button> -->
                  <ion-button class="w-100 primary-btn mt-3" type="submit">Submit</ion-button>
                  <div class="mx-2 my-3 text-justify">
                    <span>Internal transaction allows you to transfer money between the wallets that were linked with this
                      PayPro Account.</span>
                  </div>
                </ion-col>
              </ion-row>
            </form>
          </LargeCard>
        </div>
      </div>

      <!-- external transaction -->
      <div v-if="selectedSegment === 'external'">
        <div class="container">
          <LargeCard class="ion-justify-content-center mt-5" Title="External Transaction">
            <form @submit.prevent="submitExternalForm">
            <ion-row class="mb-2">
              <ion-col>
                <ion-select fill="outline" aria-label="transfer" interface="action-sheet" label="Transfer from"
                  label-placement="floating" v-model="externalform.walletid" required>
                  <ion-select-option :value="wallet.id" v-for="(wallet, index) in wallets" :key="index"> {{
                    wallet.wallet_type }}</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>

            <ion-row class="my-2">
              <ion-col>
                <ion-select fill="outline" aria-label="transfer" interface="action-sheet" label="Receiver Account Type"
                  label-placement="floating" v-model="externalform.to_account_type" required>
                  <ion-select-option value="Linked PayPro Wallet">Linked PayPro Wallet</ion-select-option>
                  <ion-select-option value="E-wallets">E-wallets</ion-select-option>
                  <ion-select-option value="Bank">Bank</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>

            <ion-row class="my-2">
              <ion-col>
                <ion-input class="form-control textfield" placeholder="Account ID / Account Number"
                  style="color: white;" v-model="externalform.to_account" required></ion-input>
              </ion-col>
            </ion-row>

            <ion-row class="my-2">
              <ion-col>
                <ion-input class="form-control textfield" placeholder="Transfer amount" v-model="externalform.amount" style="color: white;" required></ion-input>
              </ion-col>
            </ion-row>

            <ion-row class="my-2">
              <ion-col>
                <ion-input class="form-control textfield" placeholder="Reference (Optional)" v-model="externalform.reference"
                  style="color: white;"></ion-input>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col class="ion-text-center">
                <!-- <ion-button class="w-100 primary-btn mt-3" disabled v-if="isloading">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </ion-button> -->
                <ion-button class="w-100 primary-btn mt-3" type="submit">Submit</ion-button>
                <div class="mx-2 my-3 text-justify">
                  <span>External transaction allows you to transfer money to other people. </span>
                </div>
              </ion-col>
            </ion-row>
            </form>
          </LargeCard>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, IonRow, IonCol, IonButton, IonInput, IonSelect, IonSelectOption, alertController } from '@ionic/vue';
import { defineComponent, inject, reactive } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import LargeCard from '@/components/LargeCard.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, ExploreContainer, LargeCard, IonRow, IonCol, IonButton, IonInput, IonSelect, IonSelectOption, alertController },
  data() {
    return {
      selectedSegment: "internal",
      form: reactive({
        userid: localStorage.getItem('userid'),
        walletid: null,
        amount: null,
        to_account: null,
        reference: "",
      }),
      externalform: reactive({
        userid: localStorage.getItem('userid'),
        walletid: null,
        amount: null,
        to_account: null,
        to_account_type: null,
        reference: "",
      }),
      apiUrl: inject<string>('API_URL'),
      isloading: false,
      wallets: [{ id: '', wallet_type: '', balance: 0 }],
      router: useRouter(),

    };
  },
  created() {
    this.getwallets();

  },
  methods: {
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
    async submitInternalForm() {
      this.isloading = true;
      try {
        const response = await axios.post(`${this.apiUrl}/api/trx/internal/new`, this.form);
        if (response.data.created == true) {
          this.isloading = false;
          const alert = await alertController.create({
            header: 'Success',
            message: 'You have successfully transfer the money',
            buttons: [{
              text: 'OK',
              role: 'confirm',
              handler: () => {
                window.location.reload();
              },
            }],
          });
          await alert.present();

        } else if (response.data.created == false) {
          const alert = await alertController.create({
            header: 'Error',
            message: 'Something wrong happened',
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
    async submitExternalForm() {
      this.isloading = true;
      try {
        const response = await axios.post(`${this.apiUrl}/api/trx/external/new`, this.externalform);
        if (response.data.created == true) {
          this.isloading = false;
          const alert = await alertController.create({
            header: 'Success',
            message: 'You have successfully transfer the money',
            buttons: [{
              text: 'OK',
              role: 'confirm',
              handler: () => {
                window.location.reload();
              },
            }],
          });
          await alert.present();

        } else if (response.data.created == false) {
          const alert = await alertController.create({
            header: 'Error',
            message: response.data.error,
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
.selector {
  margin-top: -20px;
  width: auto;
  height: auto;
}

.form-control {
  border: 0.05px solid #797979c0;
  border-radius: 0.3em;
}

.card-center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}
</style>
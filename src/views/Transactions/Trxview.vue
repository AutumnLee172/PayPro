<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ name }} Transactions</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Transactions </ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container mt-3">
        <ion-list>
          <div v-for="(transaction, index) in transactions" :key="index">
            <ion-item>
            <ion-label>
              <div class="row main-text">
                <div class="col">                  
                  <ion-label v-if="transaction.transaction_type == 'Internal' && transaction.to_account == id">Receive from {{ transaction.to_wallet_type }}</ion-label>
                  <ion-label v-else-if="transaction.transaction_type == 'External' && transaction.to_account == id && transaction.to_wallet_type == 'Linked PayPro Wallet'" >Receive from {{ transaction.to_wallet_type }}</ion-label>
                  <ion-label v-else>Transfer to {{ transaction.to_wallet_type }}</ion-label>
                </div>
                <div class="text-end col">
                  <ion-label>RM {{ transaction.amount }}</ion-label>
                </div>
              </div>
              <div class="row my-1">
                <div class="col">
                  <p> {{ transaction.transaction_type }} Transaction </p>
                </div>
                <div class="text-end col">
                  <p>{{ transaction.date }}</p>
                </div>
              </div>
            </ion-label>
          </ion-item>
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol } from '@ionic/vue';
import { defineComponent, inject, reactive } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import axios from 'axios';

export default defineComponent({
  props: {
    name: {
      default: null
    },
    id: {
      default: null
    }
  },
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
  },
  data() {
    return {
      isloading: false,
      apiUrl: inject<string>('API_URL'),
      form: reactive({
        walletid: this.id,
      }),
      transactions: [{ wallet_type: '', amount: 0, to_wallet_type: '', date: '', transaction_type: '', to_account: 0 }],
    };
  },  
  created() {
    this.gettrx();

  },
  methods: {
    async gettrx() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/trx/get`, this.form);
        if (response.data.status == true) {
          this.isloading = false;
          this.transactions = response.data.data;
        } else if (response.data.created == false) {
          console.log("error fetching data");
          this.isloading = false;
        }
      } catch (error) {
        console.log(error);
        this.isloading = false;
      }
    }
  }
});

</script>
  
<style scoped>
p{
  color: rgba(230, 229, 229, 0.411);
  font-size: 85%;
}

.main-text{
  font-size: 0.98em;
}
</style>
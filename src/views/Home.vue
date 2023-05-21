<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <HomeCard Subtitle="Total Wallet Value: " Title="RM7000000">
        <div class="px-2 subtitle">among 5 wallets</div>
      </HomeCard>
      <div class="mx-2 row">
        <div class="col">
          <ion-button fill="outline">
            <ion-row class="ion-justify-content-center">
              <ion-col class="ion-text-center">
                <ion-icon :icon="star"></ion-icon>
                <br/>
                <ion-label>Transfer</ion-label>
              </ion-col>
            </ion-row>
          </ion-button>
        </div>
        <div class="col">
          <ion-button> Test </ion-button>
        </div>
        <div class="col">
          <ion-button> Test </ion-button>
        </div>
        <div class="col">
          <ion-button> Test </ion-button>
        </div>
      </div>

      <div class="button-row">
        <div v-for="(button, index) in buttons" :key="index" class="button-wrapper">
          <ion-button color="primary" expand="full">
            <ion-icon :icon="button.icon"></ion-icon>
            <span>{{ button.label }}</span>
          </ion-button>
        </div>
      </div>
      <LargeCard Title="Stats">
        <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
      </LargeCard>
      <LargeCard Title="Recent Transactions">
        <ion-list>
          <div v-for="(transaction, index) in transactions" :key="index">
            <ion-item>
              <ion-label>
                <div class="row main-text">
                  <div class="col-8">
                    <ion-label v-if="transaction.transaction_type == 'Internal' && transaction.to_account == id">Receive
                      from {{ transaction.wallet_type }}</ion-label>
                    <ion-label
                      v-else-if="transaction.transaction_type == 'External' && transaction.to_account == id && transaction.to_wallet_type == 'Linked PayPro Wallet'">Receive
                      from {{ transaction.wallet_type }}</ion-label>
                    <ion-label v-else>Transfer to {{ transaction.to_wallet_type }}</ion-label>
                  </div>
                  <div class="text-end col">
                    <ion-label style="color:#7168eeea"
                      v-if="transaction.transaction_type == 'Internal' && transaction.to_account == id">+ RM {{
                        transaction.amount }}</ion-label>
                    <ion-label style="color:#7168eeea"
                      v-else-if="transaction.transaction_type == 'External' && transaction.to_account == id && transaction.to_wallet_type == 'Linked PayPro Wallet'">+
                      RM {{ transaction.amount }}</ion-label>
                    <ion-label v-else> - RM {{ transaction.amount }}</ion-label>
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
      </LargeCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonList, IonIcon, IonRow, IonCol } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import HomeCard from '@/components/HomeCard.vue';
import LargeCard from '@/components/LargeCard.vue';
import { defineComponent, inject, reactive } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import { star, addOutline, walletOutline, settingsOutline } from 'ionicons/icons';


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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    ExploreContainer,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    HomeCard,
    LargeCard,
    IonButton,
    IonList,
    IonIcon,
    IonRow, 
    IonCol,
    apexchart: VueApexCharts,
  },
  setup() {
    return { star, addOutline, walletOutline, settingsOutline };
  },
  created() {

  },
  data() {
    return {
      apiUrl: inject<string>('API_URL'),
      form: reactive({
        userid: localStorage.getItem('userid'),
      }),
      transactions: [{ wallet_type: '', amount: 0, to_wallet_type: '', date: '', transaction_type: '', to_account: 0 }],
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false, // Hide the toolbar
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996],
        },
        stroke: {
          curve: 'smooth',
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60],
        },
      ],
      buttons: [
        { icon: addOutline, label: 'Add' },
        { icon: walletOutline, label: 'Wallet' },
        { icon: settingsOutline, label: 'Settings' },
        { icon: addOutline, label: 'Add' },
        { icon: walletOutline, label: 'Wallet' },
        { icon: settingsOutline, label: 'Settings' },
        // Add more buttons as needed
      ],
    };
  },
  methods: {

  }
});


</script>

<style scoped>
.subtitle {
  color: #948492;
}

ion-button{
  max-width: 60px;
  min-height: 60px;
}

.button-row {
  display: flex;
  overflow-x: auto;
  padding: 8px;
}

.button-wrapper {
  margin-right: 8px;
}
</style>

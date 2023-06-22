<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <HomeCard Subtitle="Total Wallet Value: " :Title="`RM ${walletvalue.sum}`">
        <div class="px-2 subtitle">among {{ walletvalue.walletnumber }} wallets</div>
      </HomeCard>
      <!-- <div class="mx-2 row">
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
      </div> -->

      <div class="button-row mx-1">
        <div v-for="(button, index) in buttons" :key="index" class="button-wrapper">
          <ion-button color="primary">
            <!-- <ion-icon aria-hidden="true" :icon="star"/> -->
            <ion-icon :icon="button.icon"></ion-icon>
            <span>{{ button.label }}</span>
          </ion-button>
        </div>
      </div>
      <LargeCard Title="Transaction Amount" Subtitle="External Transaction">
        <apexchart :options="chartOptions" :series="series"></apexchart>
      </LargeCard>
      <LargeCard Title="Recent Activities">
        <ion-list>
          <div v-for="(notification, index) in notifications" :key="index">
            <ion-item>
              <ion-label>
                <div class="row">
                  <div class="col">
                    <ion-label class="text-wrap main-text ">{{ notification.description }}</ion-label>
                  </div>
                </div>
                <div class="row my-1">
                  <div class="col main-text">
                    <p>{{ notification.date }}</p>
                  </div>
                </div>
              </ion-label>
            </ion-item>
          </div>
        </ion-list>
      </LargeCard>
      <ion-alert :is-open="isOpen" header="Biometric Registration" sub-header="Important!" message="Please confirm if you have registered for biometric payment."
        :buttons="alertButtons" @didDismiss="setOpen(false)"></ion-alert>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonList, IonIcon, IonRow, IonCol, IonAlert } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import HomeCard from '@/components/HomeCard.vue';
import LargeCard from '@/components/LargeCard.vue';
import { defineComponent, inject, reactive } from 'vue';
import VueApexCharts from "vue3-apexcharts";
import { star, addOutline, walletOutline, settingsOutline } from 'ionicons/icons';
import axios from 'axios';
import { ref } from 'vue';


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
    IonAlert,
    apexchart: VueApexCharts,
  },
  setup() {
    const apiUrl = inject<string>('API_URL');
    const form = reactive({
      userid: localStorage.getItem('userid'),
    });

    const alertButtons = [
      {
        text: 'Confirm',
        handler: () => {
          confirmAction();
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          cancelAction();
        }
      }
    ];

    const confirmAction = () => {
      axios.post(`${apiUrl}/api/biometric/approve`, form);
    };

    const cancelAction = () => {
      axios.post(`${apiUrl}/api/biometric/decline`, form);
    };

    const isOpen = ref(false);

    const setOpen = (state: boolean) => {
      isOpen.value = state;
    };


    return { star, addOutline, walletOutline, settingsOutline, alertButtons, setOpen, isOpen };
  },
  created() {
    this.getWalletValue();
    this.getLatestActivities();
    this.getChartData();
    setInterval(() => {
      this.checkforRegistrationStatus();
    }, 5000);
  },
  data() {
    return {
      apiUrl: inject<string>('API_URL'),
      form: reactive({
        userid: localStorage.getItem('userid'),
      }),
      isloading: false,
      // isOpen: false,
      transactions: [{ wallet_type: '', amount: 0, to_wallet_type: '', date: '', transaction_type: '', to_account: 0 }],
      walletvalue: [{ sum: 0, walletnumber: 0 }],
      notifications: [{ description: '', date: '' }],
      series: [{
        data: [

        ]
      }],
      chartOptions: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            autoScaleYaxis: true
          },
          toolbar: {
            show: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: 'white',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            datetimeUTC: false,
          },
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => "MYR",
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.0,
            stops: [0, 100]
          }
        },
        yaxis: {
          tickAmount: 4,
          labels: {
            style: {
              colors: 'white',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
          title: {
            text: "MYR",
            rotate: -90,
          },
        },
      },

      buttons: [
        { icon: star, label: 'Add' },
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
    async getWalletValue() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/home/getWalletsValue`, this.form);
        if (response.data.status == true) {
          this.isloading = false;
          this.walletvalue = response.data.data;
        } else if (response.data.status == false) {
          console.log("error fetching data");
          this.isloading = false;
        }
      } catch (error) {
        console.log(error);
        this.isloading = false;
      }
    },
    async getLatestActivities() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/home/getLatestActivities`, this.form);
        if (response.data.status == true) {
          this.isloading = false;
          this.notifications = response.data.data;
        } else if (response.data.created == false) {
          console.log("error fetching data");
          this.isloading = false;
        }
      } catch (error) {
        console.log(error);
        this.isloading = false;
      }
    },
    async getChartData() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/home/getChartData`, this.form);
        if (response.data.status == true) {
          this.isloading = false;
          const convertedData = response.data.data.map((item) => {
            const date = item.days;
            const value = item.sum;
            return [date, value];
          });
          this.series = [{
            data: convertedData
          }];
        } else if (response.data.created == false) {
          console.log("error fetching data");
          this.isloading = false;
        }
      } catch (error) {
        console.log(error);
        this.isloading = false;
      }
    },
    async checkforRegistrationStatus() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/biometric/check`, this.form);
        if (response.data.status == true && response.data.requireConfrimation == true) {
          this.setOpen(true);
        } else if (response.data.status == false || response.data.requireConfrimation == false) {
          this.setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async approve() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/biometric/check`, this.form);
        if (response.data.status == true && response.data.requireConfrimation == true) {
          console.log(response.data.status);
          this.setOpen(true);
        } else if (response.data.status == false || response.data.requireConfrimation == false) {
          this.setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
});


</script>

<style scoped>
.subtitle {
  color: #948492;
}

ion-button {
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

.main-text {
  color: #aaa2a9;
}
</style>

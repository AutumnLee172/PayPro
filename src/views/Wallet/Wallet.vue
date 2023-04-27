<template>
  <ion-page>

    <ion-content :fullscreen="true">

      <ExploreContainer name="My Wallets" content="You have not linked a wallet yet."  v-if="!wallets.length"/>
      <div v-for="(wallet, index) in wallets" :key="index" v-else>
        
        <WalletCard :WalletName="wallet.wallet_type" :Balance="wallet.balance"/>
      </div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="addOutline" color="light"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button href="/wallettypes">
            <ion-icon :icon="walletOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/vue';
import { addOutline, walletOutline } from 'ionicons/icons';
import WalletCard from '@/components/WalletCard.vue';
import { defineComponent, inject, reactive } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  props: {
    name: {
      default: null
    }
  },
  components: {
    IonPage,
    IonContent,
    IonToolbar,
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    WalletCard,
    ExploreContainer,
  },
  setup() {
    return { addOutline, walletOutline };
  },
  created() {
    this.getwallets();

  },
  data() {
    return {
      isloading: false,
      apiUrl: inject<string>('API_URL'),
      form: reactive({
        userid: localStorage.getItem('userid'),
      }),
      router: useRouter(),
      wallets: [{wallet_type: '', balance: 0}],
    };
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
    }
  }
});

</script>

<style scoped>
.ion-icon {
  --color: white;
}
</style>

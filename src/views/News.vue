<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container mt-3">
        <ion-list>
          <div v-for="(notification, index) in notifications" :key="index">
            <ion-item>
              <ion-label>
                <div class="row">
                  <div class="col">
                    <ion-label class="text-wrap main-text">Transfer to {{ notification.description }}</ion-label>
                  </div>
                </div>
                <div class="row my-1">
                  <div class="col">
                    <p>{{ notification.date }}</p>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton } from '@ionic/vue';
import { defineComponent, inject, reactive } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import axios from 'axios';

export default defineComponent({
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
    IonButton,
  },
  data() {
    return {
      isloading: false,
      apiUrl: inject<string>('API_URL'),
      form: reactive({
        userid: localStorage.getItem('userid'),
      }),
      notifications: [{ description: '', date: '' }],
    };
  },
  created() {
    this.getnews();
  },
  methods: {
    async getnews() {
      try {
        const response = await axios.post(`${this.apiUrl}/api/notification/get`, this.form);
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
    }
  }
});

</script>

<style scoped>
p {
  color: rgba(230, 229, 229, 0.411);
  font-size: 80%;
}

.main-text {
  font-size: 0.9em;
}
</style>
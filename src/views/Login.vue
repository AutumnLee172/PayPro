<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid class="card-center">
        <ion-col class="px-2">
          <LargeCard Title="Sign In" Subtitle="Enter your email and password" class="ion-justify-content-start">

            <ion-row class="my-1">
            <ion-col>
              <ion-input class="form-control textfield" placeholder="Email" style="color: white;"></ion-input>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="my-1">
              <ion-input class="form-control textfield" type="password" placeholder="Password" style="color: white;"></ion-input>
            </ion-col>
          </ion-row>

            <ion-row>
              <ion-col class="ion-text-center">
                <ion-button class="w-100 primary-btn mt-3" @click="login()">Sign In</ion-button>
              </ion-col>
            </ion-row>

            <ion-row class="mt-1">
              <ion-col class="ion-text-center">
               <ion-label>Not a member? </ion-label> <a href="/tabs" class="hyperlink"> Sign up now </a>
              </ion-col>
            </ion-row>
          </LargeCard>
        </ion-col>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonCol, IonButton, IonGrid, IonRow, IonInput, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';
import LargeCard from '@/components/LargeCard.vue';

const router = useRouter();

function login() {
  router.push("/tabs");
}
</script>

<style scoped>
.card-center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}


</style>

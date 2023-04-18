<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid class="card-center">
        <ion-col class="px-2">
          <LargeCard Title="Sign In" Subtitle="Enter your email and password to sign in" class="ion-justify-content-start">
            <form @submit.prevent="submitForm">
            <ion-row class="my-1">
            <ion-col>
              <ion-input class="form-control textfield" placeholder="Email" style="color: white;" v-model="form.email"></ion-input>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="my-1">
              <ion-input class="form-control textfield" type="password" placeholder="Password" style="color: white;" v-model="form.password"></ion-input>
            </ion-col>
          </ion-row>

            <ion-row>
              <ion-col class="ion-text-center">
                <ion-button class="w-100 primary-btn mt-3" disabled v-if="isloading">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </ion-button>
                <ion-button class="w-100 primary-btn mt-3" type="submit"  v-if="!isloading">Sign In</ion-button>
              </ion-col>
            </ion-row>

            <ion-row class="mt-1">
              <ion-col class="ion-text-center">
               <ion-label>Not a member? </ion-label> <a href="/register" class="hyperlink"> Sign up now </a>
              </ion-col>
            </ion-row>
          </form>
          </LargeCard>
        </ion-col>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonCol, IonButton, IonGrid, IonRow, IonInput, IonLabel, alertController} from '@ionic/vue';
import { useRouter } from 'vue-router';
import LargeCard from '@/components/LargeCard.vue';
import axios from 'axios';
import { reactive } from 'vue';
import { inject, provide, ref } from 'vue'

const apiUrl = inject<string>('API_URL')
const router = useRouter();
const form = reactive({
  email: '',
  password: '',
});

const isloading = ref(false);

async function submitForm() {
  isloading.value = true;
  try {   
    const response = await axios.post(`${apiUrl}/api/user/login`, form);
    if (response.data.authorized == true) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userid', response.data.userid);
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('usertype', response.data.usertype);
      localStorage.setItem('phonenumber', response.data.phonenumber);
      isloading.value = false;
      router.push('/tabs');
    } else if(response.data.error == 'Unauthorized') {
      const alert = await alertController.create({
          header: 'Invalid Credential',
          message: 'Please check your email and password again',
          buttons: ['OK'],
        });
        await alert.present();
        isloading.value = false;
    }
  } catch (error) {
    const alert = await alertController.create({
          header: 'Warning',
          message: "Unexpected System Error",
          buttons: ['OK'],
        });
        await alert.present();
        isloading.value = false;
  }
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

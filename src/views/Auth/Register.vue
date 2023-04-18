<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid class="card-center">
        <ion-col class="px-2">
          <LargeCard Title="Register" Subtitle="Welcome to PayPro" class="ion-justify-content-start">

            <form @submit.prevent="submitForm">
              <ion-row class="my-1">
                <ion-col>
                  <ion-input id="validationTextarea" class="form-control textfield" placeholder="Email"
                    style="color: white;" v-model="form.email" />
                </ion-col>

              </ion-row>

              <ion-row class="my-1">
                <ion-col>
                  <ion-input class="form-control textfield" placeholder="Username" style="color: white;"
                    v-model="form.name" required></ion-input>
                </ion-col>
              </ion-row>

              <ion-row class="my-1">
                <ion-col>
                  <ion-input class="form-control textfield" placeholder="Phone Number" style="color: white;"
                    v-model="form.phone_number" required></ion-input>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col class="my-1">
                  <ion-input class="form-control textfield" type="password" placeholder="Password" style="color: white;"
                    v-model="form.password" required></ion-input>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col class="my-1">
                  <ion-input class="form-control textfield" type="password" placeholder="Confirm Password"
                    v-model="form.confirmPassword" style="color: white;" required></ion-input>
                </ion-col>
              </ion-row>

              <ion-row class="px-2" v-show=form.hasError>
                <ion-icon aria-hidden="true" :icon="alertCircleOutline" size="small" class="warning"></ion-icon><ion-label
                  class="warning"> &nbsp; {{ errorText }} </ion-label>
              </ion-row>

              <!-- <hr class="light"> -->

              <ion-row>
                <ion-col class="ion-text-center">
                  <ion-button class="w-100 primary-btn mt-3" disabled  v-if="isloading">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </ion-button>
                  <ion-button class="w-100 primary-btn mt-3" type="submit" v-if="!isloading"> Sign Up</ion-button>
                </ion-col>
              </ion-row>

              <ion-row class="mt-1">
                <ion-col class="ion-text-center">
                  <ion-label>Already have an account? </ion-label> <a href="/login" class="hyperlink"> Sign in </a>
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
import { IonPage, IonContent, IonCol, IonButton, IonGrid, IonRow, IonInput, IonLabel, alertController, IonIcon } from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive, ref, inject } from 'vue';
import LargeCard from '@/components/LargeCard.vue';
const apiUrl = inject<string>('API_URL');

const router = useRouter();
let errorText = "";
const isloading = ref(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = reactive({
  name: '',
  email: '',
  phone_number: '',
  confirmPassword: '',
  password: '',
  hasError: false,
});

async function submitForm() {
  isloading.value = true;
  if (form.confirmPassword !== form.password) {
    form.hasError = false;
    form.hasError = true;
    errorText = "Both passwords do not match";
    isloading.value = false;
    return;
  }
  else if (!emailRegex.test(form.email)) {
    form.hasError = false;
    form.hasError = true;
    errorText = "Invalid Email";
    isloading.value = false;
    return;
  }

  else if (form.confirmPassword == form.password && emailRegex.test(form.email)) {
    form.hasError = false;
    try {
      const response = await axios.post(`${apiUrl}/api/user/register`, form);
      if (response.data.created == true) {
        console.log("Successfully added an account.");
        const alert = await alertController.create({
          header: 'Success',
          message: 'You have successfully created an account',
          buttons: ['OK'],
        });
        await alert.present();
        isloading.value = false;
      } else {
        console.log("An error has occured.");
        form.hasError = true;
        errorText = response.data.error;
        isloading.value = false;
      }
      console.log(response.data);
      isloading.value = false;
    } catch (error) {
      console.error(error);
      isloading.value = false;
    }
  }


}
</script>
  
<!-- <script lang="ts">

import { IonPage, IonContent, IonCol, IonButton, IonGrid, IonRow, IonInput, IonLabel, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive } from 'vue';
import LargeCard from '@/components/LargeCard.vue';
import { inject, ref } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone_number: '',
        confirmPassword: '',
        password: '',
      },
    };
  },
  components: { IonInput },
  methods: {
    validateEmail(email: any) {
      return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    },

    validate(ev: any) {
      const value = ev.target.value;

      this.$refs.input.$el.classList.remove('ion-valid');
      this.$refs.input.$el.classList.remove('ion-invalid');

      if (value === '') return;

      this.validateEmail(value)
        ? this.$refs.input.$el.classList.add('ion-valid')
        : this.$refs.input.$el.classList.add('ion-invalid');
    },

    markTouched() {
      this.$refs.input.$el.classList.add('ion-touched')
    }
  },
});
</script> -->

<style scoped>
.card-center {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}

.warning {
  color: #ff2f00;
}
</style>
  
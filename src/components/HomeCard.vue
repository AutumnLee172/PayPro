<template>
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle class="px-2">{{ Subtitle }}</ion-card-subtitle>
                <ion-card-title class="font-weight-bolder px-2 mt-2 title">{{ Title
                }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <slot></slot>
            </ion-card-content>
        </ion-card>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
defineProps({
    Title: String,
    Subtitle: String,
});
</script>

<style scoped>

.title{
    font-family: "Open Sans", sans-serif;
}

ion-card {
    --background: linear-gradient(135deg, #4A148C, #673AB7);
    --color: #F5F5F5;
  }

</style>

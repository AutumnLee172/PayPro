<template>
    <div>
        <ion-card>
            <ion-card-header>
                <ion-card-title class="font-weight-bolder px-2 mt-2 title" :style="{ color: textColor }">{{ Title
                }}</ion-card-title>
                <ion-card-subtitle class="px-2">{{ Subtitle }}</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
                <slot></slot>
            </ion-card-content>
        </ion-card>
    </div>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
defineProps({
    Title: String,
    Subtitle: String,
    textColor: {
        type: String,
        default: "white",
    },
});
</script>

<style scoped>

.title{
    font-family: "Open Sans", sans-serif;
}

</style>

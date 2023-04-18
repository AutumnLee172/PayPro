<template>
    <ion-page>

        <ion-content :fullscreen="true">
            <ExploreContainer name="Add wallet" />
            <div class="container">
                <ion-title class="mt-4">E-wallets</ion-title>
                <hr class="mx-4 my-1" style="background:white" />
                <ion-grid class="mx-2">
                    <ion-row >
                        <ion-col v-for="(item, index) in items" :key="index" size="3" >
                            <ion-button class="btnlogo ">
                                <ion-row class="ion-justify-content-center">
                                    <ion-col class="ion-text-center">
                                        <ion-img class="img mx-1" :src="item.img"></ion-img>
                                        <ion-label class="logolabel">{{ item.name }}</ion-label>
                                    </ion-col>
                                </ion-row>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonImg, IonTitle, IonLabel } from '@ionic/vue';
import { addOutline, walletOutline } from 'ionicons/icons';
import { add, close, menu, search } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components: {
        IonButton,
        IonCol,
        IonGrid,
        IonIcon,
        IonRow,
        IonImg,
        IonTitle,
        IonLabel,
    },
    data() {
        return {
            items: [
                { name: 'TNG', img: 'img/logos/tng.png' },
                { name: 'GrabPay', img: 'img/logos/grab.png' },
                { name: 'Boost', img: 'img/logos/boost.png' },
                { name: 'Shopee', img: 'img/logos/shopee.png' },
                { name: 'Add', img: 'img/logos/tng.png' },
                { name: 'Close', img: 'img/logos/tng.png' },
                { name: 'Menu', img: 'img/logos/tng.png' },
                { name: 'Search', img: 'img/logos/tng.png' },
                { name: 'Add', img: 'img/logos/tng.png' },
                { name: 'Close', img: 'img/logos/tng.png' },
                { name: 'Menu', img: 'img/logos/tng.png' },
                { name: 'Search', img: 'img/logos/tng.png' },
            ],
        };
    }
});

</script>
  
<style scoped>
.ion-icon {
    --color: white;
}

.img {
    width: 3.0em;
    height: 3.0em;
}

.btnlogo {
    width: 4.0em;
    height: 4.0em;
    --background: clear;
}

.logolabel{
    color:#afadad;
    font-size: 10px;
}
</style>
  
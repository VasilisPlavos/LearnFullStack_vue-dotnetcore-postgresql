<template>
<div class="btn-link">
    <button @click="visitRoute">
        <slot></slot>
    </button>
</div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'SolarButton',
    components: {}
})

export default class SolarButton extends Vue {
    @Prop({ required: false, type: String })
    link?: string;


    visitRoute() {
        this.$router.push(this.link);
    }
}

</script>

<style scoped>

</style>
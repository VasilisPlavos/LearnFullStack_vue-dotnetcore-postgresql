<template>
<div class="side-menu-container">
    <h1>Side menu</h1>
    <solar-button
        id="menuInventory"
        :link="'/inventory'">
        inventory
    </solar-button>
</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import SolarButton from '@/components/SolarButton.vue'

@Component({
    name: 'SideMenu',
    components: { SolarButton }
})

export default class SideMenu extends Vue { }
</script>

<style scoped lang="scss">

.side-menu-container {
    background-color: aqua;
}
    
</style>
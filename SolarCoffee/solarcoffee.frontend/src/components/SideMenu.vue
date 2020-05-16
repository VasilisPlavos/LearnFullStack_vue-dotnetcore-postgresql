<template>
<div class="side-menu-container">
    <p>test</p>
</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'SideMenu',
    components: {}
})

export default class SideMenu extends Vue { }
</script>

<style scoped lang="scss">

.side-menu-container {
    background-color: aqua;
}
    
</style>
<template>
    <router-view v-slot="{Component}">
        <KeepAlive>
            <component :is="Component"></component>
        </KeepAlive>
    </router-view>
    <TabBar></TabBar>
    <DetailPannel v-if="isOpenDetail"></DetailPannel>
</template>
<script setup>
import {toRefs} from 'vue'
import TabBar from './components/TabBar.vue'
import DetailPannel from './components/DetailPannel.vue'
import useHooks from '@/hooks/useHooks'
const {isOpenDetail} = toRefs(useHooks.state)
</script>

<style scoped lang='scss'>
</style>

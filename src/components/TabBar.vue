<template>
    <div class="tab-bar">
        <template v-for="(item,index) in menus" :key="item.path">
        <div  @click="toPath(item.path)" v-if="item.path==='/publish'" class='tab-pub'>
            <i class="iconfont icon-jia"></i>
        </div>
        <div @click="toPath(item.path)" v-else class="tab-name" :class="{active:item.path===path}">{{item.name}}</div>
        </template>
    </div>
</template>

<script setup>
import {ref,reactive,watch} from 'vue';
import routes from '@/router/routes'
import router from '@/router'
import useHooks from '@/hooks/useHooks'
const {changeRefresh} = useHooks

const menus = routes
const path = ref('/')

const toPath = (p) =>{
    if(path.value === p && p === '/'){
        changeRefresh(true)
    }
    router.push({
        path:p
    })
    path.value = p
}

watch(()=>router.currentRoute.value.path,()=>{
    path.value = router.currentRoute.value.path
})
</script>

<style lang='scss' scoped>
.tab-bar{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3rem;
    @include flexac;
    background-color: #fff;
    font-size: .9rem;
    color: rgb(149,149,149);
    z-index: 10;

    .tab-name {
        min-width: 10%;
        text-align: center;
        transition: all 0.1s linear;
        &.active{
            font-size: 1rem;
            color: rgb(51,51,51);
        }
    }

    .tab-pub{
        width: 3.125rem;
        height: 70%;
        border-radius: 20%;
        background-color: rgb(255,35,66);
        @include flexcc;

        i{
            color:#fff;
            font-size: 1.5rem;
        }
    }
}
</style>
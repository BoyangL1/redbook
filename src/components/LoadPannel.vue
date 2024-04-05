<template>
    <div class="load-pannel" ref="pannelRef">
        <div class="outer">
        <slot></slot>
            <Loading v-show="isBottomLoading"></Loading>
        </div>
    </div>
</template>

<script setup>
import {ref,reactive,onMounted} from 'vue';
import Loading from '@/components/Loading.vue'
const pannelRef = ref(null)

let isBottomLoading = ref(false)
const  emits = defineEmits(['searchMore'])

onMounted(()=>{
    pannelRef.value.style.height = window.innerHeight + 'px'
    window.addEventListener('resize',()=>{
        pannelRef.value.style.height = window.innerHeight + 'px'
    })
    //判断是否到底部
    let nowScrollHeight = 0
    pannelRef.value.addEventListener('scroll',function(){
        let scrollTop = this.scrollTop
        let clientHeight = this.clientHeight
        let scrollHeight = this.scrollHeight

        if(Math.ceil(scrollTop+clientHeight)>=scrollHeight && !isBottomLoading.value){
            if(nowScrollHeight!=scrollHeight){
                nowScrollHeight = scrollHeight
                isBottomLoading.value = true
                emits('searchMore',()=>{
                    isBottomLoading.value = false
                })
            }
        }
    })
})
</script>

<style lang='scss' scoped>
.load-pannel{
    overflow: auto;

    .outer{
        position: relative;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
}
</style>
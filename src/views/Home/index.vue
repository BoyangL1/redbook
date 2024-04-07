<template>
    <div class="home-container">
        <div class="home-swiper-head">
            <i class="iconfont icon-liebiao"></i>
            <div class="swiper-name" ref="moduleRef">
                <span v-for="(item,idx) in moduleList" @click="changeSwiper(idx)" :class="{active:idx===moduleIdx}">{{ item }}</span>
                <div class="red-line" ref="redLineRef">
                <div></div></div>
            </div>
            <i class="iconfont icon-sousuo"></i>
        </div>
        <swiper @swiper="onSwiper" @slideChange="onSlideChange" :initialSlide="moduleIdx" @progress="onProgress" class="my-swiper">
            <swiper-slide>
                <div class="slide-content">1</div>
            </swiper-slide>
            <swiper-slide>
                <Explore></Explore>
            </swiper-slide>
            <swiper-slide>
                <div class="slide-content">3</div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import {ref,reactive,onMounted, nextTick} from 'vue';
import {Swiper,SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import Explore from './Explore.vue'

const moduleList = reactive(['关注','发现','地点'])

// 初始化swiper
let mySwiper = null
const onSwiper = (swiper)=>{
    mySwiper=swiper
}
const onSlideChange = ({activeIndex}) => {
    moduleIdx.value = activeIndex;
}

//红线-选中平移
const redLineRef = ref(null)
const moduleRef = ref(null)

//计算每个关键位置时，红线的偏移量
const posList = []
const getModuleParams = () =>{
    const modules = moduleRef.value.querySelectorAll('span');
    const redLineWidth = redLineRef.value.getBoundingClientRect().width;
    for (let i = 0; i < modules.length; i++) {
        let moduleRect = modules[i].getBoundingClientRect();
        posList.push(moduleRect.left + moduleRect.width / 2 - redLineWidth / 2);
    }
}

//监听红线滑动过程，使用progress
const onProgress = ({ progress }) => {
    if (posList.length === 0) return;
    if (progress === 1) {
        redLineRef.value.style.transform = `translateX(${posList[posList.length - 1]}px)`;
        redLineRef.value.children[0].style.transform = `scaleX(${1})`
        return
    } else {
        // 计算当前的位置索引
        let nowPosIdx = progress * (moduleList.length - 1);
        let nowPosIdxInt = Math.floor(nowPosIdx);
        // 避免数组越界
        let nextPosIdx = nowPosIdxInt + 1 < posList.length ? nowPosIdxInt + 1 : nowPosIdxInt;
        // 计算偏移量
        let trans = (posList[nextPosIdx] - posList[nowPosIdxInt]) * (nowPosIdx - nowPosIdxInt) + posList[nowPosIdxInt];
        
        // 计算滑动过程中的红线缩放
        let maxScale = 2
        let gap = nowPosIdx-nowPosIdxInt
        let scale = gap<=0.5?gap:1-gap
        scale = scale * maxScale + 1
        redLineRef.value.style.transform = `translateX(${trans}px)`;
        redLineRef.value.children[0].style.transform = `scaleX(${scale})`
    }
};

// 重新刷新红线位置
onMounted(() => {
    getModuleParams()
    onProgress({progress: moduleIdx.value == 0? 0: moduleIdx.value/(moduleList.length-1)})
    window.addEventListener('resize',()=>{
        // nextTick = []
        getModuleParams()
    }) 
})

//切换标题
let moduleIdx = ref(1)
const changeSwiper = (idx) =>{
    moduleIdx.value = idx
    mySwiper?.slideTo(idx)
}

</script>

<style lang='scss' scoped>
.home-container{
    .my-swiper{
        height: 100vh;
        background-color: rgb(249,250,249);
    
    .slide-content{
        @include flexcc;
        height: 50vh;
    }
    }

    .home-swiper-head{
        position: fixed;
        top: 0;
        left: 0;
        height: 3rem;
        right: 0;
        background-color: #fff;
        padding: 0 1rem;
        z-index: 2;
        @include flexbc;
    }

    .iconfont{
        font-size: 1.2rem;
        color: rgb(51,51,51);
    }

    .swiper-name{
        @include flexcc;
        font-size: 0.9rem;
        color: rgb(149,149,149);

        span{
            padding: .9375rem;
            box-sizing: content-box;
            transition: all .2s linear;

            &.active{
            font-size: 1rem;
            color: rgb(51,51,51);
            font-weight: bold;
            }
        }
    }

    .red-line{
        position: absolute;
        bottom: 0.5rem;
        left: 0;
        transition: all .2s linear;
        >div{
            border-radius: .1875rem;
            background-color: #ff0000;
            width: 1.875rem;
            height: .1875rem;
            transition: all .2s linear;
        }
    }
}
</style>
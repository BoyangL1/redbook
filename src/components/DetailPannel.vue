<template>
    <div class="popCard" ref="popCardRef">
        <div class="card-detail-frame" ref="cardFrameRef">
            <CardDetail ref="cardDetailRef" @goBack="goBack"></CardDetail>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, nextTick, watch } from 'vue'
import useHooks from '@/hooks/useHooks'
import CardDetail from '@/components/CardDetail.vue'
const { popPara, isOpenDetail } = toRefs(useHooks.state)
const { changeOpenStatus } = useHooks

const cardSmallRef = ref(null)
const popCardRef = ref(null)
const cardFrameRef = ref(null)
const cardDetailRef = ref(null)

//返回
const goBack = () => {
    popCardRef.value.style.backgroundColor = 'rgba(0,0,0,0)'

    cardFrameRef.value.classList.remove('frame-style')
    cardFrameRef.value.style.top = `${popPara.value.y}px`
    cardFrameRef.value.style.left = `${popPara.value.x}px`
    cardFrameRef.value.style.height = `${popPara.value.height / scaleRate}px`
    cardFrameRef.value.style.transform = `scale(${scaleRate})`
    cardFrameRef.value.style.opacity = 0
    cardFrameRef.value.style.borderRadius = '8px'

    cardDetailRef.value.cardContentRef.style.height = `${popPara.value.height/scaleRate}px`
    cardDetailRef.value.cardBottomRef.classList.remove('bottom-style')

    setTimeout(()=>{
        changeOpenStatus(false)
    }, 300) //时间设置和显示动画一致
}

let scaleRate = 1
watch(() => isOpenDetail.value, (newVal, oldVal) => {
    if (newVal) {
        nextTick(() => {
            scaleRate = popPara.value.imgW / document.body.clientWidth
            
            //big pos
            cardFrameRef.value.style.top = `${popPara.value.y}px`
            cardFrameRef.value.style.left = `${popPara.value.x}px`
            cardFrameRef.value.style.height = `${popPara.value.height / scaleRate}px`
            cardFrameRef.value.style.transform = `scale(${scaleRate})`
            cardFrameRef.value.classList.add('frame-style')

            setTimeout(() => {
                popCardRef.value.style.backgroundColor = 'rgba(0,0,0,0.5)'

                //big
                cardFrameRef.value.style.transition = 'all .3s linear' //过渡动画，可调整
                cardFrameRef.value.style.transform = 'scale(1)'
                cardFrameRef.value.style.borderRadius = '0px'
                cardFrameRef.value.style.height = `${document.body.clientHeight}px`
                cardFrameRef.value.classList.add('frame-style')
            })
        })
    }
}, {
    immediate: true
})
</script>

<style lang='scss' scoped>
.popCard {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 900;
    overflow: hidden;
    transition: all .5s linear;
    background-color: rgb(0, 0, 0, 0);
}

.card-detail-frame {
    overflow: hidden;
    position: absolute;
    z-index: 950;
    height: 100vh;
    width: 100vw;
    border-radius: 8px;
    transform-origin: 0 0;
    opacity: 0;
}

.frame-style {
    opacity: 1 !important;
    top: 0 !important;
    left: 0 !important;
}
</style>
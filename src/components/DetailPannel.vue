<template>
    <div class="popCard" ref="popCardRef">
        <!-- 小卡片 -->
        <div ref="cardSmallRef" class="card-detail-small">
            <div class="card-top">
                <div class="card-tri-bg" v-if="popPara.info.isVideo">
                    <svg viewBox="-70 -50 200 300" class="card-svg">
                        <polygon class="card-tri" stroke-linejoin="round" points="0,0 0,200 170,100"></polygon>
                    </svg>
                </div>
                <img ref="contentImg" :src="popPara.info.imageUrl[0]" class="card-source">
            </div>
            <div class="card-title">
                {{ popPara.info.title ? popPara.info.title : '' }}
                {{ popPara.info.content ? popPara.info.content.replaceAll('<br>', '') : '' }}
            </div>
            <div class="card-bottom">
                <div class="card-b-left">
                    <img :src="popPara.info.avatar" class="card-head">
                    <div class="card-name">{{ popPara.info.author }}</div>
                </div>
                <div class="card-b-right">
                    <i class="iconfont icon-aixin1 icon-card-small"></i>
                    <p class="card-like" v-if="popPara.info.likeCount > 0">{{ popPara.info.likeCount }}</p>
                    <p class="card-like" v-else>赞</p>
                </div>
            </div>
        </div>
        <!-- 详情 -->
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

    cardSmallRef.value.style.opacity = 1
    cardSmallRef.value.style.transform = 'scale(1)'
    cardSmallRef.value.style.top = `${popPara.value.y}px`
    cardSmallRef.value.style.left = `${popPara.value.x}px`
    cardSmallRef.value.style.width = `${popPara.value.width}px`
    cardSmallRef.value.style.height = `${popPara.value.height}px`

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
            // small position
            cardSmallRef.value.style.top = `${popPara.value.y}px`
            cardSmallRef.value.style.left = `${popPara.value.x}px`
            cardSmallRef.value.style.width = `${popPara.value.width}px`
            cardSmallRef.value.style.height = `${popPara.value.height}px`
            
            //big pos
            cardFrameRef.value.style.top = `${popPara.value.y}px`
            cardFrameRef.value.style.left = `${popPara.value.x}px`
            cardFrameRef.value.style.height = `${popPara.value.height / scaleRate}px`
            cardFrameRef.value.style.transform = `scale(${scaleRate})`
            cardFrameRef.value.classList.add('frame-style')

            setTimeout(() => {
                popCardRef.value.style.backgroundColor = 'rgba(0,0,0,0.5)'

                //small
                let sh = 100/(1/scaleRate)
                cardSmallRef.value.style.transition = 'all 0s linear' //过渡动画，可调整
                cardSmallRef.value.style.opacity = 0
                cardSmallRef.value.style.top = '0px'
                cardSmallRef.value.style.left = '0px'
                cardSmallRef.value.style.transform = `scale(${1 / scaleRate})`
                cardSmallRef.value.style.height = `${sh}vh`

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

.card-detail-small {
    position: absolute;
    opacity: 1;
    z-index: 999;
    pointer-events: none;
    height: auto;
    background-color: #fefefe;
    overflow: hidden;
    border-radius: 8px;
    transition: all .3s linear;
    transform-origin: 0 0;

    .card-top {
        position: relative;

        .card-tri-bg {
            position: absolute;
            right: 0.675rem;
            top: 0.625rem;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: rgb(0, 0, 0, 0.2);
            @include flexcc;

            .card-svg {
                width: 0.8rem;
                height: 0.8rem;

                .card-tri {
                    fill: rgb(254, 254, 254);
                    stroke: rgb(254, 254, 254);
                    stroke-width: 50;
                }
            }
        }

        .card-source {
            width: 100%;

        }
    }

    .card-title {
        width: calc(100% - 1rem);
        font-size: 0.875rem;
        letter-spacing: 0.05rem;
        color: rgb(51, 51, 51);
        line-height: 1.125rem;
        padding: 0 0.5rem;
        font-weight: 600;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-bottom {
        padding: 0.8rem 0.5rem;
        @include flexlr;

        .card-b-left {
            @include flexxl;

            .card-head {
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
            }

            .card-name {
                color: rgb(153, 153, 153);
                font-size: 0.75rem;
                margin: 0 0 0 .4375rem;
            }
        }

        .card-b-right {
            @include flexxl;

            .icon-card-small {
                font-size: 0.75rem;
                color: rgb(153, 153, 153);
            }

            .card-like {
                margin: 0 0 0 0.3rem;
                color: rgb(153, 153, 153);
                font-size: 0.75rem;
            }
        }
    }
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
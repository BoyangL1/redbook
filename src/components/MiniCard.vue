<template>
    <div class="card-content" ref="contentTab" @click="handleClick(this)">
        <div class="card-top">
            <div class="card-tri-bg" v-if="props.info.isVideo">
                <svg viewBox="-70 -50 200 300" class="card-svg">
                    <polygon class="card-tri" stroke-linejoin="round" points="0,0 0,200 170,100"></polygon>
                </svg>
            </div>
            <img ref="contentImg" :src="props.info.imageUrl[0]" class="card-source" @load="emits('onImgLoaded')">
        </div>
        <div class="card-title">
            {{props.info.title ? props.info.title : ''}}
            {{props.info.content ? props.info.content.replaceAll('<br>','') : ''}}
        </div>
        <div class="card-bottom">
            <div class="card-b-left">
                <img :src="props.info.avatar" class="card-head">
                <div class="card-name">{{ props.info.author }}</div>
            </div>
            <div class="card-b-right">
                <i class="iconfont icon-aixin1 icon-card-small"></i>
                <p class="card-like" v-if="props.info.likeCount>0">{{ props.info.likeCount }}</p>
                <p class="card-like" v-else>赞</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,reactive, toRefs,watch} from 'vue'
import useHooks from '@/hooks/useHooks';
const props = defineProps(['info'])
const emits = defineEmits(['onImgLoaded'])

const {changeOpenStatus} = useHooks
const {popPara,isOpenDetail} = toRefs(useHooks.state)

const contentTab = ref(null)
const contentImg = ref(null)

function handleClick(_this){
    popPara.value = {
        x: _this.$el.getBoundingClientRect().x,
        y: _this.$el.getBoundingClientRect().y,
        width: _this.$el.getBoundingClientRect().width,
        height: _this.$el.getBoundingClientRect().height,
        imgH: contentImg.value.height,
        imgW: contentImg.value.width,
    }
    popPara.value.info = props.info
    changeOpenStatus(true)
    contentTab.value.style.opacity = 0
}

watch(()=>isOpenDetail.value,(newVal,oldVal)=>{
    if(!newVal){
        contentTab.value.style.opacity = 1
    }
})
</script>

<style lang='scss' scoped>
.card-content{
    width: 50vw;
    height: auto;
    background-color: #fefefe;
    border-radius: 0.5rem;
    box-shadow: 0 .125rem .3125rem rgba(181,181,191,0.1);
    overflow: hidden;
    position: absolute;

    .card-top{
        position: relative;

        .card-tri-bg{
            position: absolute;
            right: 0.675rem;
            top:0.625rem;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: rgb(0,0,0,0.2);
            @include flexcc;

            .card-svg{
                width: 0.8rem;
                height: 0.8rem;

                .card-tri{
                    fill: rgb(254,254,254);
                    stroke: rgb(254,254,254);
                    stroke-width: 50;
                }
            }
        }
        
        .card-source{
            width: 100%;
            object-fit: cover;
            object-position: center;   
        }
    }

    .card-title{
        width: calc(100% - 1rem);
        font-size:0.875rem;
        letter-spacing: 0.05rem;
        color: rgb(51,51,51);
        line-height: 1.125rem;
        padding: 0 0.5rem;
        font-weight: 600;

        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-bottom{
        padding: 0.8rem 0.5rem;
        @include flexlr;

        .card-b-left{
            @include flexxl;
            .card-head{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
            }

            .card-name{
                color: rgb(153,153,153);
                font-size: 0.75rem;
                margin: 0 0 0 .4375rem;
            }
        }

        .card-b-right{
            @include flexxl;
            .icon-card-small{
                font-size: 0.75rem;
                color: rgb(153,153,153);
            }

            .card-like{
                margin: 0 0 0 0.3rem;
                color: rgb(153,153,153);
                font-size: 0.75rem;
            }
        }
    }
}
</style>
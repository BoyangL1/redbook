<template>
    <div class="card-detail">
        <div class="card-head">
            <div class="card-head-left">
                <i class="iconfont icon-fanhui" @click="goBack()"></i>
                <img class="card-head-v" :src="popPara.info.avatar">
                <div class="card-name">{{ popPara.info.author }}</div>
            </div>
            <div class="card-head-right">
                <div class="card-bin-follow">关注</div>
                <i class="iconfont icon-fenxiang"></i>
            </div>
        </div>

        <div class="card-content" ref = "cardContentRef">
            <div class="card-swiper">
                <swiper v-if="popPara.info.imageUrl.length > 1 && isOpenDetail" class="img-swiper" @swiper="onSwiper"
                    @slideChange="onSlideChange">
                    <swiper-slide v-for="(item, index) in popPara.info.imageUrl" :key="index">
                        <div class="card-source" :style="{ 'background-image': 'url(' + item + ')' }"></div>
                    </swiper-slide>
                </swiper>
                <div class="card-source" v-else
                    :style="{ 'background-image': 'url(' + popPara.info.imageUrl[0] + ')' }"></div>
            </div>
            <!-- 图片下方小圆点 -->
            <div class="img-swiper-pagination" v-if="popPara.info.imageUrl.length > 1">
                <div v-for="(item, index) in popPara.info.imageUrl" :key="index"
                    :class="{ 'img-swiper-pagination-active': aIndex == index }"></div>
            </div>
            <!-- 图片下方评论 -->
            <div class="card-content-word">
                <div class="card-title">{{ popPara.info.title }}</div>
                <div class="card-describe" v-html="popPara.info.content"></div>
                <div class="card-tag">{{ popPara.info.tag }}</div>
                <div class="card-time">今天 12:08 南燕</div>
            </div>

            <div class="card-comment-section">
                <div class="comment-sum">共xx条评论</div>

                <div class="card-center-input">
                    <img class="card-center-input-head" :src="popPara.info.avatar">
                    <div class="card-center-input-right">
                        <p>留下你的想法吧</p>
                        <div class="card-center-input-i">
                            <i class="iconfont icon-at"></i>
                            <i class="iconfont icon-xiaolian"></i>
                            <i class="iconfont icon-tupian"></i>
                        </div>
                    </div>
                </div>

                <!-- 改成评论的信息 -->
                <div class="card-comments" v-for="i in 10">
                    <img class="card-comments-head-l" :src="popPara.info.avatar">
                    <div>
                        <div class="card-comments-content">
                            <div class="card-comments-name">{{ popPara.info.author }}</div>
                            <div class="card-comments-word">牢大，我们想你了
                                <span class="card-comments-time">今天 16:18清华</span>
                            </div>
                        </div>
                        <div class="card-comments-like">
                            <i class="iconfont icon-aixin1"></i>
                            <div>100</div>
                        </div>
                    </div>
                </div>
                <div class="card-end">- THE END -</div>
            </div>
        </div>

        <div class="card-bottom" ref='cardBottomRef'>
            <div class="card-saysth">
                <i class="iconfont icon-icon"></i>
                <p> 发表你的看法吧...</p>
            </div>

            <div class="card-sanlian">
                <div>
                    <i class="iconfont icon-aixin1"></i>
                    <p>14</p>
                </div>
                <div>
                    <i class="iconfont icon-shoucang"></i>
                    <p>29</p>
                </div>
                <div>
                    <i class="iconfont icon-pinglun"></i>
                    <p>29</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import useHooks from '@/hooks/useHooks'
const { popPara, isOpenDetail } = toRefs(useHooks.state)
const emits = defineEmits(['goBack'])

const cardContentRef = ref(null)
const cardBottomRef = ref(null)

let mySwiper = null
const onSwiper = (swiper) => {
    mySwiper = swiper
}
let initSlie = ref(0)
let aIndex = ref(0)
const onSlideChange = ({ activeIndex }) => {
    aIndex.value = activeIndex

}

//详情页返回首页
const goBack = () => {
    emits('goBack')
}

defineExpose({
    cardContentRef,
    cardBottomRef
})
</script>

<style lang='scss' scoped>
.card-detail {
    height: 100%;
    width: 100%;
    background-color: rgba(254, 254, 254, 1);
    overflow: hidden;
    transition: all 3s linear;

    .card-head {
        width: calc(100% - 2rem);
        height: 3rem;
        overflow: hidden;
        padding: 0 1rem;
        background-color: rgba(254, 254, 254, 1);
        @include flexlr;

        .iconfont {
            font-size: 1.25rem;
            color: rgb(51, 51, 51);
        }

        .card-head-left {
            @include flexl;

            .card-head-v {
                width: 1.875rem;
                height: 1.875rem;
                border-radius: 50%;
                margin: 0 0.625rem 0 0;
            }

            .card-name {
                color: rgb(51, 51, 51);
                font-size: 0.875rem;
                font-weight: bold;
            }
        }

        .card-head-right {
            @include flexl;

            .card-bin-follow {
                border-radius: 50px;
                border: 1px solid rgb(254, 36, 66);
                color: rgb(254, 36, 66);
                font-weight: bold;
                font-size: 0.6875rem;
                margin: 0 0.9rem 0 0;
                width: 3.75rem;
                height: 1.5rem;
                @include flexcc;
            }
        }
    }

    .card-content {
        width: 100%;
        height: calc(100% - 6rem - 1px);
        overflow-y: auto;

        .card-swiper {
            position: relative;
            width: 100vw;
            height: 65%;
            background-color: rgba(245, 245, 245, 1);
            @include flexcc;
            flex-direction: column;

            .img-swiper {
                width: 100%;
                height: 100%;
            }

            .card-source {
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
        }

        .img-swiper-pagination {
            width: 100%;
            margin: 0.6rem 0;
            @include flexcc;

            div {
                width: 0.3rem;
                height: 0.3rem;
                margin: 0.1rem;
                border-radius: 50%;
                background: rgb(204, 204, 204);
            }

            .img-swiper-pagination-active {
                background: rgb(254, 36, 66);
            }
        }

        .card-content-word {
            width: calc(100% - 1.4rem);
            margin: 0 auto;
            border-bottom: 1px solid rgb(233, 233, 233);

            .card-title {
                font-size: 1rem;
                color: rgb(43, 43, 43);
                padding: 0.5rem 0;
                font-weight: bold;
            }

            .card-describe {
                font-size: 0.875rem;
                line-height: 1.5rem;
                color: rgb(51, 51, 51);
                padding: 0 0 1rem;
            }

            .card-tag {
                line-height: 1.5rem;
                font-size: 0.875rem;
                color: rgb(38, 69, 114);
            }

            .card-time {
                font-size: 0.625rem;
                color: rgb(204, 204, 204);
                margin: 1rem 0;
            }
        }

        .card-comment-section {
            width: calc(100% - 0.7rem);
            padding: 0 0 2rem 0.7rem;
            margin: auto 0;

            .comment-sum {
                font-size: 0.75rem;
                color: rgb(97, 97, 97);
                margin: 1rem 0;
            }

            .card-center-input {
                padding: 0 0.7rem 0 0;
                @include flexlr;

                .card-center-input-head {
                    width: 1.75rem;
                    height: 1.75rem;
                    border-radius: 50%;
                    margin: 0 0.625rem 0 0;
                }

                .card-center-input-right {
                    width: calc(100% - 3.125rem);
                    padding: 0.1rem;
                    height: 1.75rem;
                    border-radius: 5rem;
                    background-color: rgb(244, 244, 245);
                    @include flexlr;

                    p {
                        color: rgb(177, 177, 177);
                        font-size: 0.75rem;
                    }

                    .card-center-input-i {
                        width: 25%;
                        height: 100%;
                        @include flexlr;

                        i {
                            color: rgb(151, 151, 151);
                        }
                    }
                }
            }

            .card-comments {
                padding: 1rem 0 0;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;

                .card-comments-head-l {
                    width: 1.75rem;
                    height: 1.75rem;
                    border-radius: 50%;
                    margin: 0 0.625rem 0 0;
                }

                >div {
                    border-bottom: 1px solid rgb(233, 233, 233);
                    padding: 0 0 1rem;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    width: 100%;


                    .card-comments-content {
                        color: rgb(177, 177, 177);
                        line-height: 1.4rem;
                        width: calc(100% - 3rem);
                        align-items: flex-start;

                        .card-comments-name {
                            color: rgb(177, 177, 177);
                            font-size: 0.75rem;
                            line-height: 1.4rem;
                        }

                        .card-comments-word {
                            color: rgb(40, 40, 40);
                            font-size: 0.75rem;
                            line-height: 1.4rem;

                            .card-comments-time {
                                // display: block;
                                color: rgb(138, 138, 138);
                                font-size: 0.625rem;
                                margin-left: 5px;
                            }
                        }
                    }

                    .card-comments-like {
                        padding: 0 0.7rem 0 0;
                        color: rgb(91, 91, 91);
                        font-size: 0.625rem;
                        line-height: 1.4rem;
                        @include flexcc;
                        flex-direction: column;
                    }
                }
            }

            .card-end {
                font-size: 0.625rem;
                columns: rgb(132, 132, 132);
                margin: 2rem 0;
                text-align: center;

            }
        }
    }

    .card-bottom {
        width: calc(100% - 2rem);
        height: 3rem;
        overflow: hidden;
        padding: 0 1rem;
        background-color: rgba(254, 254, 254, 1);
        border-top: 1px solid rgb(233, 233, 233);
        @include flexlr;

        .card-saysth {
            background-color: rgba(245, 245, 245, 1);
            border-radius: 50px;
            width: 40%;
            height: 1.875rem;
            overflow: hidden;
            @include flexl;

            i {
                font-size: 1rem;
                color: rgb(138, 138, 138);
            }

            p {
                color: rgb(102, 102, 102);
                font-size: 0.825rem;
                letter-spacing: 1px;
                white-space: nowrap;
            }
        }

        .card-sanlian {
            width: 50%;
            @include flexlr;

            >div {
                @include flexl;

                i {
                    font-size: 1.3rem;
                    color: rgb(51, 51, 51);
                    font-weight: bold;
                }

                p {
                    color: rgb(41, 41, 41);
                    font-size: 0.8rem;
                    margin: 0 0 0 0.3rem;
                }
            }
        }
    }
}

.bottom-style {
    position:fixed;
    bottom: 0px;
}
</style>
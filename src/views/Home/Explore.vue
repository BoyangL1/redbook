<template>
    <LoadPannel @searchMore = "searchMore">
        <div ref="refreshRef" class="refresh-div">
            <canvas ref = "refreshCanvasRef" width="80" height="80"></canvas>
        </div>
        <div ref="exploreRef">
        <MiniCard v-for="(item,index) in exploreCards" :info="item" :key="item.id" @onImgLoaded="addImgCount"></MiniCard>
        </div>
    </LoadPannel>
</template>

<script setup>
import {ref,reactive,toRefs, watch, onMounted, nextTick} from 'vue';
import MiniCard from '../../components/MiniCard.vue'
import {exploreCardMock } from '@/mock/homeData'
import computeWaterFallFlow from '@/utils/waterFallFlow'
import LoadPannel from '@/components/LoadPannel.vue'
import useHooks from '@/hooks/useHooks';

const {isRefresh} = toRefs(useHooks.state)
const {changeRefresh} = useHooks

//记录card是否已经加载完毕
let imgCount = 0
let exploreCards = reactive([])
let imgLen
//初始化数据
const initData = async () => {
    let res = await exploreCardMock()
    exploreCards.splice(0,exploreCards.length)
    nextTick(()=>{
        imgLen = res.length
        res.forEach(item =>{
            exploreCards.push(item)
        })
    })    
}

initData()

//瀑布流代码，计算每个card的位置
const exploreRef = ref(null)

const addImgCount = ()=>{
    imgCount++
    if(imgCount === imgLen){
        //瀑布流，计算单个card的位置
        computeWaterFallFlow(exploreRef.value)
    }
}

//加载更多,后续改为和后端的交互
const searchMore = async(callback) => {
    let res = await exploreCardMock(5)
    res.forEach(item =>{
        exploreCards.push(item)
    })
    imgLen = exploreCards.length
    callback ? callback():''
}

//刷新
const refreshRef = ref(null)
const exploreRefresh = async(callback)=>{
    exploreRef.value.parentNode.parentNode.scrollTop = 0
    refreshRef.value.style.height = '100px'
    refreshRef.value.style.transition = 'all 0.3s linear'
    refreshCanvasRef.value.style.animation = 'refreshAni 1.2s ease infinite'
    refreshAnimate()
    await initData()
    refreshCanvasRef.value.style.animation=''
    refreshRef.value.style.height='0px'
    cancelAnimationFrame(requestID)
    setTimeout(()=>{
        refreshRef.value.style.transition = ''
    },300)
}
//监听是否刷新，当用户点击首页的时候进行刷新
watch(() => isRefresh.value, async (newValue, oldValue) => {
    if (newValue) {
        await exploreRefresh()
        changeRefresh(false)
    }
})

// 下拉后最上方刷新动画
const refreshCanvasRef = ref(null)
let ctx 
let direction = 1
const R = 10
let angle = 0 
const speed = 0.05
let centerX = 0
let centerY = 0
let requestID

//旋转动画 
const refreshAnimate = () =>{
    ctx.clearRect(0,0,refreshCanvasRef.value.width,refreshCanvasRef.value.height)

    ctx.beginPath()
    ctx.strokeStyle = 'rgb(204,204,204)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.arc(centerX,centerY,R,Math.PI/2-angle/2,Math.PI/2+angle/2)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = 'rgb(204,204,204)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.arc(centerX,centerY,R,Math.PI*3/2-angle/2,Math.PI*3/2+angle/2)
    ctx.stroke()
    ctx.closePath()

    if(angle>=Math.PI - 0.4){
        direction =- 1
    } else if (angle<=0.4){
        direction = 1
    }

    angle += speed*direction

    requestID = requestAnimationFrame(()=>{
        refreshAnimate()
    })
}

//下拉过程的动画
const refreshAnimateDown = (range) =>{
    let angle = (range/110)*(range/110)*Math.PI //下拉距离与圆环的速度，二次函数优化
    ctx.clearRect(0,0,refreshCanvasRef.value.width,refreshCanvasRef.value.height)

    ctx.beginPath()
    ctx.strokeStyle = 'rgb(204,204,204)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.arc(centerX,centerY,R,Math.PI/2-angle/2,Math.PI/2+angle/2)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = 'rgb(204,204,204)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.arc(centerX,centerY,R,Math.PI*3/2-angle/2,Math.PI*3/2+angle/2)
    ctx.stroke()
    ctx.closePath()
}

onMounted(() => {
    ctx = refreshCanvasRef.value.getContext('2d')
    centerX = refreshCanvasRef.value.width/2
    centerY = refreshCanvasRef.value.height/2
    
    const isTop = () => { //判断是否是顶部
        const t = exploreRef.value.parentNode.parentNode.scrollTop
        return t === 0
    }

    //下拉刷新：触碰屏幕、下拉
    let startY = 0
    let endY = 0
    let topFlag = false
    exploreRef.value.addEventListener('touchstart',function(e){
        console.log('开始下拉')
        if (isTop()){
            topFlag = true
            startY = e.touches[0].pageY
        }
    })

    exploreRef.value.addEventListener('touchmove',function(e){
        let y = e.touches[0].pageY - startY
        if (topFlag && y > 0){
            e.preventDefault();
            if (y <= 100){
                refreshRef.value.style.height = y + 'px'
                refreshAnimateDown(y)
            } else {
                refreshRef.value.style.height = '100px'
            }
        }
    })

    exploreRef.value.addEventListener('touchend',async function(e){
        if (topFlag) {
            let refreshDivH = refreshRef.value.style.height
            if (refreshDivH.substring(0,refreshDivH.length - 2)/ 1 <=99){
                refreshRef.value.style.transition = 'all 0.3s linear'
                refreshRef.value.style.height = '0px'
                setTimeout(()=>{
                    refreshRef.value.style.transition = ''
                },300)
            }else{
                refreshCanvasRef.value.style.animation = 'refreshAni 1.2s ease infinite'
                refreshAnimate()
                imgCount = 0
                await initData()
                refreshCanvasRef.value.style.animation = ''
                refreshRef.value.style.transition = 'all 0.3s linear'
                refreshRef.value.style.height = '0px'
                cancelAnimationFrame(requestID)
                setTimeout(()=>{
                    refreshRef.value.style.transition = ''
                },300)
            }
        }
    })

    exploreRefresh()
})

</script>

<style lang='scss' scoped>
.refresh-div{
    height: 0;
    width: 100%;
    overflow: hidden;
    @include flexcc;
}
</style>
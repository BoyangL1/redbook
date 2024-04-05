import redData from "./data"
// 模拟接口请求时间
const delay = (t) =>{
    return new Promise(reslove => {
        setTimeout(()=>{
            reslove()
        }, t)
    })
}

const exploreCardMock= async (nums = 10)=>{
    await delay(300)
    return new Array(nums).fill(1).map((a,i)=>{
        let h = Math.floor(Math.random()*10)
        let isVideo = Math.random()<0.1
        let imageList = undefined
        let videoUrl = undefined
        if (isVideo){
            videoUrl = [`scr/mocel/source/vv13.mp4`]
            imageList = [`src/mock/source/img13.jpg`]
        } else{
            let n = Math.floor(Math.random()*5)+1//详情页图片的数量
            imageList = new Array(n).fill(1).map(()=>{
                let m = Math.floor(Math.random()*12) + 1 //mock里有12张图片
                return `src/mock/source/img${m}.jpg`
            })
        }
        let avatar_index = Math.floor(Math.random()*12) + 1
        return{
            id:i,
            isVideo:isVideo,
            imageUrl:imageList,
            videoUrl: videoUrl,
            title: redData[h].title,
            tag: redData[h].tag,
            content:redData[h].content,
            avatar:'src/mock/source/h'+ avatar_index +'.jpg',
            author:'WHU❤PKU',
            likeCount:Math.floor(Math.random()*1000)
    }
    })
}

export {
    exploreCardMock
}
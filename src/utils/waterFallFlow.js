//计算card横向和纵向的偏移量

const computerWaterFallFlow = (ref,columns = 2)=>{
    let resizeListener = null

    const computerCard = ()=>{
        const cards = ref.children
        const winWidth = window.innerWidth
        const margin = Math.round(winWidth*0.015)
        const cardWidth = Math.floor((winWidth-(columns+1)*margin)/columns)

        const topList = new Array(columns).fill(0)
        //为每个card赋予宽度
        for(let i=0;i<cards.length;i++){
            cards[i].style.width = `${cardWidth}px`
        }
        //计算每个card的位置偏移
        for(let i = 0;i<cards.length;i++){
            //计算那一列比较高，把card插入高的一列
            let min=Math.min(...topList)
            const minColumn = topList.indexOf(min)

            //计算出crad的偏移量,距离左侧和距离顶部
            let left = margin*(minColumn+1)+cardWidth*minColumn
            let top = min + margin
            cards[i].style.transform = `translate(${left}px,${top}px)`
            topList[minColumn] +=cards[i].clientHeight + margin
        }
        ref.style.height = Math.max(...topList)+margin+'px'
    }

    computerCard()

    //监听resize事件
    if(!resizeListener){
        resizeListener = window.addEventListener('resize',()=>{
            computerCard()
        })
    }
}

export default computerWaterFallFlow
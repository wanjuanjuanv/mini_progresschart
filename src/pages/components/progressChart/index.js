import Taro, { Component } from '@tarojs/taro'
import { View, Text, Textarea, Image, Canvas } from '@tarojs/components'

import imgShadow from '../../assets/image/ic_attendance_shadow.png';

export default class ProgressChart extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){
        const { width, height, strokeWidth=23, shadowWidth=53, innerWidth=4, imageWidth=16, bgColor='#F1F2F7' } = this.props
        let centerX=width/2, centerY=height/2;
        let r0=width/2-strokeWidth/2;
        let r1=width/2-strokeWidth-innerWidth-strokeWidth/2;
        let r2=width/2-strokeWidth*2-innerWidth*2-strokeWidth/2;
        let arrayR=[r0,r1,r2]
        let sAngle = -0.5 * Math.PI, eAngle = 1.5 * Math.PI
        
        const ctx = wx.createCanvasContext('myCanvas', this.$scope)

        // Draw background
        ctx.beginPath()
        ctx.arc(centerX, centerY, r0, sAngle, eAngle)
        ctx.setStrokeStyle(bgColor)
        ctx.setLineWidth(strokeWidth)
        ctx.setLineCap('round')
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(centerX, centerY, r1, sAngle, eAngle)
        ctx.setStrokeStyle(bgColor)
        ctx.setLineWidth(strokeWidth)
        ctx.setLineCap('round')
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(centerX, centerY, r2, sAngle, eAngle)
        ctx.setStrokeStyle(bgColor)
        ctx.setLineWidth(strokeWidth)
        ctx.setLineCap('round')
        ctx.stroke()

        //Draw arc
        this.props.data && this.props.data.map((item, index) => {
            //画上不超过100%的弧度
            ctx.beginPath()
            ctx.arc(centerX, centerY, arrayR[index], sAngle, (2*item.percent/100-0.5) * Math.PI)
            ctx.setStrokeStyle(item.color)
            ctx.setLineWidth(strokeWidth)
            ctx.setLineCap('round')
            ctx.stroke()
            //环比超过100% 需加上阴影表示
            if(item.percent > 100){ 
                item.percent=item.percent%100
                //画上阴影
                ctx.drawImage(imgShadow, centerX + Math.sin((item.percent/100)*2*Math.PI) * arrayR[index]-shadowWidth/2, 
                centerY - Math.cos((item.percent/100)*2*Math.PI) * arrayR[index]-shadowWidth/2, shadowWidth, shadowWidth)
                //画上剩余的弧度 盖住阴影
                ctx.beginPath()
                ctx.arc(centerX, centerY, arrayR[index], sAngle, (2*item.percent/100-0.5) * Math.PI)
                ctx.setStrokeStyle(item.color)
                ctx.setLineWidth(strokeWidth)
                ctx.setLineCap('round')
                ctx.stroke()
            }
            if(item.imageObj){
                //画上表示类型的图表
                ctx.drawImage(item.imageObj, centerX-strokeWidth/2+(strokeWidth-imageWidth)/2, 
                    (strokeWidth+innerWidth)*index+(strokeWidth-imageWidth)/2, imageWidth, imageWidth)
            }
        })
        ctx.draw()
    }

    render(){
        return(
            <Canvas style={{height:`${this.props.height}px`,width:`${this.props.width}px`}} canvas-id="myCanvas"></Canvas>
        )
    }
}
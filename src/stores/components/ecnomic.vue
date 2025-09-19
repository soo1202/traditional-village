<script setup lang="ts">
import Header from "../view/header.vue";
import {VueUiDonut, VueUiDonutConfig} from "vue-data-ui";
import { VueUiXy } from "vue-data-ui";
import {ref, reactive, Ref} from 'vue'
import "vue-data-ui/style.css"
import { useGlobalStore } from '../stores/globalStore';
import {storeToRefs} from "pinia";
import router from "../router";
import {Edit} from "@element-plus/icons-vue";
const { mainincomdata,avincomedata,basictext,basicimg,featureimg1,featuretext,featureimg2,ecodevimg,ecodevtext,SideName} = storeToRefs(useGlobalStore())
const config = reactive<VueUiDonutConfig>({
  type: "classic" as "classic" | "polar",
  "responsive": false,
  "theme": "",
  "customPalette": [],
  "useCssAnimation": true,
  "useBlurOnHover": false,
  "userOptions": {
    "show": false,
    "position": "right",
    "buttons": {
      "tooltip": true,
      "pdf": true,
      "csv": true,
      "img": true,
      "table": true,
      "labels": true,
      "fullscreen": true,
      "sort": false,
      "stack": false,
      "animation": false,
      "annotator": true
    },
    "buttonTitles": {
      "open": "Open options",
      "close": "Close options",
      "tooltip": "Toggle tooltip",
      "pdf": "Download PDF",
      "csv": "Download CSV",
      "img": "Download PNG",
      "table": "Toggle table",
      "labels": "Toggle labels",
      "fullscreen": "Toggle fullscreen",
    }
  },
  "translations": {
    "total": "Total",
    "average": "Average"
  },
  "table": {
    "show": false,
    "responsiveBreakpoint": 400,
    "th": {
      "backgroundColor": "#ae4242ff",
      "color": "#1A1A1Aff",
      "outline": "none"
    },
    "td": {
      "backgroundColor": "#FFFFFFff",
      "color": "#1A1A1Aff",
      "outline": "none",
      "roundingValue": 0,
      "roundingPercentage": 0
    },
    "columnNames": {
      "series": "Series",
      "value": "Value",
      "percentage": "Percentage"
    }
  },
  "style": {
    "fontFamily": "inherit",
    "chart": {
      "useGradient": false,
      "gradientIntensity": 40,
      "backgroundColor": "#ffffff00",
      "color": "#1a1a1aff",
      "layout": {
        "labels": {
          "dataLabels": {
            "show": true,
            "useLabelSlots": false,
            "hideUnderValue": 2,
            "prefix": "",
            "suffix": ""
          },
          "value": {
            "rounding": 0,
            "show": true,
            "formatter": null
          },
          "percentage": {
            "color": "#1A1A1Aff",
            "bold": true,
            "fontSize": 26,
            "rounding": 0,
            "formatter": null
          },
          "name": {
            "color": "#1A1A1Aff",
            "bold": false,
            "fontSize": 14
          },
          "hollow": {
            "show": true,
            "total": {
              "show": false,
              "bold": false,
              "fontSize": 18,
              "color": "#AAAAAAff",
              "text": "Total",
              "offsetY": 0,
              "value": {
                "color": "#1A1A1Aff",
                "fontSize": 18,
                "bold": false,
                "suffix": "",
                "prefix": "",
                "offsetY": 0,
                "rounding": 0,
                "formatter": null
              }
            },
            "average": {
              "show": false,
              "bold": false,
              "fontSize": 18,
              "color": "#AAAAAAff",
              "text": "Average",
              "offsetY": 0,
              "value": {
                "color": "#1A1A1Aff",
                "fontSize": 18,
                "bold": false,
                "suffix": "",
                "prefix": "",
                "offsetY": 0,
                "rounding": 0,
                "formatter": null
              }
            }
          }
        },
        "donut": {
          "strokeWidth": 55,
          "borderWidth": 1,
          "useShadow": false,
          "shadowColor": "#1A1A1A"
        }
      },
      "comments": {
        "show": true,
        "showInTooltip": true,
        "width": 100,
        "offsetY": 0,
        "offsetX": 0
      },
      "legend": {
        "show": true,
        "bold": true,
        "backgroundColor": "#ffffff00",
        "color": "#1A1A1Aff",
        "fontSize": 16,
        "roundingValue": 0,
        "roundingPercentage": 0
      },
      "tooltip": {
        "show": true,
        "color": "#1A1A1Aff",
        "backgroundColor": "#24895a00",
        "fontSize": 14,
        "customFormat": null,
        "borderRadius": 4,
        "borderColor": "#e1e5e8",
        "borderWidth": 1,
        "backgroundOpacity": 30,
        "position": "center",
        "offsetY": 24,
        "showValue": true,
        "showPercentage": true,
        "roundingValue": 0,
        "roundingPercentage": 0
      },
      "title": {
        "text": "经济组成占比",
        "color": "#1A1A1Aff",
        "fontSize": 20,
        "bold": true,
        "textAlign": "center",
        "paddingLeft": 0,
        "paddingRight": 0,
        "subtitle": {
          "color": "#A1A1A1ff",
          "text": "",
          "fontSize": 16,
          "bold": false
        }
      }
    }
  }
});
const config1 : Ref<any>= ref({"theme":"","responsive":false,"customPalette":[],"useCssAnimation":true,"downsample":{"threshold":501},"chart":{"fontFamily":"inherit","backgroundColor":"#ffffff00","color":"#1a1a1aff","height":"374","width":"756","zoom":{"show":true,"color":"#000000ff","highlightColor":"rgba(74, 74, 74, 1)","fontSize":18,"useResetSlot":false,"minimap":{"show":false,"smooth":true,"selectedColor":"rgba(31, 119, 180, 1)","selectedColorOpacity":0.2,"lineColor":"rgba(26, 26, 26, 0)","selectionRadius":2,"indicatorColor":"#1A1A1A"}},"padding":{"top":38,"right":24,"bottom":48,"left":48},"highlighter":{"color":"#1A1A1Aff","opacity":5,"useLine":false,"lineDasharray":7,"lineWidth":1},"highlightArea":{"show":false,"from":0,"to":0,"color":"#1A1A1Aff","opacity":20,"caption":{"text":"Caption","fontSize":25,"color":"#1A1A1Aff","bold":false,"offsetY":0,"width":"auto","padding":3,"textAlign":"center"}},"timeTag":{"show":false,"backgroundColor":"#e1e5e8ff","color":"#1A1A1Aff","fontSize":21,"circleMarker":{"radius":5,"color":"#1A1A1Aff"}},"grid":{"stroke":"#030303ff","showVerticalLines":false,"showHorizontalLines":false,"position":"middle","frame":{"show":false,"stroke":"#E1E5E8ff","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","strokeDasharray":8},"labels":{"show":false,"color":"#1A1A1Aff","fontSize":30,"axis":{"yLabel":"当地经济","yLabelOffsetX":0,"xLabel":"","xLabelOffsetY":14,"fontSize":29},"zeroLine":{"show":true},"xAxis":{"showBaseline":true},"yAxis":{"showBaseline":true,"commonScaleSteps":10,"useIndividualScale":false,"stacked":false,"gap":12,"labelWidth":40,"formatter":null,"scaleMin":null,"scaleMax":null},"xAxisLabels":{"color":"#1A1A1Aff","show":true,"values":["2018","2019","2020","2021","2022","2023","2024"],"fontSize":18,"showOnlyFirstAndLast":false,"showOnlyAtModulo":false,"modulo":14,"yOffset":8,"rotation":0}}},"comments":{"show":true,"showInTooltip":true,"width":200,"offsetX":0,"offsetY":0},"labels":{"fontSize":28,"prefix":"","suffix":""},"legend":{"color":"#1A1A1Aff","show":true,"fontSize":17},"title":{"text":"村落经济变化趋势","color":"#1a1a1aff","fontSize":18,"bold":false,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#CCCCCCff","text":"   ","fontSize":16,"bold":false},"show":true},"tooltip":{"show":false,"color":"#1A1A1Aff","backgroundColor":"#FFFFFFff","fontSize":14,"customFormat":null,"borderRadius":4,"borderColor":"#e1e5e8","borderWidth":1,"backgroundOpacity":"68","position":"center","offsetY":24,"showValue":true,"showPercentage":false,"roundingValue":0,"roundingPercentage":0},"userOptions":{"show":false,"position":"right","buttons":{"tooltip":true,"pdf":true,"csv":true,"img":true,"table":true,"labels":true,"fullscreen":true,"sort":false,"stack":true,"animation":false,"annotator":true},"buttonTitles":{"open":"Open options","close":"Close options","tooltip":"Toggle tooltip","pdf":"Download PDF","csv":"Download CSV","img":"Download PNG","table":"Toggle table","labels":"Toggle labels","fullscreen":"Toggle fullscreen","stack":"Toggle stack mode","annotator":"Toggle annotator"}}},"bar":{"borderRadius":10,"useGradient":true,"periodGap":0.21000000000000008,"border":{"useSerieColor":false,"strokeWidth":6,"stroke":"#FFFFFFff"},"labels":{"show":true,"offsetY":-8,"rounding":0,"color":"#1A1A1Aff","formatter":null},"serieName":{"show":false,"offsetY":-6,"useAbbreviation":true,"abbreviationSize":6,"useSerieColor":true,"color":"#1A1A1Aff","bold":false}},"line":{"radius":6,"useGradient":true,"strokeWidth":2,"dot":{"useSerieColor":true,"fill":"#FFFFFF","strokeWidth":0.5},"labels":{"show":true,"offsetY":-8,"rounding":0,"color":"#1A1A1Aff","formatter":null},"area":{"useGradient":true,"opacity":20}},"plot":{"radius":6,"useGradient":true,"dot":{"useSerieColor":true,"fill":"#FFFFFF","strokeWidth":0.5},"labels":{"show":true,"offsetY":-8,"rounding":0,"color":"#1A1A1Aff","formatter":null}},"table":{"responsiveBreakpoint":400,"rounding":0,"sparkline":true,"showSum":true,"columnNames":{"period":"Period","total":"Total"},"th":{"backgroundColor":"#FAFAFAff","color":"#1a1a1aff","outline":""},"td":{"backgroundColor":"#FAFAFAff","color":"#1A1A1Aff","outline":""}},"showTable":false})
const goside = () => {
  setTimeout(() => {
    router.push({
      path: '/side',
    })
  }, 400)

}
const  goSidehistory=()=>{
  router.push({
    path: '/sidehistory',
  })
}
</script>
<template>
<div class="app-container">
  <Header />
  <button @click="goside" class="routebutton">路线规划</button>
  <div class="body">
    <div class="container">
      <div class="text-section">
        <h2>{{SideName}}产业基础</h2>
        <p class="basic-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{basictext}}</p>
        <img :src="basicimg" alt="基础产业图片">
      </div>
      <div class="image-section">
         <VueUiDonut :config="config" :dataset="mainincomdata" />
      </div>
    </div>
    <div class="container">
      <div class="text-section">
        <h2>{{SideName}}特色</h2>
        <p class="feature-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{featuretext}}</p>
        <img :src="featureimg1"  alt="特色图片">
      </div>
      <div class="image-section">
        <img :src="featureimg2">
           </div>
    </div>
    <div class="container" style="margin-bottom: 20px">
      <div class="text-section">
        <h2>{{SideName}}经济发展</h2>
        <p class="ecodev-text"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ecodevtext}}</p>
        <img :src="ecodevimg"  alt="经济发展图片">
      </div>
      <div class="image-section">
        <VueUiXy :config="config1" :dataset="avincomedata" />
        </div>
    </div>
  </div>
</div>
  <el-tooltip content="发表评论" placement="top">
    <el-button
        type="primary"
        :icon="Edit"
        circle
        size="large"
        @click="goSidehistory"
        style="position: fixed; bottom: 100px; right: 40px; z-index: 1000; font-size: 20px;"
    />
  </el-tooltip>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@700&family=ZCOOL+KuaiLe&display=swap');
* {
  margin: 0;
  padding: 0;
}
.app-container {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.body {
  width: 80%;
  margin-left: 10%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}
.heade-image img {
  width: 100%;
  height: 90vh;
  display: block; /* 去除图片下方的空白间隙 */
}
.container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  height: fit-content;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin: 30px auto;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  animation: fadeIn 0.6s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.text-section, .image-section {
  box-sizing: border-box;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.text-section {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-section h2 {
  font-size: 1.8rem;
  color: #2f2f2f;
  margin-bottom: 15px;
  border-left: 6px solid #4CAF50;
  padding-left: 10px;
}

.text-section p {
  font-size: 1.1rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #444;
  line-height: 1.9;
  text-indent: 2em;
  margin-bottom: 15px;
}

.text-section img {
  width: auto;
  height: 300px;
  border-radius: 12px;
  object-fit: cover;
  margin-top: 20px;
}

.image-section {
  margin-left: 10px;
  width: 38%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-section img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.container:hover {
  transform: scale(1.01);
}
.text-section h2::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 20px;
  background-color: #4CAF50;
  margin-right: 10px;
  border-radius: 4px;
}

.routebutton{
  background-color: rgba(120, 214, 70, 0.5);
  width: 60px;
  height: 40px;
  right: 15px;
  top: 30%;
  position: fixed;
  z-index: 5;
}
.basic-text {
  font-size: 16px;
  color: #4CAF50;
  line-height: 1.2;
  font-family: "Noto Sans SC", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
}
.feature-text {
  font-size: 16px;
  color: #4CAF50;
  font-family: "Noto Sans SC", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  line-height: 1.2;
  margin-bottom: 20px;
}
.ecodev-text {
  font-family: "Noto Sans SC", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-size: 16px;
  color: #4CAF50;
}
</style>
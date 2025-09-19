<script setup lang="ts">
import {Ref, ref} from "vue";
    import { VueUiDonut } from "vue-data-ui";
    import { VueUiVerticalBar } from "vue-data-ui";
    import {VueUiXy} from "vue-data-ui";
    import { VueUiDonutEvolution } from "vue-data-ui";
    import { VueUiRadar } from "vue-data-ui";
    import "vue-data-ui/style.css"
    import { useGlobalStore } from '../stores/globalStore';
    import { storeToRefs } from 'pinia'
    const {flag,mainincomdata, agedata,persondata,avincomedata,SideName,cityFlag,cityName}=storeToRefs(useGlobalStore())
    const config :Ref<any> = ref({
  "type": "classic",
  "responsive": false,
  "theme": "",
  "customPalette": [],
  "useCssAnimation": true,
  "useBlurOnHover": false,
  "userOptions": {
    "show": false,
    "position": "left",
    "buttons": {
      "tooltip": false,
      "pdf": false,
      "csv": false,
      "img": false,
      "table": false,
      "labels": false,
      "fullscreen": false,
      "sort": false,
      "stack": false,
      "animation": false,
      "annotator": false
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
      "annotator": "Toggle annotator"
    }
  },
  "translations": {
    "total": "Total",
    "average": "Average"
  },
  "style": {
    "fontFamily": "inherit",
    "chart": {
      "useGradient": true,
      "gradientIntensity": 40,
      "backgroundColor": "#ffffff00",
      "color": "#1A1A1Aff",
      "layout": {
        "labels": {
          "dataLabels": {
            "show": true,
            "useLabelSlots": false,
            "hideUnderValue": 3,
            "prefix": "",
            "suffix": ""
          },
          "value": {
            "rounding": 0,
            "show": false,
            "formatter": null
          },
          "percentage": {
            "color": "#1a1a1aff",
            "bold": true,
            "fontSize": 25,
            "rounding": 0,
            "formatter": null
          },
          "name": {
            "color": "#1A1A1Aff",
            "bold": false,
            "fontSize": 20
          },
          "hollow": {
            "show": false,
            "total": {
              "show": false,
              "bold": false,
              "fontSize": 18,
              "color": "#AAAAAAff",
              "text": "",
              "offsetY": 0,
            },
            "average": {
              "show": false,
            }
          }
        },
        "donut": {
          "strokeWidth": 55,
          "borderWidth": 1,
          "useShadow": true,
          "shadowColor": "#1A1A1A"
        }
      },
      "legend": {
        "show": true,
        "bold": false,
        "backgroundColor": "#ffffff00",
        "color": "#1A1A1Aff",
        "fontSize": 16,
        "roundingValue": 0,
        "roundingPercentage": 0
      },
      "title": {
        "text": "村落分布基本特征",
        "color": "darkolivegreen",
        "fontSize": 17,
        "bold": true,
        "textAlign": "center",
        "paddingLeft": 0,
        "paddingRight": 0,
      }
    }
  }
});
    const dataset :Ref<any>= ref([
      {
        name: "山区",
        values: [70], // 这里是一个普通数组，初始化时只存储当前值
        color: "#1f77b4",
      },
      {
        name: "沿河",
        values: [50],
        color: "#aec7e8",
      },
      {
        name: "城区",
        values: [25],
        color: "#ff7f0e",
      },
    ]);
    const config2 :Ref<any> = ref({"responsive":false,"theme":"","customPalette":[],"useCssAnimation":true,"style":{"fontFamily":"inherit","chart":{"backgroundColor":"#e0e2cd","color":"#1A1A1Aff","layout":{"bars":{"sort":"desc","useStroke":false,"strokeWidth":2,"height":60,"gap":40,"borderRadius":4,"offsetX":64,"paddingRight":0,"useGradient":true,"gradientIntensity":20,"fillOpacity":"100","underlayerColor":"#FFFFFF","dataLabels":{"color":"#1A1A1Aff","bold":true,"fontSize":14,"value":{"show":true,"roundingValue":0,"prefix":"","suffix":"","formatter":null},"percentage":{"show":true,"roundingPercentage":0},"offsetX":0},"nameLabels":{"show":true,"color":"#1A1A1Aff","bold":false,"fontSize":20,"offsetX":0},"parentLabels":{"show":false,"color":"#1A1A1Aff","bold":false,"fontSize":19,"offsetX":0}},"highlighter":{"color":"red","opacity":5},"separators":{"show":false,"color":"#e1e5e8ff","strokeWidth":1}},"title":{"text":"人口数量特征","color":"darkolivegreen","fontSize":17,"bold":true,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#A1A1A1ff","text":"","fontSize":16,"bold":false}},"legend":{"show":true,"bold":false,"backgroundColor":"transparent","color":"#1A1A1Aff","fontSize":15,"position":"bottom","roundingValue":0,"roundingPercentage":0,"prefix":"","suffix":""},"tooltip":{"show":false,"color":"#1a1a1aff","backgroundColor":"#ffffff00","fontSize":19,"customFormat":null,"borderRadius":4,"borderColor":"rgba(225, 229, 232, 1)","borderWidth":1,"backgroundOpacity":30,"position":"center","offsetY":24,"showValue":true,"showPercentage":true,"roundingValue":0,"roundingPercentage":0,"prefix":"","suffix":""}}},"userOptions":{"show":true,"position":"right","buttons":{"tooltip":false,"pdf":false,"csv":false,"img":false,"table":false,"labels":false,"fullscreen":true,"sort":false,"stack":false,"animation":false,"annotator":false},"buttonTitles":{"open":"Open options","close":"Close options","tooltip":"Toggle tooltip","pdf":"Download PDF","csv":"Download CSV","img":"Download PNG","table":"Toggle table","fullscreen":"Toggle fullscreen","sort":"Toggle sort","annotator":"Toggle annotator"}},"table":{"show":false,"responsiveBreakpoint":400,"th":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none"},"td":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none","roundingValue":0,"roundingPercentage":0,"prefix":"","suffix":""}},"translations":{"parentName":"Group","childName":"Serie","value":"Value","percentageToTotal":"% / total","percentageToSerie":"% / group"}})
    const dataset2 :Ref<any>= ref([{"name":"人口数<10000","value":65,"color":"#42d392","children":[]},{"name":"50000>人口数>10000","value":30,"color":"#e651af","children":[]},{"name":"人口数>50000","value":5,"color":"#fc9945","children":[]}]);
    const config3 :Ref<any>= ref({"responsive":false,"theme":"","customPalette":[],"useCssAnimation":true,"style":{"fontFamily":"inherit","chart":{"backgroundColor":"#ffffff00","color":"#1A1A1Aff","layout":{"plots":{"show":true,"radius":2},"outerPolygon":{"stroke":"#300303ff","strokeWidth":1},"dataPolygon":{"strokeWidth":1,"transparent":false,"opacity":20,"useGradient":true},"grid":{"show":true,"stroke":"#e1e5e8ff","strokeWidth":0.5,"graduations":5},"labels":{"dataLabels":{"show":true,"fontSize":23,"color":"#000000ff"}}},"title":{"text":"村落环境特征","color":"darkolivegreen","fontSize":20,"bold":true,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#A1A1A1ff","text":"","fontSize":16,"bold":false}},"tooltip":{"show":true,"color":"#1A1A1Aff","backgroundColor":"#FFFFFFff","fontSize":14,"customFormat":null,"borderRadius":4,"borderColor":"#e1e5e8","borderWidth":1,"backgroundOpacity":30,"position":"center","offsetY":24,"showValue":false,"showPercentage":false,"roundingValue":0,"roundingPercentage":0,"animation":{"show":true,"animationFrames":60}},"legend":{"show":true,"bold":true,"backgroundColor":"#ffffff00","color":"#1A1A1Aff","fontSize":16,"roundingPercentage":0}}},"table":{"show":false,"responsiveBreakpoint":400,"th":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none"},"td":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none","roundingValue":0,"roundingPercentage":0}},"userOptions":{"show":false,"position":"right","buttons":{"tooltip":true,"pdf":true,"csv":true,"img":true,"table":true,"labels":false,"fullscreen":true,"sort":false,"stack":false,"animation":false,"annotator":true},"buttonTitles":{"open":"Open options","close":"Close options","tooltip":"Toggle tooltip","pdf":"Download PDF","csv":"Download CSV","img":"Download PNG","table":"Toggle table","fullscreen":"Toggle fullscreen","annotator":"Toggle annotator"}},"translations":{"target":"Target","value":"Value","datapoint":"Datapoint"}})
    const config4 :Ref<any>= ref({
      theme: '',
      customPalette: [],
      style: {
        fontFamily: 'inherit',
        chart: {
          backgroundColor: '#e0e2cd',
          color: '#1A1A1Aff',
          zoom: {
            show: false,
          },
          layout: {
            height: 400,
            width: 600,
            padding: {
              top: 24,
              right: 48,
              bottom: 24,
              left: 40
            },
            grid: {
              show: true,
              stroke: '#ff5733ff',
              strokeWidth: 0.7,
              showVerticalLines: true,
              yAxis: {
                dataLabels: {
                  show: false,
                  fontSize: 14,
                  color: '#1A1A1Aff',
                  roundingValue: 0,
                  offsetX: 0,
                  bold: false,
                  steps: 10
                }
              },
              xAxis: {
                dataLabels: {
                  show: true,
                  values: [
                    '2017',
                    '2018',
                    '2019',
                    '2020',
                    '2021',
                    '2022',
                    '2023',
                    '2024'
                  ],
                  fontSize: 17,
                  showOnlyFirstAndLast: false,
                  color: '#1A1A1Aff',
                  rotation: 0,
                  offsetY: 0
                }
              }
            },
            line: {
              show: true,
              stroke: '#CCCCCCff',
              strokeWidth: 4
            },
            highlighter: {
              color: '#1A1A1Aff',
              opacity: 5
            },
            dataLabels: {
              show: false,
              fontSize: 12,
              color: '#1A1A1Aff',
              bold: true,
              rounding: 0,
              prefix: '',
              suffix: '',
              offsetY: 0,
              formatter: null
            }
          },
          title: {
            text: '人口数量特征',
            color: '#1A1A1Aff',
            fontSize: 20,
            bold: true,
            textAlign: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            subtitle: {
              color: '#A1A1A1ff',
              text: '',
              fontSize: 16,
              bold: false
            }
          },
          legend: {
            show: true,
            bold: false,
            backgroundColor: '#transparent',
            color: '#1A1A1Aff',
            fontSize: 16,
            roundingValue: 0,
            roundingPercentage: 0
          }
        }
      },
      userOptions: {
        show: true,
        showOnChartHover: false,
        keepStateOnChartLeave: true,
        position: 'right',
        buttons: {
          tooltip: false,
          pdf: false,
          csv: false,
          img: false,
          table: false,
          labels: false,
          fullscreen: true,
          sort: false,
          stack: false,
          animation: false,
          annotator: false
        },
        buttonTitles: {
          fullscreen: 'Toggle fullscreen',
        }
      },
      table: {
        show: false,
      }
    })
    const dataset3 :Ref<any>= ref({"categories":[{"name":"偏高","color":"#d80e0e"},{"name":"正常","color":"#25d083"},{"name":"偏低","color":"#6d41d2"}],"series":[{"name":"森林覆盖率","values":[50,45,5],"target":100},{"name":"水资源总量","values":[20,70,10],"target":100},{"name":"年均气温","values":[40,50,10],"target":100},{"name":"河网密度","values":[20,10,70],"target":100},{"name":"平均海拔","values":[0,50,50],"target":100}]});
    const dataset1 :Ref<any>= ref([{"name":"农业","values":[10,1,2,3,5,8,13,21],"color":"#6376DD"},{"name":"旅游产业","values":[8,12,13,25,31,42,1,9],"color":"#42d392"},{"name":"制造业","values":[12,15,2,8,16,12,19,13],"color":"#ff6400"}]);
    const config1 :Ref<any>= ref({"theme":"","customPalette":[],"style":{"fontFamily":"inherit","chart":{"backgroundColor":"#e0e2cd","color":"#1A1A1Aff","zoom":{"show":false,},"layout":{"height":400,"width":600,"padding":{"top":24,"right":12,"bottom":18,"left":40},"grid":{"show":true,"stroke":"#e60f0fff","strokeWidth":1.3,"showVerticalLines":true,"yAxis":{"dataLabels":{"show":true,"fontSize":30,"color":"#1A1A1Aff","roundingValue":0,"offsetX":0,"bold":true,"steps":10}},"xAxis":{"dataLabels":{"show":true,"values":["2017","2018","2019","2020","2021","2022","2023","2024"],"fontSize":20,"showOnlyFirstAndLast":true,"color":"#1A1A1Aff","rotation":0,"offsetY":0}}},"line":{"show":true,"stroke":"#CCCCCCff","strokeWidth":4},"highlighter":{"color":"#1a1a1aff","opacity":5},"dataLabels":{"show":false}},"title":{"text":"村落经济变化趋势","color":"darkolivegreen","fontSize":17,"bold":true,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#A1A1A1ff","text":"","fontSize":16,"bold":false}},"legend":{"show":true,"bold":false,"backgroundColor":"#ffffff00","color":"#1A1A1Aff","fontSize":16,"roundingValue":0,"roundingPercentage":0}}},"userOptions":{"show":true,"position":"left","buttons":{"tooltip":false,"pdf":false,"csv":false,"img":false,"table":false,"labels":false,"fullscreen":true,"sort":false,"stack":false,"animation":false,"annotator":false},"buttonTitles":{"open":"Open options","close":"Close options","pdf":"Download PDF","csv":"Download CSV","img":"Download PNG","table":"Toggle table","fullscreen":"Toggle fullscreen","annotator":"Toggle annotator"}},"table":{"show":false,"responsiveBreakpoint":396,"columnNames":{"period":"Period","total":"Total"},"th":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none"},"td":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none","roundingValue":0,"roundingPercentage":0}}})
    const config5 :Ref<any>= ref({
      "type": "classic",
      "responsive": false,
      "theme": "",
      "customPalette": [],
      "useCssAnimation": true,
      "useBlurOnHover": false,
      "userOptions": {
        "show": false,
        "position": "left",
        "buttons": {
          "tooltip": false,
          "pdf": false,
          "csv": false,
          "img": false,
          "table": false,
          "labels": false,
          "fullscreen": false,
          "sort": false,
          "stack": false,
          "animation": false,
          "annotator": false
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
          "annotator": "Toggle annotator"
        }
      },
      "translations": {
        "total": "Total",
        "average": "Average"
      },
      "style": {
        "fontFamily": "inherit",
        "chart": {
          "useGradient": true,
          "gradientIntensity": 40,
          "backgroundColor": "#ffffff00",
          "color": "#1A1A1Aff",
          "layout": {
            "labels": {
              "dataLabels": {
                "show": true,
                "useLabelSlots": false,
                "hideUnderValue": 3,
                "prefix": "",
                "suffix": ""
              },
              "value": {
                "rounding": 0,
                "show": false,
                "formatter": null
              },
              "percentage": {
                "color": "#1a1a1aff",
                "bold": true,
                "fontSize": 25,
                "rounding": 0,
                "formatter": null
              },
              "name": {
                "color": "#1A1A1Aff",
                "bold": false,
                "fontSize": 20
              },
              "hollow": {
                "show": false,
                "total": {
                  "show": false,
                  "bold": false,
                  "fontSize": 18,
                  "color": "#AAAAAAff",
                  "text": "",
                  "offsetY": 0,
                },
                "average": {
                  "show": false,
                }
              }
            },
            "donut": {
              "strokeWidth": 55,
              "borderWidth": 1,
              "useShadow": true,
              "shadowColor": "#1A1A1A"
            }
          },
          "legend": {
            "show": true,
            "bold": false,
            "backgroundColor": "#ffffff00",
            "color": "#1A1A1Aff",
            "fontSize": 16,
            "roundingValue": 0,
            "roundingPercentage": 0
          },
          "title": {
            "text": "居民主要收入来源",
            "color": "darkolivegreen",
            "fontSize": 17,
            "bold": true,
            "textAlign": "center",
            "paddingLeft": 0,
            "paddingRight": 0,
          }
        }
      }
    });
    const config6 :Ref<any>= ref({"responsive":false,"theme":"","customPalette":[],"useCssAnimation":true,"style":{"fontFamily":"inherit","chart":{"backgroundColor":"#e0e2cd","color":"#1A1A1Aff","layout":{"bars":{"sort":"desc","useStroke":false,"strokeWidth":2,"height":60,"gap":40,"borderRadius":4,"offsetX":64,"paddingRight":0,"useGradient":true,"gradientIntensity":20,"fillOpacity":"100","underlayerColor":"#FFFFFF","dataLabels":{"color":"#1A1A1Aff","bold":true,"fontSize":14,"value":{"show":true,"roundingValue":0,"prefix":"","suffix":"","formatter":null},"percentage":{"show":true,"roundingPercentage":0},"offsetX":0},"nameLabels":{"show":true,"color":"#1A1A1Aff","bold":false,"fontSize":20,"offsetX":0},"parentLabels":{"show":false,"color":"#1A1A1Aff","bold":false,"fontSize":19,"offsetX":0}},"highlighter":{"color":"red","opacity":5},"separators":{"show":false,"color":"#e1e5e8ff","strokeWidth":1}},"title":{"text":"人口年龄特征","color":"darkolivegreen","fontSize":17,"bold":true,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#A1A1A1ff","text":"","fontSize":16,"bold":false}},"legend":{"show":true,"bold":false,"backgroundColor":"transparent","color":"#1A1A1Aff","fontSize":15,"position":"bottom","roundingValue":0,"roundingPercentage":0,"prefix":"","suffix":""},"tooltip":{"show":false,"color":"#1a1a1aff","backgroundColor":"#ffffff00","fontSize":19,"customFormat":null,"borderRadius":4,"borderColor":"rgba(225, 229, 232, 1)","borderWidth":1,"backgroundOpacity":30,"position":"center","offsetY":24,"showValue":true,"showPercentage":true,"roundingValue":0,"roundingPercentage":0,"prefix":"","suffix":""}}},"userOptions":{"show":true,"position":"right","buttons":{"tooltip":false,"pdf":false,"csv":false,"img":false,"table":false,"labels":false,"fullscreen":true,"sort":false,"stack":false,"animation":false,"annotator":false},"buttonTitles":{"open":"Open options","close":"Close options","tooltip":"Toggle tooltip","pdf":"Download PDF","csv":"Download CSV","img":"Download PNG","table":"Toggle table","fullscreen":"Toggle fullscreen","sort":"Toggle sort","annotator":"Toggle annotator"}},"table":{"show":false,"responsiveBreakpoint":400,"th":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none"},"td":{"backgroundColor":"#FFFFFFff","color":"#1A1A1Aff","outline":"none","roundingValue":0,"roundingPercentage":0,"prefix":"","suffix":""}},"translations":{"parentName":"Group","childName":"Serie","value":"Value","percentageToTotal":"% / total","percentageToSerie":"% / group"}})
   const config7 :Ref<any>= ref({"theme":"","responsive":false,"customPalette":[],"useCssAnimation":true,"downsample":{"threshold":501},"chart":{"fontFamily":"inherit","backgroundColor":"#ffffff00","color":"#1a1a1aff","height":"374","width":"756","zoom":{"show":true,"color":"#000000ff","highlightColor":"rgba(74, 74, 74, 1)","fontSize":18,"useResetSlot":false,"minimap":{"show":false,"smooth":true,"selectedColor":"rgba(31, 119, 180, 1)","selectedColorOpacity":0.2,"lineColor":"rgba(26, 26, 26, 0)","selectionRadius":2,"indicatorColor":"#1A1A1A"}},"padding":{"top":38,"right":24,"bottom":48,"left":48},"highlighter":{"color":"#1A1A1Aff","opacity":5,"useLine":false,"lineDasharray":7,"lineWidth":1},"highlightArea":{"show":false,"from":0,"to":0,"color":"#1A1A1Aff","opacity":20,"caption":{"text":"Caption","fontSize":25,"color":"#1A1A1Aff","bold":false,"offsetY":0,"width":"auto","padding":3,"textAlign":"center"}},"timeTag":{"show":false,"backgroundColor":"#e1e5e8ff","color":"#1A1A1Aff","fontSize":21,"circleMarker":{"radius":5,"color":"#1A1A1Aff"}},"grid":{"stroke":"#030303ff","showVerticalLines":false,"showHorizontalLines":false,"position":"middle","frame":{"show":false,"stroke":"#E1E5E8ff","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","strokeDasharray":8},"labels":{"show":false,"color":"#1A1A1Aff","fontSize":30,"axis":{"yLabel":"当地经济","yLabelOffsetX":0,"xLabel":"","xLabelOffsetY":14,"fontSize":29},"zeroLine":{"show":true},"xAxis":{"showBaseline":true},"yAxis":{"showBaseline":true,"commonScaleSteps":10,"useIndividualScale":false,"stacked":false,"gap":12,"labelWidth":40,"formatter":null,"scaleMin":null,"scaleMax":null},"xAxisLabels":{"color":"#1A1A1Aff","show":true,"values":["2018","2019","2020","2021","2022","2023","2024"],"fontSize":18,"showOnlyFirstAndLast":false,"showOnlyAtModulo":false,"modulo":14,"yOffset":8,"rotation":0}}},"comments":{"show":true,"showInTooltip":true,"width":200,"offsetX":0,"offsetY":0},"labels":{"fontSize":28,"prefix":"","suffix":""},"legend":{"color":"#1A1A1Aff","show":true,"fontSize":17},"title":{"text":"村落经济变化趋势","color":"#1a1a1aff","fontSize":18,"bold":false,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#CCCCCCff","text":"   ","fontSize":16,"bold":false},"show":true},"tooltip":{"show":false,"color":"#1A1A1Aff","backgroundColor":"#FFFFFFff","fontSize":14,"customFormat":null,"borderRadius":4,"borderColor":"#e1e5e8","borderWidth":1,"backgroundOpacity":"68","position":"center","offsetY":24,"showValue":true,"showPercentage":false,"roundingValue":0,"roundingPercentage":0},"userOptions":{"show":false,"position":"right","buttons":{"tooltip":true,"pdf":true,"csv":true,"img":true,"table":true,"labels":true,"fullscreen":true,"sort":false,"stack":true,"animation":false,"annotator":true},"buttonTitles":{"open":"Open options","close":"Close options","tooltip":"Toggle tooltip","pdf":"Download PDF","csv":"Download CSV","img":"Download PNG","table":"Toggle table","labels":"Toggle labels","fullscreen":"Toggle fullscreen","stack":"Toggle stack mode","annotator":"Toggle annotator"}}},"bar":{"borderRadius":10,"useGradient":true,"periodGap":0.21000000000000008,"border":{"useSerieColor":false,"strokeWidth":6,"stroke":"#FFFFFFff"},"labels":{"show":true,"offsetY":-8,"rounding":0,"color":"#1A1A1Aff","formatter":null},"serieName":{"show":false,"offsetY":-6,"useAbbreviation":true,"abbreviationSize":6,"useSerieColor":true,"color":"#1A1A1Aff","bold":false}},"line":{"radius":6,"useGradient":true,"strokeWidth":2,"dot":{"useSerieColor":true,"fill":"#FFFFFF","strokeWidth":0.5},"labels":{"show":true,"offsetY":-8,"rounding":0,"color":"#1A1A1Aff","formatter":null},"area":{"useGradient":true,"opacity":20}},"plot":{"radius":6,"useGradient":true,"dot":{"useSerieColor":true,"fill":"#FFFFFF","strokeWidth":0.5},"labels":{"show":true,"offsetY":-8,"rounding":0,"color":"#1A1A1Aff","formatter":null}},"table":{"responsiveBreakpoint":400,"rounding":0,"sparkline":true,"showSum":true,"columnNames":{"period":"Period","total":"Total"},"th":{"backgroundColor":"#FAFAFAff","color":"#1a1a1aff","outline":""},"td":{"backgroundColor":"#FAFAFAff","color":"#1A1A1Aff","outline":""}},"showTable":false})
</script>
<template>
  <div class="container1" v-if="cityFlag">
    <h2>{{ cityName }}市传统村落基本特征</h2>
      <div class="disbasic">
          <div class="chars">
            <div class="chart-row" style="display: flex; justify-content: space-between; gap: 10px;">
              <div class="chart-container">
              <VueUiDonut :config="config" :dataset="dataset" />
              </div>
              <div class="chart-container">
              <VueUiVerticalBar :config="config2" :dataset="dataset2" />
            </div>
                </div>
            <div class="chart-row" style="display: flex; justify-content: space-between; gap: 10px;">
              <div class="chart-container">
                <VueUiDonutEvolution :config="config1" :dataset="dataset1" />
              </div>
              <div class="chart-container">
                <VueUiRadar :config="config3" :dataset="dataset3" />
              </div>
            </div>
          </div>  
      </div>
  </div>
<div class="container2" v-if="!flag">
  <h2>{{SideName}}</h2>
  <div class="disbasic">
    <div class="chars">
      <div class="chart-row" style="display: flex; justify-content: space-between; gap: 10px;">
        <div class="chart-container">
          <VueUiDonut :config="config5" :dataset="mainincomdata" />
        </div>
        <div class="chart-container">
          <VueUiVerticalBar :config="config6" :dataset="agedata" />
        </div>
      </div>
      <div class="chart-row" style="display: flex; justify-content: space-between; gap: 10px;">
        <div class="chart-container">
          <VueUiDonutEvolution :config="config4" :dataset="persondata" />
        </div>
        <div class="chart-container" style="width: 27%; flex: 1;">
          <VueUiXy :config="config7" :dataset="avincomedata" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.container1, .container2 {
  margin-top: 85px;
  margin-left: 5px;
  width: 30vw;
  background-color: transparent;
}
h2 {
  text-align: center;
  height: 5vh;
  margin-top: 20px;
}
h3 {
  color: darkolivegreen;
  text-align: center;
}
.chars {
  width: 30vw;
  margin-top: 40px;
}

/* 新增的样式 */
.chart-row {
  height: 45vh;
}

.chart-container {
  flex: 1;
  height: 100%;
}

/* 针对特殊宽度的图表容器 */
.chart-container[style*="width: 27%"] {
  flex: none;
  width: 27%;
}
.chart-container{
  flex: 1;
  width: 20%;
}
</style>
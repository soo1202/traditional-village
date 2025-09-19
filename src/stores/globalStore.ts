import { defineStore } from 'pinia';
import {VueUiXyDatasetItem} from "vue-data-ui";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        cityName: '',//市名字
        SideName: '',
        flag: true, // 共享变量,用于点击中间的村落之后进行，右侧的表格数据变化
        cityFlag: false,// 共享变量，用于点击中间市的时候，右侧市的图表数据变化
        villageName: '',// 村落名称
        mainincomdata: [{
            name: '务农',
            values: [
                34
            ],
            color: '#1f77b4'
        },
            {
                name: '外出打工',
                values: [
                    34
                ],
                color: '#aec7e8'
            },
            {
                name: '其他',
                values: [
                    17
                ],
                color: '#ff7f0e'
            },
            {
                name: '经商',
                values: [
                    14
                ],
                color: '#42d392'
            }],// 村子主要收入来源数据
        agedata: [{"name":"年龄<30","value":30,"color":"#42d392","children":[]},{"name":"30<年龄<70","value":25,"color":"#e651af","children":[]},{"name":"年龄>70","value":45,"color":"#fc9945","children":[]}],// 村子人员年龄数据
        persondata: [ {
            name: '男性',
            values: [
                50,
                149,
                180,
                400,
                190,
                150,
                130,
                21
            ],
            color: '#6376DD'
        },
            {
                name: '女性',
                values: [
                    90,
                    50,
                    200,
                    250,
                    210,
                    200,
                    250,
                    130
                ],
                color: '#ff6400'
            }],// 村子人员数据
        basictext:'',
        basicimg:'',
        featuretext:'',
        featureimg1:'',
        featureimg2:'',
        ecodevtext:'',
        ecodevimg:'',
        avincomedata: [{"name":"居民可支配收入","series":[1,2,3,3.2,4,8,8.2],"color":"#dd6464","type":"line","shape":"circle","useArea":false,"useProgression":false,"dataLabels":false,"smooth":false,"dashed":false,"useTag":"none"}]as VueUiXyDatasetItem[],// 村子平均收入来源数据
    }),
    actions: {
        changeFlag() {
            this.flag = !this.flag;
        },
    }
});

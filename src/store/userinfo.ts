import { defineStore } from "pinia";

export const useUserStore = defineStore('storeId',{
    state: () => {
        return {
            userInf:{
                account: '',
                password:''
            },
            token: ""
        }
    },
    getters:{
        getToken(state){
            return state.token || window.localStorage.setItem("token","vlaue") || "";
        }
    },
    actions: {
        //修改account
        onchangeOccount(val : string) {
            this.userInf.account = val;
        },
        //修改token并存入localStorage
        onchangeToken(val : string){
            this.token = val;
            window.localStorage.setItem("token", JSON.stringify(val));
        }
    },
    //开启数据缓存
    persist:{
        enabled:true,
        //默认是session，下面配置是保存在localStorage
        strategies:[{
            key:'token',
            storage:localStorage
        }]
    }
})


<template>
    <div class="h-6" />
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="compChange('InfoEntry')">信息录入</el-menu-item>
          <el-menu-item index="2" @click="compChange('LocalQuery')">本地查询</el-menu-item>
          <el-menu-item index="3" @click="compChange('CrossChainQuery')" >跨链查询</el-menu-item>
          <el-menu-item index="4" @click="compChange('LocalUpdate')" >修改信息</el-menu-item>
        </el-menu>
     <div class="content">
        <component :is="currentComp"</component>
     </div>   
</template>
<script>
import { ref } from 'vue'
import LocalQuery from './LocalQuery.vue'
import CrossChainQuery from './CrossChainQuery.vue'
import InfoEntry from './InfoEntry.vue'
import LocalUpdate from './LocalUpdate.vue'
    export default {
    components:{//玛德，少写个s，半天没有反应
        LocalQuery,
        CrossChainQuery,
        InfoEntry,
        LocalUpdate
    },
    setup(){
        let currentComp=ref('InfoEntry')
        const compChange=(compName)=>{
            currentComp.value=compName
        }
        return{
            currentComp,
            compChange
        }
    },
      data(){
        return{
            activeIndex:'1'
        }
      },
      methods:{
        insert(name){
            
        }
      }
    }
</script>
<style>
/* .content{
   height: 600px; 
   margin-left: 30%;
} */
</style>
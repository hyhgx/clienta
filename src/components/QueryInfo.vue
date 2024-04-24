<template>
    <h3>信息查询</h3>
    <el-form :rules="rules" :model="queryDataForm" ref="queryDataForm" label-width="200px" class="queryform">
      <el-form-item label="请输入查询身份证号:" prop="id">
          <el-input v-model.id="queryDataForm.id" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button :disabled="isdisabled" class="queryButton" type="primary" @click="queryRequest('queryDataForm')">查询</el-button>
        <el-button class="cancelButton" @click="setResultNull()">清空</el-button>
      </el-form-item>
      <el-form-item label="查询结果:">
        <el-input class="queryresult" v-model="queryDataForm.results" autocomplete="off" type="textarea"
         :rows="6" placeholder="查询结果..."></el-input>
      </el-form-item>
    </el-form>

</template>
<script>
import axios from "axios"
export default{
    data(){
        return { 
          isdisabled:false,
            queryDataForm:{
                id:'',
                results:''
            },
            rules:{
              id:[{required:true,message:'id不能为空'}]
            }
          }
    },
    methods:{
      queryRequest(formName){
        this.$refs[formName].validate((valid) =>{
          if(valid){
            console.log('a发送消息')
            this.isdisabled=true;
            var s=JSON.stringify(this.queryDataForm);
            var data={
              type:'pcrosschainquery',
              // type:'query',
              info:s
            };
            axios.post('/api',data).then((response)=>{
              this.queryDataForm.results=JSON.stringify(response.data);
              this.isdisabled=false;
            })
          }else{
            console.log('err query')
          }
        })
      },
      setResultNull(){
        this.queryDataForm.results='';
      }
    }
}
</script>
<style>
.queryform{
    width: 600px;
}
</style>

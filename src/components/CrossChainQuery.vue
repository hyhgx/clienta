<template>
  <div style="float: left;">
      <h3>跨链信息查询</h3>
      <el-form :rules="rules" :model="queryDataForm" ref="queryDataForm" label-width="200px" class="queryform">
        <el-form-item label="请输入查询身份证号:" prop="id">
            <el-input v-model.id="queryDataForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入查询姓名:" prop="name">
            <el-input v-model.name="queryDataForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入查询性别:" prop="sex">
          <el-input v-model.name="queryDataForm.sex" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请输入查询年龄:" prop="age">
        <el-input v-model.name="queryDataForm.age" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="请输入查询社区:" prop="community">
        <el-input v-model.name="queryDataForm.community" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item>
          <el-button :disabled="isdisabled" class="queryButton" type="primary" @click="queryRequest('queryDataForm')">查询</el-button>
          <el-button class="setNullButton" @click="setResultNull('queryDataForm')">重置</el-button>
        </el-form-item>
        <!-- <el-form-item label="查询结果:">
          <el-input class="queryresult" v-model="queryDataForm.results" autocomplete="off" type="textarea"
           :rows="6" placeholder="查询结果..."></el-input>
        </el-form-item> -->
      </el-form>
  </div>
      <div class="resultTable">
          <h3>查询结果</h3>
          <el-table class="table" :data="tableData" style="height: 300px;">
              <el-table-column type="expand" fixed>
                <template #default="props">
                  <div m="3" style="margin-left: 10%;">
                    <p m="t-0 b-2">性别: {{ props.row.sex }}</p>
                    <p m="t-0 b-2">年龄: {{ props.row.age }}</p>
                    <p m="t-0 b-2">社区: {{ props.row.community }}</p>
                    <p m="t-0 b-2">健康史: {{ props.row.healthCase }}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="身份证号" prop="identity" width="500px"/>
              <el-table-column label="姓名" prop="name" />
            </el-table> 
      </div>
  </template>
  <script>
  import axios from "axios"
  export default{
      data(){
          return { 
              tableData:[],
              isdisabled:false,
              queryDataForm:{
                  id:'',
                  name:'',
                  age:'',
                  sex:'',
                  community:''
              },
              rules:{
                // id:[{required:true,message:'id不能为空'}]
              //   name:[{required:true,message:'name不能为空'}]
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
                info:s
              };
              axios.post('/api',data).then((response)=>{
              this.tableData=response.data
              this.isdisabled=false
              })
            }else{
              console.log('err query')
            }
          })
        },
        setResultNull(formName){
          this.$refs[formName].resetFields();
          this.tableData=[];
        }
      }
  }
  </script>
  <style scoped>
  .queryform{
      width: 600px;
  }
  .queryresult{
      width: 500px;
  }
  .resultTable{
      float: left;
      margin-left: 20px;
  }
  .table{
      width:100%;
      /* border:1px solid #666;  */
  }
  </style>
  
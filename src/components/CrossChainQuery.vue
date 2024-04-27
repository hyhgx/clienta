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
            <label>总计：{{count}}</label>
            <label style="margin-left:30%;">数据导入本地：</label>
            <el-input style="width: 200px;" v-model.loginId="loginId" autocomplete="off"></el-input>
            <el-button :disabled="isdisabled1" class="loginButton"  @click="loginRequest">导入</el-button>
      </div>
  </template>
  <script>
  import axios from "axios"
  export default{
      data(){
          return { 
              loginId:'',
              count:0,
              tableData:[],
              isdisabled:false,
              isdisabled1:false,
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
              this.count=response.data.length
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
          this.count=0;
          this.loginId='';
        },
        loginRequest(){
          let flag=false;
          let logindata;
          console.log(this.loginId)
          for(let item of this.tableData){
            if(item.identity==this.loginId){
              flag=true;
              logindata=item;
              console.log(item)
            }
          }
          if(flag==false){
            alert('请输入上表存在的用户!')
          }else{
            this.isdisabled1=true;
            let s=JSON.stringify(logindata);
            let data={
              type:'insert',
              info:s
            };
            axios.post('/api',data).then(response => {
              if(response.data=='保存成功!')
                {
                  alert('导入成功!')
              }else{
                  alert(response.data)
              }
              this.isdisabled1=false;
            }).catch(function (error) { // 请求失败处理
                console.log(error);
            });    
          }
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
  
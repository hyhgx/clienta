<template>
    <div>
    <div style="float: left;">
        <h3>本地信息修改</h3>
        <el-form :rules="rules" :model="previewDataForm" ref="previewDataForm" label-width="200px" class="previewform">
          <el-form-item label="预修改用户身份证号:" prop="id">
              <el-input v-model.id="previewDataForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isdisabled" class="queryButton" type="primary" @click="previewRequest('previewDataForm')">预览</el-button>
        </el-form-item>
        </el-form>
        <h3>输入修改信息</h3>
    <el-form :rules="rules" :model="updateDataForm" ref="updateDataForm" label-width="200px" class="updateform">
          <el-form-item label="修改姓名:" prop="name">
              <el-input v-model.name="updateDataForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="修改性别:" prop="sex">
            <el-input v-model.name="updateDataForm.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改年龄:" prop="age">
          <el-input v-model.name="updateDataForm.age" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="修改社区:" prop="community">
          <el-input v-model.name="updateDataForm.community" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="修改健康史:">
        <el-input class="healthtext" v-model="updateDataForm.healthCase" autocomplete="off" type="textarea"
         :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
          <el-form-item>
            <el-button :disabled="isdisabled" class="updateButton" type="primary" @click="updateRequest('updateDataForm')">确认修改</el-button>
            <el-button class="setNullButton" @click="setResultNull('updateDataForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="previewTable">
        <h3>预览表</h3>
        <el-table class="previewtable" :data="previewtableData"  style="height: 200px;">
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
          <h3>修改结果</h3>
        <el-table class="resulttableData" :data="resulttableData" style="height: 200px;">
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
    </div> 
    
</template>
<script>
import axios from "axios"
    export default{
        data(){
            return { 
                currentID:'',
                previewtableData:[],
                resulttableData:[],
                isdisabled:false,
                updateDataForm:{
                    id:'',
                    name:'',
                    age:'',
                    sex:'',
                    community:'',
                    healthCase:''
                },
                previewDataForm:{
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
            previewRequest(formName){
            this.$refs[formName].validate((valid) =>{
              if(valid){
                this.currentID=this.previewDataForm.id;
                console.log('a发送消息')
                this.isdisabled=true;
                var s=JSON.stringify(this.previewDataForm);
                var data={
                  type:'localquery',
                  info:s
                };
                axios.post('/api',data).then((response)=>{
                //   this.queryDataForm.results=JSON.stringify(response.data);
                console.log(response.data)
                this.previewtableData=response.data
                this.isdisabled=false
                })
              }else{
                console.log('err query')
              }
            })
          },
          updateRequest(formName){
            this.$refs[formName].validate((valid) =>{
              if(valid){
                if(this.previewDataForm.id==''){
                    alert('请输入预修改用户ID');
                }else{
                    console.log('a发送消息')
                    this.isdisabled=true;
                    this.updateDataForm.id=this.currentID;
                    var s=JSON.stringify(this.updateDataForm);
                    var data={
                    type:'update',
                    info:s
                    };
                    axios.post('/api',data).then((response)=>{
                //   this.queryDataForm.results=JSON.stringify(response.data);
                    console.log(response.data)
                    this.resulttableData=response.data
                    this.isdisabled=false
                    })                  
                } 
              }else{
                console.log('err query')
              }
            })
          }
          ,
          setResultNull(formName){
            this.$refs[formName].resetFields();
            this.resulttableData=[];
            this.previewtableData=[];
            this.previewDataForm.id='';
          }
        }
    }
    </script>
    <style scoped>
    .previewform{
        width: 600px;
    }
    .updateform{
        width: 600px;
    }
    /* .queryresult{
        width: 500px;
    } */
    .previewTable{
        float: right;
    }
    .table{
        width:100%;
        /* border:1px solid #666;  */
    }
    </style>
    
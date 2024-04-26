<template>
  <div style="margin-left: 30%;">
    <h3>基本信息录入:</h3>
    <el-form :rules="rules" :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="身份证号:" prop="identity">
            <el-input v-model.identity="numberValidateForm.identity" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model.name="numberValidateForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
            <el-input v-model.age="numberValidateForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" >
            <el-radio v-model.sex="numberValidateForm.sex" label="男">男</el-radio>
            <el-radio v-model.sex="numberValidateForm.sex" label="女">女</el-radio>
          </el-form-item>
        <el-form-item label="居住社区:" prop="community">
            <el-input v-model.community="numberValidateForm.community" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="健康史:">
            <el-input class="healthtext" v-model="numberValidateForm.healthCase" autocomplete="off" type="textarea"
             :rows="4" placeholder="请输入内容"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button class="submitButton" type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button class="resetButton" @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import axios from "axios"
export default{
    data() {
      return {
        queryDataForm:{
          id:''
        },
        numberValidateForm: {
          age: '',
          name:'',
          sex:'男',
          identity:'',
          community:'',
          healthCase:''
        },
        rules:{
            // identity:[{pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,message:"身份证号错误"}],
            name:[{required:true,message:'姓名不能为空'},{pattern:/^[\u0391-\uFFE5A-Za-z]+$/,message:'姓名不能为非字符'}],
            age:[{ required: true, message: '年龄不能为空'},
            { pattern:/^[1-9]\d*$/, message: '年龄必须为数字?'}],
        }
    }
      },methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('a发送消息')
            var s=JSON.stringify(this.numberValidateForm);
            var data={
              type:'insert',
              info:s
            };
            axios.post('/api',data).then(response => {
                alert(response.data)
              }).catch(function (error) { // 请求失败处理
                console.log(error);
              });     
          } else {
              console.log('error submit!!');
            return false;
            }
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.numberValidateForm.healthCase='';
        this.numberValidateForm.sex='男';
      }
    }
}
</script>
<style scoped>
.demo-ruleForm{
    width: 400px;
}
.healthtext{
    overflow-y: scroll;
}
.submitButton {
    margin-left: 30%;
    margin-top: 5%;
}
.resetButton{
    margin-top: 5%;
}
</style>
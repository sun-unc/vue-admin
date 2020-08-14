<template>
  <div id="login">
      <div class="login-wrap">
          <ul class="menu-tab">
              <li v-for="(item, index) in menuTab" 
                  :key="item.id" 
                  :class="{'current-login': currentIndex == index}" 
                  @click="toggleTab(index)">{{item}}
              </li>
          </ul>
      </div>
      <div class="input-tab">       
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="login-form">
              <el-form-item label="邮箱:" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" size="medium" minlength="6" maxlength="20"></el-input>
              </el-form-item>

              <el-form-item label="确认密码:" prop="password" v-if="currentIndex != 0">
              <el-input type="text" v-model="ruleForm.confirm_password" autocomplete="off" size="medium" minlength="6" maxlength="20"></el-input>
              </el-form-item>


              <el-form-item label="验证码:" prop="code">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-input v-model.number="ruleForm.code" size="medium"></el-input>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content login-yzm">
                     <el-button type="success" size="medium">获取验证码</el-button>
                  </div>
                </el-col>
              </el-row>
              
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" size="medium" class="login-submit">登录</el-button>
            </el-form-item>
          </el-form>
      </div>
      
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
      var code = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateUsername = (rule, value, callback) => {
        var reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if( !reg .test(value)) {
          callback(new Error("邮箱格式错误!请重新输入"))
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      var validateConfirmPassword = (rule, value, callback) => {
        if (this.ruleForm.password != value || value == '') {
          callback(new Error("两次输入密码不一致!请重新输入"))
        } else {
          callback();
        }
      }
      return {
        currentIndex: 0,
        menuTab: ["登录", "注册"],
        ruleForm: {
          username: '',
          password: '',
          code: '',
          confirm_password: ''
          
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
          confirm_password: [
            { validator: validateConfirmPassword, trigger: 'blur' }
          ]
        
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toggleTab(index) {
      return this.currentIndex = index;
      }
    }
  }
</script>

<style lang="scss">
body {
  height: 100vh;
  overflow: hidden;
  background-color: rgb(40, 41, 40);
}
#login {
  margin-top: 100px;
  border: 2px solid rgb(248, 91, 201);
  
}
.login-wrap {
    width: 330px;
    margin: auto;
}
.menu-tab {
    text-align: center;
    list-style: none;
    li {
        display: inline-block;
        margin: 0 10px;
        width: 70px;
        line-height: 36px;
        // border: 1px solid #ccc;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
        color: rgb(203, 54, 233);
    }
}
.current-login {
  background-color: rgb(130, 255, 130);
  border: 2px solid rgb(71, 108, 233);
}
.login-form {
  label {
  color: #fff;
  font-size: 16px;
  }
}
.input-tab {
  width: 330px;
  margin: auto;
}

.login-yzm {
  margin-left: 10px;
}
.login-submit {
  width: 100%;
}
</style>

<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="item.id"
          :class="{ 'current-login': currentIndex === index }"
          @click="toggleTab(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="input-tab">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="邮箱:" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            size="medium"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          type="password"
          label="确认密码:"
          prop="confirm_password"
          v-if="currentIndex != 0"
        >
          <el-input
            type="password"
            v-model="ruleForm.confirm_password"
            autocomplete="off"
            size="medium"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码:" prop="code">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-input
                  v-model="ruleForm.code"
                  size="medium"
                  maxlength="6"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content login-yzm">
                <el-button
                  type="success"
                  size="medium"
                  @click="getSmss()"
                  :disabled="codeStatus"
                  >{{ codeText }}</el-button
                >
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            size="medium"
            class="login-submit"
            :disabled="buttonStatus"
            >{{ currentIndex === 0 ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "@vue/composition-api";
import { getSms, regist, login } from "api/login";
import sha1 from "js-sha1";
export default {
  name: "Login",
  setup(props, context) {
    // console.log(context, '-------');
    //这里放data数据,生命周期,自定义函数
    var code = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
        //   if (value < 18) {
        //     callback(new Error("必须年满18岁"));
        //   } else {
        //     callback();
        //   }
        // }
      }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("邮箱格式错误!请重新输入"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var validateConfirmPassword = (rule, value, callback) => {
      if (ruleForm.password !== value) {
        callback(new Error("两次输入密码不一致!请重新输入"));
      } else {
        callback();
      }
    };

    const ruleForm = reactive({
      username: "",
      password: "",
      code: "",
      confirm_password: "",
    });

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
      confirm_password: [
        { validator: validateConfirmPassword, trigger: "blur" },
      ],
    });

    //声明单一对象时使用reactive
    const menuTab = reactive(["登录", "注册"]);
    //声明基础数据类型变量时使用ref
    const currentIndex = ref(0);
    //按钮状态
    const buttonStatus = ref(true);
    //验证码状态
    const codeStatus = ref(false);
    //接收到的验证码
    const receiverCode = ref("");
    //倒计时
    const countDown = ref(20);
    const timer = ref(null);
    //
    const codeText = ref("获取验证码");
    // const login_status = computed(() => {
    //   return currentIndex.value === 0 ? "登录" : "注册";
    // });
    const toggleTab = (index) => {
      if (timer.value) {
        clearInterval(timer.value);
      }
      currentIndex.value = index;
      // 重置表单
      context.refs.loginForm.resetFields();
      //重置验证码
      ruleForm.code = "";
      ruleForm.confirm_password = "";
      codeText.value = "获取验证码";
      //重置验证码按钮状态
      codeStatus.value = false;
      // 重置验证码获取等待时间
      countDown.value = 20;
    };

    //获取验证码
    const getSmss = () => {
      var reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      const submitInfo = {
        username: ruleForm.username,
        module: currentIndex.value === 0 ? "login" : "regist",
      };
      if (ruleForm.username == "" || !reg.test(ruleForm.username)) {
        context.root.$message.error("邮箱格式错误");
        return false;
      } else if (ruleForm.password == "") {
        context.root.$message.error("密码不能为空");
        return false;
      } else {
        console.log(buttonStatus);
        buttonStatus.value = false;
        codeStatus.value = true;
        codeText.value = "发送中...";

        //验证码延迟1秒钟
        setTimeout(() => {
          getSms(submitInfo)
            .then((res) => {
              receiverCode.value = res.data.message.substring(11);
              // console.log(receiverCode.value);
              // element-ui的message提示组件
              context.root.$message({
                message: "验证码发送成功!",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
          timer.value = setInterval(() => {
            countDown.value--;
            codeText.value = `剩余 ${countDown.value} 秒`;
            if (countDown.value < 1) {
              codeText.value = "重新发送";
              countDown.value = 20;
              codeStatus.value = false;
              clearInterval(timer.value);
              return;
            }
          }, 1000);
        }, 1000);
      }
    };

    //  提交表单
    const submitForm = () => {
      //注册模块
      if (receiverCode.value === ruleForm.code && currentIndex.value !== 0) {
        let registData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code,
        };
        regist(registData)
          .then((res) => {
            context.root.$message({
              message: "注册成功!",
              type: "success",
            });

            context.root.$message("正在跳转登录页面...");
            //延迟一秒跳转到登录页面
            setTimeout(() => {
              toggleTab(0);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        receiverCode.value === ruleForm.code &&
        currentIndex.value === 0
      ) {
        // 登录模块
        let loginData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code,
        };
        login(loginData)
          .then((res) => {
            context.root.$message({
              message: "登录成功",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        context.root.$message.error("验证码错误");
        return false;
      }
    };

    //这里一定要return出去
    return {
      currentIndex,
      buttonStatus,
      codeStatus,
      receiverCode,
      countDown,
      timer,
      codeText,
      ruleForm,
      rules,
      menuTab,
      toggleTab,
      submitForm,
      getSmss,
    };
  },
};
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

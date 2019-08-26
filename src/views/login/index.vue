<template>
  <div id="main">
    <div class="wrapper"></div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="ruleForm"
      :label-position="labelPosition"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" class="logininput" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" class="logininput" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="bt_login_item">
        <el-button type="primary" class="bt_login" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      labelPosition: "left",
      ruleForm: {
        username: "shinobu",
        password: "123"
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.login
            .login({
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(res => {
              let data = res.data;
              this.$cookie.set("u_username", data.data[0].u_username, {
                expires: 7
              });
              this.$cookie.set("u_avatar", data.data[0].u_avatar, {
                expires: 7
              });
              this.$cookie.set("u_email", data.data[0].u_email, {
                expires: 7
              });
              this.$cookie.set("u_id", data.data[0].u_id, {
                expires: 7
              });
              this.$cookie.set("token", data.token, {
                expires: 7
              });
              //将用户id保存到vuex中
              this.$store.commit("SETUSERID", data.data[0].u_id);
              //将用户token保存到vuex中
              this.$store.commit("LOGIN", data.token);
              this.$router.push("/backstage/statics");
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-image: url("../../assets/login/bglogin.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
  }
  .ruleForm {
    padding: 50px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    color: #fff;
    z-index: 3;
    .bt_login {
      width: 100%;
    }
  }
}
</style>

<style lang="less">
.ruleForm {
  .el-form-item__label {
    color: #a0bedc !important;
  }
  .logininput {
    .el-input__inner {
      background-color: transparent !important;
      color: #a0bedc !important;
    }
  }

  .bt_login_item {
    .el-form-item__content {
      margin: 0 !important;
    }
    .el-button--primary {
      color: #dadada !important;
      background-color: #7f7c74 !important;
      border-color: #dcdfe6 !important;
      &:hover {
        background-color: #1e1b2f !important;
        border-color: #dcdfe6 !important;
      }
    }
  }
}
</style>
<script setup>
import { useUserStore } from '@/stores/modules/user'

const title = import.meta.env.VITE_APP_TITLE
const useUser = useUserStore()
function doLogin() {
  const usernameEl = document.getElementById('username')
  const passwordEl = document.getElementById('password')
  const formData = {
    username: usernameEl.value,
    password: passwordEl.value,
  }
  useUser.doLogin(formData)
}
</script>

<template>
  <div class="container-login">
    <div class="login-wrapper">
      <div class="header">
        {{ title }}
      </div>
      <div class="form-wrapper">
        <input id="username" type="text" name="username" value="admin" placeholder="username" class="input-item">
        <input id="password" type="password" name="password" value="123456" placeholder="password" class="input-item">
        <div class="btn cursor-pointer" @click="doLogin">
          登录
        </div>
      </div>
      <div class="msg">
        没有账号?
        <a href="#">去注册</a>
      </div>
      <div class="msg">
        账号：admin 密码：123456
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-login {
    height: 100%;
    background-color: antiquewhite;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.login-wrapper {
    background-color: #fff;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item:placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
    color: #fff;
}

.msg {
    text-align: center;
    line-height: 88px;
}

a {
    text-decoration-line: none;
    color: #abc1ee;
}
</style>

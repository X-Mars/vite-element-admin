<template>
  <el-form ref="ruleForm" :model="formState" :rules="rules" label-width="0" status-icon class="login-ruleForm">
    <el-form-item prop="account">
      <el-input
        ref="account"
        v-model="formState.account"
        class="h40"
        name="account"
        placeholder="请输入账号"
        :clearable="true"
        tabindex="1"
        type="text"
        maxlength="100"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        ref="password"
        v-model="formState.password"
        class="h40"
        show-password
        name="password"
        placeholder="请输入密码"
        :clearable="true"
        tabindex="2"
        maxlength="16"
        type="password"
        autocomplete="off"
        @keyup.enter="loginHandle"
      />
    </el-form-item>

    <el-form-item v-if="showCaptcha" prop="verifyCode">
      <div style="position: relative">
        <div class="code-inp">
          <el-input
            ref="captcha"
            v-model="formState.verifyCode"
            class="h40"
            type="text"
            name="captcha"
            placeholder="请输入校验码"
            :clearable="true"
            tabindex="3"
            maxlength="6"
            autocomplete="off"
            @keyup.enter="loginHandle"
          />
        </div>
        <div class="code">
          <img :src="captchaImg" alt="" @click="updateImage" />
        </div>
      </div>
    </el-form-item>

    <el-form-item style="margin-bottom: 0">
      <el-button
        class="h40"
        :loading="loading"
        :disabled="disabledLogin"
        type="primary"
        style="width: 100%"
        @click.prevent="loginHandle"
      >
        登录
      </el-button>

      <!-- <el-link
        type="primary"
        :underline="false"
        :loading="loading"
        class=""
        style="width: 100%; margin: 15px"
        @click.prevent="freeLogin"
      >
        免登录
      </el-link> -->
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onBeforeMount, reactive, computed } from 'vue'
import { login, getCaptcha } from '@/api/user'
import { useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const ruleForm = ref()
const trigger = ['blur', 'change']
const formState = reactive( {
  country : '86',
  verifyCode : '',
  verifyCodeKey : '',
  username : 'admin',
  password : 'admin9527'
} )
const rules = {
  account : [{ required : true, message : '请输入手机或邮箱账号', trigger }],
  password : [{ required : true, message : '请输入密码', trigger }],
  verifyCode : [{ required : true, message : '请输入校验码', trigger }]
}
const bindToken = ref( '' )
const showCaptcha = ref( true )
const captchaImg = ref( '' )
const captchaId = ref( '' )
const loading = ref( false )

const disabledLogin = computed( () => {
  const { verifyCode, account, password } = formState
  if ( showCaptcha.value ) {
    return !verifyCode || !account || !password
  } else {
    return !account || !password
  }
} )

onBeforeMount( () => {
  getQueryParams()
  updateImage()
} )

function getQueryParams() {
  const query = route.query
  // 微信 登录
  bindToken.value = query.bindToken || ''
}

// 图片验证码
async function updateImage() {
  try {
    const { data } = await getCaptcha()
    console.log( 'data', data )
    const { verifyCodeBase64, verifyCodeKey } = data
    captchaImg.value = verifyCodeBase64
    // captchaId.value = verifyCodeKey
    formState.verifyCodeKey = verifyCodeKey
    // if ( code == 200 ) {
    //   const { captchaId, bs64 } = data
    //   captchaImg.value = bs64
    //   captchaId.value = captchaId
    // }
  } catch ( e ) {
    console.error( e )
    captchaImg.value = ''
    captchaId.value = ''
  }
}

// async function freeLogin() {
//   loading.value = true
//   try {
//     const token = 'token'
//     userStore.SET_TOKEN( token )
//     router.push( '/' )
//   } catch ( e ) {
//   } finally {
//     loading.value = false
//   }
// }

function loginHandle() {
  loading.value = true
  ruleForm.value.validate( async valid => {
    if ( valid ) {
      try {
        // const params = {
        //   username : formState.account,
        //   password : formState.password
        // }
        const params = {
          username : formState.username,
          password : formState.password,
          verifyCode : formState.verifyCode,
          verifyCodeKey : formState.verifyCodeKey
        }
        console.log( 'params', params )
        // if ( showCaptcha.value ) {
        //   params.captchaId = captchaId.value
        //   params.captchaValue = formState.verifyCode
        // }
        const { data } = await login( params )
        console.log( 'loginHandle', data )
        const { access } = data
        userStore.SET_TOKEN( access )
        router.push( '/' )
      } catch ( e ) {
      } finally {
        loading.value = false
        if ( showCaptcha.value ) {
          await updateImage()
        }
      }
    }
  } )
}

defineOptions( {
  name : 'LoginPwd'
} )
</script>

<style lang="scss" scoped>
.code-inp {
  width: calc(100% - 125px);
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.code {
  display: inline-block;
  height: 40px;
  width: 110px;
  cursor: pointer;
  vertical-align: middle;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  &:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>

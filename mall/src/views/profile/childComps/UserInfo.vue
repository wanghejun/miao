<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="privateImage-svg left">
          <img src="~assets/img/category/登陆.png" class="userPhoto">
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img class="icon-mobile" src="~assets/img/category/phone.png"/>
          </span>
          <slot name="user-phone"><span class="phone-num">暂无绑定手机号</span></slot>
        </div>
      </div>
      <img  class="arrow-svg right" src="~assets/img/category/right.png"/>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: #e197a3;
    padding: 15px;
    margin-top: -5px;
    overflow: hidden;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
  .login-info.left{
    width: 100px;
  }
  .left {
    float: left;
    margin-bottom: 10px;
  }
  .userPhoto{
    width: 60px;
    height: 60px;
  }


  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
  .phone-num{
    display: inline-block;
    margin-top: 3px;
  }

  .right{
    float:right;
  }
</style>

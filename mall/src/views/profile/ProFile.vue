<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">Demo商城</div>
    </nav-bar>

    <UserInfo></UserInfo>
    <Balance />

    <list-view :list-data="orderList" class="order-list" />
    <list-view :list-data="serviceList" class="service-list" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

import ListView from "./childComps/ListView";
import UserInfo from "./childComps/UserInfo";
import Balance from './childComps/Balance'

export default {
  name: "Profile",
  components: {
    ListView,
    UserInfo,
    NavBar,
    Balance
  },
  data() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" },
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: #e197a3;
  font-weight: 700;
  color: #fff;
}
.profile {
  background-color: #f2f2f2;
}
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>

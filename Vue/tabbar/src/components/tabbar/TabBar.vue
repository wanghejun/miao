<template>
    <div class="tabbar">
      <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style>
  .tabbar{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .1);
  }
</style>

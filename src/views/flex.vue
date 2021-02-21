<template>
  <div class="container">
    <ul class="box">
      <li class="item" v-for="(item,index) in 31" :key="index">
        <img v-if="item%3==0" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600924345133&di=9e6c58324d7a916edf6a9be9d406b89f&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D3616242789%2C1098670747%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D900%26h%3D1350" alt="">
        <img v-else-if="item%3==1" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600924458180&di=76018fcd37c823be45b96b6e940d05cd&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D1505174706%2C1304149937%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D854" alt="">
        <img v-else src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600924789449&di=e9ae0385611bd9a2ccfef2aa69e82e8d&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D1289087652%2C1294589104%26fm%3D79%26app%3D86%26f%3DPNG%3Fw%3D1280%26h%3D1077" alt="">
        <p class="index">{{item}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    imgList: []
  }),
}
</script>

<style lang="less" scoped>
.index {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  top: 0;
  left: 0;
}
// 方法一 flex布局 缺点 竖向的，超出有问题
// .box {
//   flex-flow: column wrap;
//   height: 100vh;
//   display: flex;
//   .item {
//     padding: 10px;
//     width: calc(100% / 3);
//     position: relative;
//   }
//   .item img {
//     width: 100%;
//     height: 100%;
//   }
// }

// 方法二 缺点 竖向的
// .box {
//   margin: 10px;
//   column-count: 3;
//   column-gap: 10px;
//   .item {
//     margin-bottom: 10px;
//     border-radius: 10px;
//     position: relative;
//   }
//   .item img {
//     width: 100%;
//     height: 100%;
//   }
// }

// 方法三
.box {
  column-count: 3;
  .item{
    break-inside: avoid;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
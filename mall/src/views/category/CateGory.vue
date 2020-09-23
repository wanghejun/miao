<template>
  <div class="category">
    <NavBar class="categoryTop">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="content">
      <Scroll  :data="[categoryData]">
        <tab-menu class="left" :categories="categories" @selectItem="selectItem" />
      </Scroll>
      <Scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory" />
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "./childCopms/TabMenu";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "./childCopms/TabContentCategory";
import TabControl from "components/content/tabControl/TabControl.vue";
import TabContentDetail from "./childCopms/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category.js";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    TabContentDetail,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    // showCategoryDetail() {
    //   if (this.currentIndex === -1) return [];
    //   return this.categoryData[this.currentIndex].categoryDetail[
    //     this.currentType
    //   ];
    // },
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        // console.log(res);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.categoryTop{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.nav-bar {
  background-color: #e197a3;
  font-weight: 700;
  color: #fff;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>

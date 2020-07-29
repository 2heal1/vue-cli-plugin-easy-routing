# VUE-CLI-PLUGIN-EASY-ROUTING

用以基于 vue-cli 搭建的项目快速生成约定式路由

## 环境

- Vue CLI `3.1.0`
- VueRouter `3.02`

## 功能简介

假设 `pages` 目录结构如下：

```js
+pages / +$folder / -page.vue - _layout.vue - index.vue;
```

那么，该插件会自动生成路由配置如下：

```js
function Index() {
  return import(/* webpackChunkName: "page-index" */ "@/pages/index.vue");
}
function FolderLayout() {
  return import(
    /* webpackChunkName: "page-$folder-layout" */ "@/pages/$folder/_layout.vue"
  );
}
function FolderPage() {
  return import(
    /* webpackChunkName: "page-$folder-page" */ "@/pages/$folder/page.vue"
  );
}
export default [
  {
    path: "/",
    redirect: "/index",
  },
  {
    name: "index",
    path: "/index",
    component: Index,
  },
  {
    name: "$folder-layout",
    path: "/:folder/layout",
    component: FolderLayout,

    children: [{ name: "$folder-page", path: "page", component: FolderPage }],
  },
];
```

## 安装及其使用

```js
vue add easy-routing
```

在`main.js`中引入生成的路由，并使用

```js
import router from './router'
··············
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

在`App.vue`中加入`<router-view />`

```js
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

如果没有安装过 vue-router，需要进行安装`npm install vue-router`
最后启动项目

```js
npm run serve
```

- 在`src/pages`中添加一个新的页面`newPage.vue`,并在其中写上相关代码
- 保存后，再在已有的页面上保存，编译后在浏览器中输入`http://localhost:8080/newPage`，便可出现相关页面

## 配置

安装`vue-cli-plugin-easy-routing`后，会在`vue.config`文件里生成以下配置项

```js
pluginOptions: {
    easyRouting: {
      pages: 'src/pages',
      chunkNamePrefix: 'page-',
      redirectPath: 'index'
    }
}
```

### pages

该配置项主要是用来生成路由的地址，默认为`src/pages`

### chunkNamePrefix

该配置项用来设置默认打包前缀名

### redirectPath

该配置项用来设置默认的 redire 重定向的路由  
**注意:** 如若不设置，则默认为/index，如果设置了嵌套路由的布局，需要在此设置重定向路由

## 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果:

```js
const User = {
  template: "<div>User</div>",
};

const router = new VueRouter({
  routes: [{ path: "/user/:id", component: User }],
});
```

为能生成以上路由，使用到动态路由功能，我们约定:

- 在页面**前缀**使用`$`代表该页面为动态路由

```js
    ├─pages
      │  about.vue
      │  index.vue
      │
      └─dynamic
        $dynamic.vue
```

生成的路由就为:

```js
·····
function DynamicDynamic() {
  return import(
    /* webpackChunkName: "page-dynamic-dynamic" */ '@/pages/dynamic/$dynamic.vue'
  )
  ·····
}

export default [
  ·····
  {
    name: 'dynamic-dynamic',
    path: 'dynamic/:dynamic',
    component: DynamicDynamic
  }
  ·····
]

```

## 不生成路由

有些页面不需要有路由生成，为了这种情况，我们约定:

- 采用`$`为**后缀**代表该页面不需要生成路由

```js
    ├─pages
      │  about.vue
      │  index.vue
      │  noroute$.vue
      │
      └─dynamic
        $dynamic.vue


```

## 含有路由元的路由

- 在`.vue`页面内`<route-meta>`自定义模块内写相应的 json

```js
<route-meta>
{
  "str":"str",
  "number":113,
  "boolean":true,
  "array":["array"]
}
</route-meta>
```

生成的路由:

```js
  {
    name: 'hasMeta',
    path: 'hasMeta',
    component: HasMeta,
    meta: { str: 'str', number: 113, boolean: true, array: ['array'] }
  },
```

## 嵌套路由

在实际项目中我们经常是要用到嵌套路由的功能，因此我们约定:

- 在页面**前缀**使用`_`代表该页面为布局
- 可以嵌套多层路由

```js
    ├─pages
      │  about.vue
      │  index.vue
      │  _layout_.vue
      └─folder
          _layout.vue
          page.vue
```

生成的路由:

```js
function FolderLayout() {
  return import(
    /* webpackChunkName: "page-folder-layout" */ '@/pages/folder/_layout.vue'
  )
}
function FolderPage() {
  return import(
    /* webpackChunkName: "page-folder-page" */ '@/pages/folder/page.vue'
  )
export default [
  ·····
  {
    name: 'folder-layout',
    path: 'folder/layout',
    component: FolderLayout,
    children: [{ name: 'folder-page', path: 'page', component: FolderPage }]
  }
  ·····
]
```

## 相关工程

- [easy-route](https://github.com/2heal1/easy-route)

## NPM

- [vue-cli-plugin-easy-routing](https://www.npmjs.com/package/vue-cli-plugin-easy-routing)

## GITHUB

- [vue-cli-plugin-easy-routing](https://github.com/2heal1/vue-cli-plugin-easy-routing)

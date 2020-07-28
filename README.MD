# 作业1

## 转换前

```JS
<h1 id="title"><span>hello</span>world</h1>
```

## 转换后

```JS
React.createElement("h1", {
  id: "title"
},React.createElement("span", null, "hello"), "world");
```

------

如有不足，欢迎指出，共同进步！
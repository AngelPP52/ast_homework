const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");

function loader(source) {
  console.log("转换前的jsx代码: \r\n%s", source);

  // 获取ast
  const ast = parser.parse(source, { plugins: ["jsx"] });

  // 遍历ast
  traverse(ast, {
    JSXElement(nodePath) {
      const next = (node) => {
        if (!node) return t.nullLiteral();
        // JSX 标签节点
        if (t.isJSXElement(node)) {
          // React.createElement函数
          let memberExpression = t.memberExpression(
            t.identifier("React"),
            t.identifier("createElement")
          );
          // 函数参数列表
          let _arguments = [];
          // 标签
          let stringLiteral = t.stringLiteral(node.openingElement.name.name);
          // 属性
          let objectExpression = node.openingElement.attributes.length
            ? t.objectExpression(
                node.openingElement.attributes.map((attr) =>
                  t.objectProperty(t.identifier(attr.name.name), attr.value)
                )
              )
            : t.nullLiteral();
          _arguments = [stringLiteral, objectExpression];
          // 递归处理子节点
          _arguments.push(...node.children.map((item) => next(item)));
          return t.callExpression(memberExpression, _arguments);
        } else if (t.isJSXText(node)) {
          // JSX 文本节点
          return t.stringLiteral(node.value);
        }
      };
      let targetNode = next(nodePath.node);
      // console.log("转义后的ast: %s", JSON.stringify(targetNode, null, 2));
      nodePath.replaceWith(targetNode);
    },
  });

  // 生成代码
  const output = generator(ast, {}, source);

  // 返回转换后的代码
  console.log("转换后的js代码: \r\n%s", output.code);
  return output.code;
}

module.exports = loader;

import _ from "lodash";
import * as htmlparser2 from "htmlparser2";

const truncate = (html, length) => {
  const handler = new htmlparser2.DomHandler();
  const parser = new htmlparser2.Parser(handler, { xmlMode: false });
  parser.write(html);
  parser.end();

  const document = handler.dom;

  const traverse = (node, length, isLast) => {
    if (length <= 0) {
      return { length, text: "", ellipsisAdded: false };
    }
  
    if (node.type === "text") {
      const content = node.data;
      const usedLength = Math.min(length, content.length);
      const newText = content.slice(0, usedLength);
      const ellipsis = length > usedLength && isLast ? "..." : "";
      return { length: length - usedLength, text: newText + ellipsis, ellipsisAdded: !!ellipsis };
    }
  
    if (node.type === "tag") {
      const children = node.children || [];
      let result = "";
      let ellipsisAdded = false;
  
      for (const [index, child] of children.entries()) {
        const isLastChild = isLast && index === children.length - 1;
        const { length: newLength, text, ellipsisAdded: childEllipsisAdded } = traverse(child, length, isLastChild);
        length = newLength;
        result += text;
        ellipsisAdded = childEllipsisAdded;
        if (length <= 0) break;
      }
  
      if (!ellipsisAdded && isLast) {
        const lastTextNode = _.findLast(children, { type: "text" });
        if (lastTextNode) {
          const lastTextNodeIndex = result.lastIndexOf(lastTextNode.data);
          result = result.slice(0, lastTextNodeIndex) + lastTextNode.data + "..." + result.slice(lastTextNodeIndex + lastTextNode.data.length);
        } else {
          result += "...";
        }
        ellipsisAdded = true;
      }
  
      const attrs = _.join(
        _.map(_.entries(node.attribs), ([key, value]) => `${key}="${value}"`),
        " "
      );
  
      const attrsStr = attrs.length ? ` ${attrs}` : "";
  
      const openTag = `<${node.name}${attrsStr}>`;
      const closeTag = `</${node.name}>`;
      return { length, text: openTag + result + closeTag, ellipsisAdded };
    }
  
    return { length, text: "", ellipsisAdded: false };
  };  

  return truncatedHtml;
};

export default truncate;

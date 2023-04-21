const _ = require("lodash");
const htmlparser2 = require("htmlparser2");

function truncate(html, length) {
  const handler = new htmlparser2.DomHandler();
  const parser = new htmlparser2.Parser(handler, { xmlMode: false });
  parser.write(html);
  parser.end();

  const document = handler.dom;

  function traverse(node, length) {
    if (length <= 0) {
      return { length, text: "" };
    }

    if (node.type === "text") {
      const content = node.data;
      const usedLength = Math.min(length, content.length);
      const newText = content.slice(0, usedLength);
      return { length: length - usedLength, text: newText };
    }

    if (node.type === "tag") {
      const children = node.children || [];
      let result = "";

      for (const child of children) {
        const { length: newLength, text } = traverse(child, length);
        length = newLength;
        result += text;
        if (length <= 0) break;
      }

      const attrs = _.join(
        _.map(_.entries(node.attribs), ([key, value]) => `${key}="${value}"`),
        " "
      );

      const attrsStr = attrs.length ? ` ${attrs}` : "";

      const openTag = `<${node.name}${attrsStr}>`;
      const closeTag = `</${node.name}>`;
      return { length, text: openTag + result + closeTag };
    }

    return { length, text: "" };
  }

  const { text: truncatedHtml } = traverse(document[0], length);

  return `${truncatedHtml}...`;
}

module.exports = truncate;

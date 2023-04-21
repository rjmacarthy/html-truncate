const truncate = require("../index");

describe("truncate", () => {
  test("truncate html text without options", () => {
    const html = "<p>Hello, <strong>world</strong>!</p>";
    const truncated = truncate(html, 9);
    expect(truncated).toBe("<p>Hello, <strong>wo</strong></p>...");
  });

  test("truncate html text with nested tags", () => {
    const html =
      "<div><p>Hello, <strong>world</strong>!</p><p>Good <em>morning</em>.</p></div>";
    const truncated = truncate(html, 10);
    expect(truncated).toBe("<div><p>Hello, <strong>wor</strong></p></div>...");
  });

  test("truncate html text with unordered list", () => {
    const html = "<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>";
    const truncated = truncate(html, 7);
    expect(truncated).toBe("<ul><li>Apple</li><li>Ba</li></ul>...");
  });

  test("truncate html text with self-closing tags", () => {
    const html = "<p>Hello, <br/>world!</p>";
    const truncated = truncate(html, 10);
    expect(truncated).toBe("<p>Hello, <br></br>wor</p>...");
  });

  test("truncate html text with attributes", () => {
    const html =
      '<p id="greeting">Hello, <span style="font-weight:bold">world</span>!</p>';
    const truncated = truncate(html, 14);
    expect(truncated).toBe(
      '<p id="greeting">Hello, <span style="font-weight:bold">world</span>!</p>...'
    );
  });

  test("truncate html text with nested tags and mixed content", () => {
    const html =
      "<div><h1>Heading</h1><p>Some <em>text <strong>inside</strong></em> the paragraph.</p></div>";
    const truncated = truncate(html, 20);
    expect(truncated).toBe(
      "<div><h1>Heading</h1><p>Some <em>text <strong>ins</strong></em></p></div>..."
    );
  });
});

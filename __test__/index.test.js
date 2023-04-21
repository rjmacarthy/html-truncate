import truncate from "../index";

describe("truncate function", () => {
  it("truncates plain text without tags", () => {
    const html = "This is a test string.";
    const truncated = truncate(html, 10);
    expect(truncated).toBe("This is a ...");
  });

  it("truncates html text with a single tag", () => {
    const html = "<p>This is a <strong>test</strong> string.</p>";
    const truncated = truncate(html, 12);
    expect(truncated).toBe("<p>This is a <strong>te</strong>...</p>");
  });

  it("truncates html text with nested tags", () => {
    const html = "<p>This is a <strong><em>test</em></strong> string.</p>";
    const truncated = truncate(html, 12);
    expect(truncated).toBe("<p>This is a <strong><em>te</em></strong>...</p>");
  });

  it("truncates html text with multiple tags at the same level", () => {
    const html = "<p>This is a <strong>test</strong> <em>string</em>.</p>";
    const truncated = truncate(html, 12);
    expect(truncated).toBe("<p>This is a <strong>te</strong>...</p>");
  });

  it("truncates html text with attributes", () => {
    const html = '<p class="my-class">This is a <strong>test</strong> string.</p>';
    const truncated = truncate(html, 12);
    expect(truncated).toBe('<p class="my-class">This is a <strong>te</strong>...</p>');
  });

  it("truncates html text with multiple paragraphs", () => {
    const html = "<p>This is the first paragraph.</p><p>This is the second paragraph.</p>";
    const truncated = truncate(html, 12);
    expect(truncated).toBe("<p>This is the </p>...");
  });
});
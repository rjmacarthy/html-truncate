# html-truncator

This function takes in an HTML string and a maximum length and returns a truncated version of the HTML string that is no longer than the maximum length. The resulting string is valid HTML and ends with an ellipsis.

## Install

`npm i html-truncator`

## Usage

```javascript

const htmlString = "<p>This is some long HTML text</p>";
const truncatedHtml = truncate(htmlString, 10);

console.log(truncatedHtml);
// Output: <p>This is so</p>...
```

## Notes

This package uses the `htmlparser2` package to parse the input HTML string and generate a DOM tree, which is then traversed recursively to build the truncated HTML string. The resulting string is valid HTML and ends with an ellipsis.
declare module 'html-truncator' {
  /**
   * Truncates the given HTML string to the specified length.
   * @param html The HTML string to truncate.
   * @param length The maximum length of the truncated HTML string.
   * @returns The truncated HTML string.
   */
  function truncate(html: string, length: number): string;

  export = truncate;
}

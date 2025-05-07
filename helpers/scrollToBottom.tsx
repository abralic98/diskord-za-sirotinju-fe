export const scrollToBottom = (
  container: HTMLElement | null,
  smooth = false,
) => {
  if (container) {
    // First try scrolling to the very bottom of the container
    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });

    // As a fallback, scroll the last child into view
    if (container.children.length > 0) {
      const lastChild = container.lastElementChild as HTMLElement;
      lastChild?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  }
};


export const scrollToBottom = (
  container: HTMLElement | null,
  smooth = false,
) => {
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });

    if (container.children.length > 0) {
      const lastChild = container.lastElementChild as HTMLElement;
      lastChild?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  }
};


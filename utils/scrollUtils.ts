// Helper function to scroll to a section on the page based on hash
export const scrollToSection = (hash: string): void => {
  // Remove the # if it exists
  const id = hash.startsWith("#") ? hash.substring(1) : hash;

  // Find the element by id
  const element = document.getElementById(id);

  // If element exists, scroll to it
  if (element) {
    // Add a small delay to ensure all components have rendered
    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};

// Function to check if URL has a hash and scroll to that section
export const scrollToHashOnLoad = (): void => {
  if (typeof window !== "undefined") {
    const { hash } = window.location;
    if (hash) {
      scrollToSection(hash);
    }
  }
};

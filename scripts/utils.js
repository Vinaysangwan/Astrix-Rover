// Function to Toggle target ON/OFF When Toggle is Pressed
export const toggle = (toggle_id, target_id) => {
  const toggle_element = find_Element_Id(toggle_id);
  const target_element = find_Element_Id(target_id);

  if (!toggle_element || !target_element) {
    console.warn(
      `ERROR: Toggle element(${toggle_id}) or Target element(${target_id}) is not found!`
    );
    return;
  }

  // Toggle visibility on button click
  toggle_element.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent bubbling to document
    const current = window.getComputedStyle(target_element).display;
    target_element.style.display = current === "none" ? "flex" : "none";
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    const isClickInsideToggle = toggle_element.contains(e.target);
    const isClickInsideMenu = target_element.contains(e.target);

    if (!isClickInsideToggle && !isClickInsideMenu) {
      target_element.style.display = "none";
    }
  });

  // Optional: Hide on scroll
  window.addEventListener("scroll", () => {
    target_element.style.display = "none";
  });
};

// Do some CSS Stuff on Target when toggle is Clicked
export const do_Active_Action = (
  toggle_id,
  target_id,
  toggle_check_id,
  action
) => {
  const toggle_element = find_Element_Id(toggle_id);
  const target_element = find_Element_Id(target_id);
  const toggle_check_element = find_Element_Id(toggle_check_id);

  if (!toggle_element || !target_element || !toggle_check_element) {
    console.warn(
      `ERROR: One of the elements (${toggle_id}, ${target_id}, ${toggle_check_id}) was not found!`
    );
    return;
  }

  toggle_element.addEventListener("click", () => {
    if (action === "rotate") {
      // Use a short timeout to wait until display is updated (if toggled just before)
      setTimeout(() => {
        const isVisible =
          window.getComputedStyle(toggle_check_element).display !== "none";

        target_element.style.transform = isVisible
          ? "rotate(90deg)"
          : "rotate(0deg)";
      }, 10); // allow DOM to update menu display state
    }
  });

  // Reset rotation on outside click
  document.addEventListener("click", (e) => {
    if (
      !toggle_element.contains(e.target) &&
      !toggle_check_element.contains(e.target)
    ) {
      target_element.style.transform = "rotate(0deg)";
    }
  });

  // Reset on scroll
  window.addEventListener("scroll", () => {
    target_element.style.transform = "rotate(0deg)";
  });
};

// Get Element From Its Id
export const find_Element_Id = (id) => {
  return document.getElementById(id);
};

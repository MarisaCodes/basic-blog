const tabs = document.querySelectorAll(".tabs > div");
const tabs_arr = Array.from(tabs);
const tab_content = document.querySelectorAll(".tab-content > div");

for (let i = 0; i < tabs.length; i++) {
  const tab = tabs[i];
  tab.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) {
      return;
    }
    const curr_active = e.target.parentElement?.querySelector(".active");
    if (curr_active) {
      curr_active.classList.remove("active");
      const j = tabs_arr.indexOf(curr_active);
      tab_content[j].classList.add("hide");
    }
    e.target.classList.add("active");
    tab_content[i].classList.remove("hide");
  });
}
// the above code assums well structured HTML
// nested within div.tab-content should be the corresponding
// tabbed content to the tabs nested within div.tabs
// in strict order so that their indexes match in the node lists


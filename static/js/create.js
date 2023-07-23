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
//const regex = /(?:\r\n|\r|\n)/g;
// this code assums well structured HTML
// nested within div.tab-content should be the corresponding
// tabbed content to the tabs nested within div.tabs
// in strict order so that their indexes match in the node lists

// submitting the form
const form = document.forms[0];
const TITLE_LIMIT = 130;
const POST_LIMIT = 10000;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const error = document.querySelector(".error");
  const title = e.target.title?.value?.trim();
  const content = e.target.post?.value?.trim();
  if (title.split(" ").join("").length > TITLE_LIMIT) {
    error.classList.remove("hide");
    error.innerHTML = `Your title is too long, limit is ${TITLE_LIMIT}. You have ${
      title.split(" ").join("").length - TITLE_LIMIT
    } extra characters.`;
    return;
  } else if (content.split(" ").join("").length > POST_LIMIT) {
    error.classList.remove("hide");
    error.innerHTML = `Your title is too long, limit is ${TITLE_LIMIT}. You have ${
      content.split(" ").join("").length - POST_LIMIT
    } extra characters.`;
    return;
  } else if (!title.split(" ").join("").length) {
    error.classList.remove("hide");
    error.innerHTML = `Consider titling your post before clicking submit 😒`;
    return;
  } else if (!content.split(" ").join("").length) {
    error.classList.remove("hide");
    error.innerHTML = `Consider adding content to your post (switch to writing tab on the left) before clicking submit 😒`;
    return;
  }
  const data = { title, content };
  fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.replace("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

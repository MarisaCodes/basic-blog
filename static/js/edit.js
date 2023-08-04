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
  e.target.submit.disabled = true;
  e.target.submit.classList.remove("button-primary");
  e.target.querySelector(".loading").classList.remove("hide");
  const data = { title, content };
  const url = new URL(window.location.href);
  fetch(`${url.pathname}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        res.json().then((rep) => {
          const response = JSON.parse(rep);
          window.location.replace(`/blog/${response.id}`);
        });
      } else {
        throw new Error(res.statusText + " " + res.status);
      }
    })
    .catch((err) => {
      e.target.submit.disabled = false;
      e.target.submit.classList.add("button-primary");
      e.target.querySelector(".loading").classList.add("hide");
      console.log(err);
    });
});

$(document).ready(() => {
  $(document).on("click", "#searchButton", () => {
    event.preventDefault();

    $.get("/dropDatabase").then(() => {});
  });
});

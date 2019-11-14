$(document).ready(() => {
  $(document).on("click", "#dropDbButton", () => {
    event.preventDefault();

    $.get("/dropDatabase").then(() => {});
  });

  $(document).on("click", ".commentButton", function (event) {
    const targetReviewId = $(this).data("id");

    $.get("/findComments").then(commentArray => {
      // Use jQuery to display modal and fill it with the appropriate comments

      // Remember to re-empty the div/find and re-append the comments again
      // when the user adds one of their own
    });
  });
});

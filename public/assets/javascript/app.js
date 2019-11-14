$(document).ready(() => {
  $(document).on("click", "#dropDbButton", event => {
    event.preventDefault();

    $.get("/dropDatabase").then(() => {});
  });

  $(document).on("click", ".commentButton", function(event) {
    const targetReviewId = $(this).data("id");

    $.get("/api/get-comments/" + targetReviewId).then(commentedReview => {
      // Use jQuery to display modal and fill it with the appropriate comments

      console.log(commentedReview);

      $("#commentsHeader").text("Comments for " + commentedReview.reviewTitle);

      $("#makeComment").attr("data-id", targetReviewId);

      for (let i = 0; i < commentedReview.comments.length; i++) {
        let nextComment = $("<div>");

        let textRow = $("<div>");

        let nextCommentText = $("<p>");

        nextCommentText.text(commentedReview.comments[i].commentText);

        textRow.addClass("col-md-9").append(nextCommentText);

        let buttonRow = $("<div>");

        let nextCommentButton = $("<button>");

        nextCommentButton
          .text("Delete")
          .addClass("commentDeleteButton btn btn-danger");

        buttonRow.addClass("col-md-3").append(nextCommentButton);

        nextComment
          .addClass("row d-flex align-items-center")
          .append(textRow)
          .append(buttonRow);

        $("#commentArea").append(nextComment);
      }

      $("#reviewComments").modal("show");

      // Remember to re-empty the div/find and re-append the comments again
      // when the user adds one of their own
    });
  });

  $(document).on("click", "#makeComment", function(event) {
    event.preventDefault();

    const toBeCommented = $(this).data("id");

    const newUsername = $("#username")
      .val()
      .trim();

    const newInput = $("#commentInput")
      .val()
      .trim();

    const userComment = {
      commenter: newUsername,

      commentText: newInput
    };

    $.post("/api/post-comment/" + toBeCommented, userComment, (req, res) => {});
  });
});

$(document).ready(() => {
  function updateModal() {
    const currentReviewId = $("#makeComment").data("id");

    $(".commentButton[data-id='" + currentReviewId + "']").click();
  }

  $(document).on("click", "#scrapeButton", event => {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/scrape-new-reviews"
    }).then(data => {
      console.log(data);
      window.location.reload();
    });
  });

  $(document).on("click", "#clearReviewsButton", event => {
    event.preventDefault();

    $.ajax({
      method: "PUT",
      url: "/api/delete-unsaved-reviews"
    }).then(data => {
      console.log(data);
      window.location.reload();
    });
  });

  $(document).on("click", ".saveButton", function(event) {
    const toBeSaved = $(this).data("id");

    $.ajax({
      method: "PUT",
      url: "/api/save-review/" + toBeSaved
    }).then(data => {
      console.log(data);
      window.location.reload();
    });
  });

  $(document).on("click", ".commentButton", function(event) {
    const targetReviewId = $(this).data("id");

    $.get("/api/get-comments/" + targetReviewId).then(commentedReview => {
      // Use jQuery to display modal and fill it with the appropriate comments

      console.log(commentedReview);

      $("#commentsHeader").text("Comments for " + commentedReview.reviewTitle);

      $("#makeComment").attr("data-id", targetReviewId);

      $("#commentArea").empty();

      for (let i = 0; i < commentedReview.comments.length; i++) {
        let nextComment = $("<div>");

        let usernameRow = $("<div>");

        let textRow = $("<div>");

        let nextUsername = $("<p>");

        nextUsername
          .text(commentedReview.comments[i].commenter)
          .addClass("mb-0");

        usernameRow.addClass("col-3").append(nextUsername);

        let nextCommentText = $("<p>");

        nextCommentText
          .text(commentedReview.comments[i].commentText)
          .addClass("mb-0");

        textRow.addClass("col-7").append(nextCommentText);

        let buttonRow = $("<div>");

        let nextCommentButton = $("<button>");

        nextCommentButton
          .text("Delete")
          .addClass("commentDeleteButton btn btn-danger float-right")
          .attr("data-id", commentedReview.comments[i]._id);

        buttonRow.addClass("col-2").append(nextCommentButton);

        nextComment
          .addClass("row d-flex align-items-center my-3")
          .append(usernameRow)
          .append(textRow)
          .append(buttonRow);

        let newHr = $("<hr>");

        newHr.addClass("border border-danger rounded my-3");

        $("#commentArea").prepend(nextComment, newHr);
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

    $.post("/api/post-comment/" + toBeCommented, userComment, (req, res) => {
      updateModal();
    });
  });

  $(document).on("click", ".commentDeleteButton", function(event) {
    const toBeDeleted = $(this).data("id");

    $.ajax({
      method: "PUT",
      url: "/api/delete-comment/" + toBeDeleted
    }).then(data => {
      console.log(data);
      updateModal();
    });
  });

  $(document).on("click", "#scrapeReviewsLink", () => {
    $("#scrapeButton").click();
  });

  $(document).on("click", "#viewSavedLink", () => {
    window.location = "/saved";
  });

  $(document).on("click", ".deleteReviewButton", function(event) {
    const savedToDelete = $(this).data("id");

    $.ajax({
      method: "PUT",
      url: "/api/delete-saved-review/" + savedToDelete
    }).then(data => {
      console.log(data);
      window.location.reload();
    });
  });
});

/**********************************************
 * Check that the input is greater than 10 characters
 * ==================================
 ***********************************************/
$(".problem").on("keydown", function (typingEvent) {
  let input = typingEvent.target.value;
  console.log("Input: ", input);
  if (input.length < 10) {
    $(this).css("border", "solid 3px red");
  } else {
    $(this).css("border", "solid 3px grey");
  }
});

/**********************************************
 * Submit the form to the table
 * ==================================
 ***********************************************/

// Get all the rows of the table
let numberOfRows = $("#debuggingTable tbody").find("tr")
  .length;

console.log("Current number of rows: ", numberOfRows);

// Upon submission of form
$(".debuggingForm").submit(function (submitEvent) {
  console.log("Current number of rows: ", numberOfRows);
  // Prevent default event
  submitEvent.preventDefault();
  // Grab the inputs
  let formObject = submitEvent.target;
  let typeOfForm = formObject.id;
  // Create a row
  let row = $(`
      <tr class="eachRow">
              <td>${formObject.problem.value}</td>
              <td>${formObject.whatshouldbe.value}</td>
              <td>${formObject.whatactuallyis.value}</td>
              <td>${formObject.hypothesis.value}</td>
              <td>${formObject.plan.value}</td>
            </tr>`);

  if (typeOfForm === "debuggingForm") {
    // Increase the number of rows by one
    let rowId = numberOfRows++;
    // Add id attribute to the new row
    $(row).attr("id", `row-${rowId}`);
    // Add the row to the table
    $("tbody").append(row);
    // Clear the form
    $(this).find(".clear").click();
    alert(`Added problem`);
  } else {
    // Grab the selected row
    $(row).attr("id", $(this).prop("row-id"));
    // Replace the 
    $("#" + $(this).prop("row-id")).replaceWith(row);
    // Clear the form
    $(this).find(".clear").click();
    alert(`Updated problem`);
  }
});

/**********************************************
 * Update Form
 * ==================================
 ***********************************************/
$("#debuggingTable").on(
  "click",
  ".eachRow",
  function (clickEvent) {
    let columns = $(this).children();
    console.log("Number of columns: ", columns.length);
    let updateFormElements = $(
      "#updateDebuggingForm input"
    ).slice(0, columns.length);
    console.log(
      "Update Form Elements: ",
      updateFormElements
    );
    for (let i = 0; i < columns.length; i++) {
      console.log("Each element: ", updateFormElements[i]);
      $(updateFormElements[i]).val($(columns[i]).html());
    }
    console.log("Id: ", $(this).attr("id"));
    $("#updateDebuggingForm").prop(
      "row-id",
      $(this).attr("id")
    );
  }
);



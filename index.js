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

let numberOfRows = $("#debuggingTable tbody").find("tr")
  .length;
console.log("Current number of rows: ", numberOfRows);

$(".debuggingForm").submit(function (submitEvent) {
  //   let numberOfRows = $("#debuggingTable tbody").find("tr")
  //     .length;
  console.log("Current number of rows: ", numberOfRows);
  // If event is not handled, don't just submit it
  submitEvent.preventDefault();
  let formObject = submitEvent.target;
  let typeOfForm = formObject.id;
  console.log("Form Object: ", formObject.problem.value);
  console.log("Type of form: ", typeOfForm);
  let row = $(`
      <tr class="eachRow">
              <td>${formObject.problem.value}</td>
              <td>${formObject.whatshouldbe.value}</td>
              <td>${formObject.whatactuallyis.value}</td>
              <td>${formObject.hypothesis.value}</td>
              <td>${formObject.plan.value}</td>
            </tr>`);

  if (typeOfForm === "debuggingForm") {
    let rowId = numberOfRows++;
    console.log(rowId);
    $(row).attr("id", `row-${rowId}`);
    $("tbody").append(row);
    $(this).find(".clear").click();
    alert(`Added problem`);
  } else {
    console.log(
      "Value of input changed: ",
      $(this).prop("row-id")
    );
    $(row).attr("id", $(this).prop("row-id"));
    $("#" + $(this).prop("row-id")).replaceWith(row);
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


//For this java script assigment I copied my last assigment and then used the reference site that taught about validation and using rules
//Philip Yeh
//GUI Assignment: create dynamic table with validation part 1

function validate() {


  $("#Tableform").validate({

    rules: {
      HorizonStartRow: {
        min: -50,
        max: 50,
        number: true,
        required: true
      },
      HorizonEndRow: {

        min: -50,
        max: 50,
        number: true,
        required: true
      },
      VerticalStartRow: {  
        min: -50,
        max: 50,
        number: true,
        required: true
      },
      VerticleEndRow: {
        min: -50,
        max: 50,
        number: true,
        required: true
      }
    },


    messages: {
      HorizonStartRow: {
        number: "ERROR: you did not enter a valid number.",
        min: "ERROR: number entered is too small.",
        max: "ERROR: number entered is too large.",
        required: "ERROR: no number was entered."
      },
      HorizonEndRow: {
        number: "ERROR: you did not enter a valid number.",
        min: "ERROR: number entered is too small.",
        max: "ERROR: number entered is too large.",
        required: "ERROR: no number was entered."
      },
      VerticalStartRow: {
        number: "ERROR: you did not enter a valid number.",
        min: "ERROR: number entered is too small.",
        max: "ERROR: number entered is too large.",
        required: "ERROR: no number was entered."
      },
      VerticleEndRow: {
        number: "ERROR: you did not enter a valid number.",
        min: "ERROR: number entered is too small.",
        max: "ERROR: number entered is too large.",
        required: "ERROR: no number was entered."
      }
    },


    submitHandler: function() {
      MakeTable();
      return false;
    },

    invalidHandler: function() {

      $("#MultiTable").empty();
    }


  });
}
function MakeTable(){
  //Collect values by getting elementby ID and use Number Function to make sure its saved a number variable
  var H_start = Number(document.getElementById('HorizonStartRow').value)
  var H_end = Number(document.getElementById('HorizonEndRow').value)
  var V_start = Number(document.getElementById('VerticalStartRow').value)
  var V_end = Number(document.getElementById('VerticleEndRow').value)

  // console check values
  console.log("Horizontal start: ", H_start, "Horizontal end: ", H_end,
              "Vertical start: ", V_start, "Vertical end: ", V_end);

  //error check, if the starting value is greater thant the end value, swap the numbers
  if(H_start > H_end){
    let tmp = H_start;
    H_start = H_end;
    H_end = tmp;
  }

  if(V_start > V_end){
    let tmp = V_start;
    V_start = V_end;
    V_end = tmp;
  }

  // double check values commented out previous
  /*
  console.log("Horizontal start: ", H_start, "Horizontal end: ", H_end,
              "Vertical start: ", V_start, "Vertical end: ", V_end);

  //If the values are over 50 or under -50 display error message in header and fail to create a table
  if(H_start < -50 || H_end > 50 || V_start < -50 || V_end > 50){

    document.getElementById("error").innerHTML = "Sorry you have encountered a error, please enter another numbers between -50 and 50";
    return;//makes submit button wont work
  }
  else{
    //else display a Success message
    document.getElementById("error").innerHTML = "Success!, your numbers fit within the restrictions and your table is being made";
  }
  */
  //create the matix
  var matrix = {};

  //figure out how long each row and column should be and makes sure its a positive number with abs
  var rowCount = Math.abs(H_end - H_start);
  var columnCount = Math.abs(V_end - V_start);

  console.log("Horizontal row: ", rowCount, "Horizontal row: ", columnCount);
  //double check row values

  //make a new variable that is the first starting value of table
  var H_value = H_start;
  var V_value = V_start;

//  console.log("Value: ", H_value, "value:", V_value);
  for (var x = 0; x <= columnCount; x++){//for every
    tmp_array= [];//create a temp array for each row
    for(var y = 0; y <= rowCount; y++){
      var total = H_value * V_value;
      //save array values and increment the horizontal row value
      tmp_array[y] = total;
      H_value++;
    }
    matrix["rowCount" + x] = tmp_array;//save each row and increment the column
    H_value = H_start;//reset H value
    V_value ++;//increment value of column
  }

  create_table(matrix);
  return false;
  //console.table(matrix);
  //console.log("The array looks like:\n", matrix);
}



function create_table(matrix){

  //For this table we need to get a fresh batch of values
  var H_start = Number(document.getElementById('HorizonStartRow').value)
  var H_end = Number(document.getElementById('HorizonEndRow').value)
  var V_start = Number(document.getElementById('VerticalStartRow').value)
  var V_end = Number(document.getElementById('VerticleEndRow').value)

  console.log("Horizontal start: ", H_start, "Horizontal end: ", H_end,
              "Vertical start: ", V_start, "Vertical end: ", V_end);
  //copy all error checks from previous function
  if(H_start > H_end){
    let tmp = H_start;
    H_start = H_end;
    H_end = tmp;
  }

  if(V_start > V_end){
    let tmp = V_start;
    V_start = V_end;
    V_end = tmp;
  }

  var rowCount = Math.abs(H_end - H_start);
  var columnCount = Math.abs(V_end - V_start);
  //The way I went about creating this table is by bascially having javascript put in the MakeTable tags
  //I learned how to do this by researching how to make a table out of a array logic
  //https://stackoverflow.com/questions/14643617/create-table-using-javascript in this thread
  //there is a example of someone making a table by adding table tags in a for function that parses an array

  //first create the table of contents
  var contents = "";
  //create the first block in top left
  contents += "<table>";
  contents += "<tr><td></td>";



  //create the first horizontal row
  for (var a = H_start; a <= H_end; a++) {
    contents += "<td>" + a + "</td>";
  }

  //close
  contents += "</tr>";
  //start the vertical coloumns
  var column = V_start;


  for (var i = 0; i <= columnCount; i++) {

    //First column value is set
    contents += "<tr><td>" + column + "</td>";//start at first value of coloumn

    for (var j = 0; j <= rowCount; j++) {
      //add in the row from the matrix
      contents += "<td>" + matrix["rowCount" + i][j] + "</td>";
    }
    //increase column value to next values
    //then close row to then loop back up and start again
    column++;
    contents += "</tr>";
  }
  //after loop is finished close table
  contents += "</table>";
  //input matrix into html and learned a little bit about jQuery.https://www.w3schools.com/jquery/html_html.asp this teaches how to add content
  $("#MultiTable").html(contents);
  return false;
}

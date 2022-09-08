
// function exportData(){
//     var table = document.getElementById("niitH");
 
//     var rows =[];
//     let column ;
//     for(var i=0,row; row = table.rows[i];i++){
//         column = row.cells[i].innerText;

//         rows.push(
//             [
//                 column
//             ]
//         );
 
//         }
//         csvContent = "data:text/csv;charset=utf-8,";
//         rows.forEach(function(rowArray){
//             row = rowArray.join(",");
//             csvContent += row + "\r\n";
//         });
 
//         var encodedUri = encodeURI(csvContent);
//         var link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "Stock_Price_Report.csv");
//         document.body.appendChild(link);
//         link.click();
// }
function exportReportToExcel() {
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById("niitH"));
  }

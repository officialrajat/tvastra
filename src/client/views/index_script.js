
var doctors =["John","John","John","John","John","Rash","Cheek","Frye","Tanner","Pitts","Skinner","Whitehead"];
var hospitals =["Omax Hospital", "Apollo Hospital", "Vedanta Hospital","Surya Hospital","Lal bahadur shastri Hospital","Max Hospital"];
var treatments =["Dentistry","Multi Organ Transplant","Cancer","Orthopadics Surgery","Cardiology","Infertility Treatmen"];
 
function autocomplete(inp,arr_doc,arr_hspt,arr_trtmnt){
    var currentFocus;
    console.log(inp.value);
    inp.addEventListener("input", function(e){

        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr_doc.length; i++) {
        
          if (  arr_doc[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML ="Dr. "+ "<strong>" +   arr_doc[i].substr(0, val.length) + "</strong>";
            b.innerHTML +=   arr_doc[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" +   arr_doc[i] + "'>";
            b.addEventListener("click", function(e) {
      
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }

    for (i = 0; i < arr_hspt.length; i++) {
 
        if (  arr_hspt[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        
          b = document.createElement("DIV");
     
          b.innerHTML = "<strong>" +   arr_hspt[i].substr(0, val.length) + "</strong>";
          b.innerHTML +=   arr_hspt[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" +   arr_hspt[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }

      for (i = 0; i < arr_trtmnt.length; i++) {
        if (  arr_trtmnt[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" +   arr_trtmnt[i].substr(0, val.length) + "</strong>";
          b.innerHTML +=   arr_trtmnt[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" +   arr_trtmnt[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }

  });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {

          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }


console.log(document.getElementById("autocomplete-search-box"));

autocomplete(document.getElementById("autocomplete-search-box"),doctors,hospitals,treatments);

function menu_button(){
 console.log("button pressed");
 var target = document.getElementById(top-nav-links);

}
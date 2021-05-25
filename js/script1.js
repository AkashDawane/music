function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users", true);
    // true --> request will be processed asynchronously
    //false --> request will be processed synchronously
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.status === 200 && this.readyState === 4) {
        let data = JSON.parse(this.responseText);
        let rows =
          "<tr><td>Id</td><td>Name</td><td>Age</td></tr>";
        data.forEach(function (d) {
          rows += `
              <tr>
                  <td>${d.id}</td>
                  <td>${d.name}</td>
                  <td>${d.age}</td>                  
              </tr>
              `;
        });
        document.querySelector('#mytable').innerHTML = rows
      }
    };
  }
  getData();
  
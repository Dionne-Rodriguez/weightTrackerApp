let trash = document.getElementsByClassName("fas fa-trash")
let update = document.getElementsByClassName("fas fa-pen")


Array.from(update).forEach(function(element) {
      element.addEventListener('click', function(){
          const userWeight = this.parentNode.parentNode.childNodes[1].innerText
          const userDate = this.parentNode.parentNode.childNodes[4].innerText
          var newWeight = prompt("Please new weight");
          var newDate = prompt("Please new date")
        fetch('update', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'userWeight': userWeight,
            'userDate': userDate,
            'newWeight': newWeight,
            'newDate': newDate
          })
        }).then(function (response) {
          console.log(response)
        }).then(function (data) {
          window.location.reload()
          // document.getElementById("error").innerHTML = data.message
        })
      });
});





      // update.addEventListener('click', function(e){
      //   console.log(e)
      //   const userWeight = this.parentNode.parentNode.childNodes[1].innerText
      //   const userDate = this.parentNode.parentNode.childNodes[3].innerText
      //
      //   function myFunction() {
      //     var person = prompt("Please enter your name", "Harry Potter");
      //   }
      // })
      //   fetch('messages', {
      //     method: 'delete',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       'userWeight': userDate,
      //       'userDate': userDate
      //     })
      //   })
      // }.then(function (response) {
      //   window.location.reload()
      // })


    Array.from(trash).forEach(function(element) {
          element.addEventListener('click', function(){
            const userWeight = this.parentNode.parentNode.childNodes[1].innerText
            const userDate = this.parentNode.parentNode.childNodes[4].innerText
            console.log(userWeight)
            fetch('deletePost', {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'userWeight': userWeight,
                'userDate': userDate
              })
            }).then(function (response) {
              console.log(response)
              if(response.ok){
                return response.json()
              }else{
                console.log("could not delete")
              }
            }).then(function (data) {
              window.location.reload()
              // document.getElementById("error").innerHTML = data.message
            })
          });
    });

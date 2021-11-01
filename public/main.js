
let button = document.querySelectorAll('button')
var check = document.getElementsByClassName("fa-check");
var trash = document.getElementsByClassName("fa-trash");




Array.from(button).forEach(function(element) {
  let orderName = document.querySelector('#name').value
  let coffeeSize = document.querySelector('#size').value
    element.addEventListener('click', function(){
        let orderName = document.querySelector('#name').value
        let coffeeSize = document.querySelector('#size').value

    userinput = this.getAttribute('data-id')
    // let coffeeSize = this.getAttribute('data-size')
    console.log(userinput)
    console.log(orderName)
    // console.log(size)
      
    let sendOrder = `Customers Name: ${orderName}, Coffee Order: ${userinput}`
  
    window.speechSynthesis.speak(new SpeechSynthesisUtterance('Order for' + orderName));
    
    fetch('sendOrder', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {'sendOrder': sendOrder}
        )
    }).then(response => {
        if (response.ok) 
            return response.json()
        
    }).then(data => {
        console.log(data)
        window.location.reload(true)
        
    })
    
    })

    
    
})



Array.from(check).forEach(function(element) {

    element.addEventListener('click', function(){
      
      
     const orderId = element.id
     
      

      fetch('sendOrder', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'orderId': orderId 
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
    });
});


Array.from(trash).forEach(function(element) {
  
  const order = this.parentNode.childNodes[0].innerText
  const barista = this.parentNode.parentNode.childNodes[1].innerText
  console.log(order)
  element.addEventListener('click', function(){
    console.log(element)
    
    fetch('sendOrder', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'order': order,
        'barista': barista
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});



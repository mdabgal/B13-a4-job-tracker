1. ans: 
   * get ElementSelecor -> Selects a single element by its ID. 

   *getElementsByClassName -> Selects multiple elements by class name (returns HTMLCollection). 

   * querySelector -> Selects the first matching element using CSS selector.  

* querySelectorAll -> Selects all matching elements using CSS selector (returns NodeList).
   


2. ans:
* elemant +
const div = document.createElement("div);

*content +
div.textCountent = "Hallo world"

*DOM
document.body.appendChild(div);


3. ans:
*event Bubbling is when an event triggered on a child element propagates upward to its parent elements.

*Clicking a button inside a div triggers the click event on the button first, then on the div, then on the body.

4. ans:
*Event Delegation means attaching attaching a single event listener to a parent element to handle events on its child elements.

*Useful becaude it:
  *Improves performance
  *works for dynamically added elements
  *reduces repeated code


  5. ans:

  *preventGefault() -> Stops the default browser behavior(e.g form submission)
  *stopPropagation()-> Stops the event from bubbling up to parent elements
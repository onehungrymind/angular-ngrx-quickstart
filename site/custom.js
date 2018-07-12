var collection = document.querySelector('#collection'),
  submit = document.querySelector('#submit');

collection.value = JSON.stringify([
  {"name": "Item 1", "price": 10},
  {"name": "Item 2", "price": 5.3},
  {"name": "Item 3", "price": 103},
  {"name": "Item 4", "price": 10343}
]);

submit.addEventListener('click', () => {
  document.querySelector('totals-view').collection = JSON.parse(collection.value)
});

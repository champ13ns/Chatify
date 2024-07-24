const list = [
  '{"username":"asjldfja","connected":"true","name":"xfljaslfd"}',
  '{"username":"guest_user","connected":true,"name":"guest user"}'
];

const parsedList = list.map(JSON.parse);
console.log(parsedList);
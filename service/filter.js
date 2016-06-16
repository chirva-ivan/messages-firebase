// Фильтр для списка сообщений.
angular.module('messageApp').filter('orderObjectBy', function() {
  return function(items, field, reverse) {

    var filtered = [];

    // Каждый объект-сообщение помежается в массив,
    // при этом игнорируется лишние свойства объекта родителя.
    angular.forEach(items, function(item) {
      if(item[field]) filtered.push(item);
    });

    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    
    if(reverse) filtered.reverse();

    return filtered;
  };
});
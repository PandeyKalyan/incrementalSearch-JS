/* Model */

var model = {
    matchedStrings: [],
    stringList: []
    
};

/* Controller */

var controller = {
    generateRandomString: function() {
        var text = '';
        var allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        for(var i = 0; i < 10; i++) {
            text += allowed.charAt(Math.floor(Math.random() * allowed.length));
        }
        
        return text;
    },
    
    randomStringsArray: function() {
        for(var i = 0; i < 500; i++) {
            model.stringList.push(this.generateRandomString());
        }
    },
    
    getMatchingStrings: function() {
      model.matchedStrings = [];
      model.stringList.forEach(function(item) {
         var pattern = new RegExp(view.searchBox.value, 'i');
         if(pattern.test(item)) {
             model.matchedStrings.push(item);
         }
      });
      view.render(model.matchedStrings);
    },
    
    init: function() {
        this.randomStringsArray();
        view.init();
    }
};

/* View */

var view = {
  init: function() {
      this.searchBox = document.getElementById("searchBox");
      this.matchList = document.getElementById("matchList");
      this.render(model.stringList);
      
      this.searchBox.addEventListener('input', function() {
          controller.getMatchingStrings();
      });
  },
  
  render: function(stringList) {
      this.matchList.innerHTML = '';
      var ul = document.createElement('ul');
      ul.setAttribute('class', 'match-list')
      this.matchList.appendChild(ul);
      stringList.forEach(function(element) {
         var li = document.createElement('li');
         li.setAttribute('class', 'matchedString');
         li.textContent = element;
         ul.appendChild(li);
      });
  }
        
};

controller.init();
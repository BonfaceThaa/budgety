var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals:{
            exp: 0,
            inc:0
        }
    };

    return {
        addItem: function(type, desc, val) {
            var newItem, ID;

            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item
            if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            } else if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            }

            // push new item to array
            data.allItems[type].push(newItem);

            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    }

})();

var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        addListItem: function(obj, type) {
            var html, newHtml;

            if (type === 'inc') {
                element  = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><divclass="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // create HTML string with placeholder text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Replace the placeholder text with some actual data
            document.querySelector(element).insertAdjacentHTML('beforeEnd' ,newHtml)
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();


var controller = (function(budgetCtrl, UICtrl){

    var setUpEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function() {

        var input, newItem;

        // 1. get field input data
        input = UICtrl.getInput();

        // 2. add item to bugdet controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. add new item to UI

        UICtrl.addListItem(newItem, input.type);
        // 4. caclulate the budget
        // 5. display budget

        console.log(input);

    }

    return {
        init: function() {
            console.log('Application has started');
            setUpEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

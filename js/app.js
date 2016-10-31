//modle is an object literal
var model = {
    selectedCat: null,
 
    cats: [
        {
        name: 'Mimi',
        clicks: 0,
        image: 'img/cat-1.jpg'
        },
 
        {
        name: 'Lily',
        clicks: 0,
        image: 'img/cat-2.jpg'
        }
    ]             
};
 
var octopus = {
    init: function() {
    //set current object as the first cat in the list
    model.selectedCat = model.cats[0];
 
    //Initialize views
    catListView.init();
    catView.init();
    },
 
    getAllCats: function() {
        return model.cats;
    },
 
    getSelectedCat: function() {
               
        return model.selectedCat;
    },
 
    //Set curretnly-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.selectedCat = cat;
    },
 
    //Incremnts the counter for the currently-selected cat
    clickCouter: function() {
        model.selectedCat.clicks++;
        catView.render();
    }
 
};
 
var catListView = {
    init: function() {
    //store the DOM elements for easy access later
    this.catListElem = document.getElementById('cat-list');
 
    //render this view(update the DOM elements with right values)
    this.render();
    },

    render: function() {

        var cat, elem, i;
        //Get cats that we will be renderring from octopus(which gets the cats from model)
        var cats = octopus.getAllCats();

        //Clear out text
        this.catListElem.innerHTML = '';

        //Let's loop over the cats in the array
        for (var i = 0; i < cats.length; i++) {
            //This is the number that we are currently on
            var cat = cats[i];

            //set a cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            //On click, setCurrentCat and render the catView
            //(This uses our closure-in-a-loop trick to connect the value
            //of the cat variable to the click event function)
            elem.addEventListener('click', function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat);

        //Finally, add the element to the list.
        this.catListElem.appendChild(elem);
        };
    }
};

var catView = {
    //Render gets called over and over again. But, inital just once.
    init: function() {
        //Store pointers to our DOM elements for easy access later.
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        this.imageUrl = document.getElementById('img-url');

     //On click, increment the current cat's counter
     //only need to do once, values are changed 
     this.catImageElem.addEventListener('click', function() {
        octopus.clickCouter();
     }); 

     //Render this view (update the DOM elements with right values)
     this.render();
    },

    render: function() {
        //Update the DOM elements with the values from current cat
        var selectedCat = octopus.getSelectedCat(); //which gets it from model
        this.countElem.textContent = selectedCat.clicks;
        this.catNameElem.textContent = selectedCat.name;
        this.catImageElem.src = selectedCat.image;
        this.catimgUrl.textContent = "The path to this image is" + selectedCat.image;
    }
};


/*
var catView = {
	//Render gets called over and over. But, initial just once.
	init: function() {
		//Store pointers to our DOM elements for easy access later.
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');
        this.imageUrl = document.getElementById('img-url');

    //Onclick, incement the current cat's counter
    //only need to do once, values are changed
    this.catImageElem.addEventListener('click', function() {
        octopus.clickCouter();
    });

    //Render this view (update the DOM elements with right values)
    this.render();
	},

    render: function() {
        //Update teh DOM elements with the values from current cat
        var selectedCat = octopus.getSelectedCat();
         this.countElem.textContent = selectedCat.clicks;
         this.catNameElem.textContent = selectedCat.name;
         this.catImageElem.src = selectedCat.image;
         this.imgUrl.textContent = "The path to this image is" + selectedCat.image;
    }

};
*/
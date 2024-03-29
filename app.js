//we need to circle througgh reponse and get the tags and the short link for giphy
//Add it to div: tags in <a> and link in <a>
//1.Tags that it's using
//2.copy giphy link


// DOM Elements
let root = document.getElementById('root');
let myButton = document.getElementById('myButton');
let search = document.getElementById('search');
let more = document.getElementById('more');
let widthWindow = window.innerWidth;

// API Vars
let giphyNumberPerPage = 25;
let offset = 0;
let searchQuery;
let limit = 25

// Clear the images list
let clearImages = function() {
	root.innerHTML = "";
	more.innerHTML = "";
}

// Re-layout images with Masonry
let reInitLayout = function() {
	var msnry = new Masonry( '#root', {
	 	horizontalOrder: true,
	 	gutter: 15,
		itemSelector: 'img',
		columnWidth: 'img',
		percentPosition: true
	});
};

let reInitLayoutDiv = function() {
	var msnry = new Masonry( '#root', {
	 	horizontalOrder: true,
	 	gutter: 15,
		itemSelector: '.popDiv',
		columnWidth: '.popDiv',
		percentPosition: true
	});
};


// Add images from a giphy response to the layout
let addImagesToLayout = function(response) {
	for (var i = 0; i < response.data.length; i++) {
		let img = document.createElement('img');
		let copyURL = response.data[i].url;
	 	img.src = response.data[i].images.original.url;
	 	img.height = response.data[i].images.fixed_width.height; 
	 	img.width = response.data[i].images.fixed_width.width;
		root.appendChild(img);

		copyLink(img, copyURL, response);
	}
	reInitLayout();
	reInitLayoutDiv()
};

// Add Copy Link from a giphy response to the layout

let copyLink = function(img, url, response){
	let link = document.createElement('a');

 	let popDiv = document.createElement('div');
 	popDiv.className = "popDiv"
 	popDiv.style.width = img.width + 'px';
 	popDiv.style.height = img.height + 'px';
	console.log(popDiv);

	let copyURL = url;
	let urlBtn = document.createElement('a');
	urlBtn.className = 'copyLink';
 	urlBtn.innerHTML = 'Copy link';
 	urlBtn.href = copyURL;

	let input = document.createElement('input');
	input.id = 'inputLink'
 	input.type = 'text';
	input.value = copyURL;

	popDiv.appendChild(input);
 	popDiv.appendChild(urlBtn);
 	root.appendChild(link);
	link.appendChild(img);
	link.appendChild(popDiv);

	let copy = function(){
		event.preventDefault();
		input.select(); 
		document.execCommand("copy");
		urlBtn.innerHTML = "Linked Copied"
	}

	
	urlBtn.addEventListener("click", copy);
	
}

// Search Event Handler
let searchEventHandler = function() {
	clearImages();

	let responseHandler = function(response) {
		addImagesToLayout(response);

		// Add a Show More link after the first search
		let btnMore = document.createElement('button');
		btnMore.innerHTML = 'More Giphys'
		more.appendChild(btnMore);
		more.addEventListener('click', showMoreEventHandler);
	};
	
	request(responseHandler, 'search', search.value, giphyNumberPerPage, offset);

};

// Show More Event Handler
let showMoreEventHandler = function() {
	offset += giphyNumberPerPage;

	let responseHandler = function(response) {
		addImagesToLayout(response);
	};
	
	request(responseHandler, 'search', search.value, giphyNumberPerPage, offset);
};


// Attach search event handler to search button
myButton.addEventListener('click', searchEventHandler);

// Handle pressing Enter in search query text field
search.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 13) {
  	console.log('enter');
  	searchEventHandler();
  }
});


// Event handler for window resizing
function resizeWindow(){
	widthWindow = window.innerWidth;
	if(widthWindow >= 1275) {
	 	root.style.width = '1290px';
	} else if (widthWindow >= 1075){
	 	root.style.width = '1075px';
	} else if (widthWindow >= 845){
	 	root.style.width = '845px';
	} else if (widthWindow >= 630){
	 	root.style.width = '630px';
	} else if (widthWindow >= 415){
	 	root.style.width = '415px';
	} else {
	 	console.log('too small');
	}
}



// Handle window resizing event
window.addEventListener('resize', resizeWindow);

// Correctly set initial widths
resizeWindow();

// Giphy API request function
function request(callbackFn, endpoint, searchQuery='', limit=25, offset=0){
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest();
	
	// Open a new connection, using the GET request on the search endpoint of Giphy's API
	request.open(`GET`, `http://api.giphy.com/v1/gifs/${endpoint}?api_key=${api.key}&q=${searchQuery}&limit=${limit}&offset=${offset}`, true);
	
	request.onload = function() {
		callbackFn(JSON.parse(this.response));
	};

	request.send();
}

function callbackFn(request){
	addImagesToLayout(request);
}

request(callbackFn, 'trending', search.value, giphyNumberPerPage, offset);




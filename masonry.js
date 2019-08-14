console.log('masonry');
// vanilla JS
// init with element

// var grid = document.querySelector('#root');
// var msnry = new Masonry( grid, {
//   // options...
//   itemSelector: 'img',
//   columnWidth: 200
// });

// $('#root').masonry({
// 	// set itemSelector so .grid-sizer is not used in layout
// 	horizontalOrder: true,
// 	itemSelector: 'img',
// 	// use element for option
// 	columnWidth: 'img',
// 	percentPosition: true
// })

var msnry = new Masonry( '#root', {
 	horizontalOrder: true,
	itemSelector: 'img',
	// use element for option
	columnWidth: 'img',
	percentPosition: true
})
 

"use strict";

$(handleSubmit);
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos';


function handleSubmit() {
	$('.js-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#js-query');
		const query = queryTarget.val();
		// clear input
		queryTarget.val("");

    	getDataFromApi(query, displayYouTubeSearchData);
	});
	
}

// function handleImgClick() {
// 	$('.js-query-thumbnails').on('click', '.videoFun', event => console.log('handleImgClick ran'));
// }

function getDataFromApi(searchTerm, callback) {
	const settings = {
		url: YOUTUBE_SEARCH_URL,
		data: {
			q: `${searchTerm} in:name`,
			key: 'AIzaSyBBMquy6Vb126Q6C3INBen46s_4TwZEpw0',
			part: 'snippet',
			maxResutls: 5
		},
		dataType: 'json',
		type: 'GET', 
		success: callback
	};	

	$.ajax(settings);
}



function displayYouTubeSearchData(data) {	
	// const results = data.items.map((item, index) =>	renderResult(item));
	const results = data.items.map((item, index) => renderResult(item));
	const searchNumber = data.items.length;
	console.log(searchNumber);
	$('.js-searchNumber').html(`<h3>Your search returned ${searchNumber} search results.</h3>`);
	$('.js-query-thumbnails').html(results);

	// data.items.forEach(item => $('.js-query-thumbnails').append(renderResult(item)))



	console.log(data);
}

$('.js-query-thumbnails').on('click', '.js-videoFun', function(event) {
	event.preventDefault();
	const videoId = $(event.currentTarget).data('videoId');
	// console.log($(event.currentTarget).data('videoId'));
	$('.js-light-box').html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`)
});

function renderResult(result) {
	return `
		<div class="results">
			<h4>${result.snippet.title}</h4>
			<a data-videoId="${result.id.videoId}" class="js-videoFun" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
				<img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
			<a>
		</div>

	`;
}

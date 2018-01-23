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

function handleImgClick() {
	$('.js-query-thumbnails').on('click', '.videoFun', event => console.log('handleImgClick ran'));
}

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
	const results = data.items.map((item, index) =>	renderResult(item));	
	$('.js-query-thumbnails').html(results);
	console.log(data);
}

function renderResult(result) {
	return `
		<div>
			<h2>${result.snippet.title}</h2>
			<a class="js-videoFun" href="#" target="_blank">
				<img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
			<a>
		</div>
	`;
}

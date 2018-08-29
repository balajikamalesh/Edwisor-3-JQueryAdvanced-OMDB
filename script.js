$(document).ready(() => {
	
	$('.btn').click(function(){
		let imdbid = $("#imdbid").val();
		let title = $("#title").val();
		let year = $("#year").val();

		if(imdbid.length == 0 && title.length == 0)
		{
			$("#result").empty();
			$("#result").append('<h1>Please enter IMDB Id or Title</h1>');
		} else{
			getAllData(imdbid,title,year);	
		}
		
	});

});

let getAllData = (imdbid,title,year) => {
	console.log("making request!!!!");

	var appKey = '93d7a6d';

	var url = 'https://www.omdbapi.com/?' + 
				((imdbid.length > 0) ? ('i=' + imdbid) : "" ) + 
				((title.length > 0 && imdbid.length > 0) ? ('&t=' + title.split(" ").join("+")) : ((title.length > 0) ? ('t=' + title.split(" ").join("+")) : "") ) + 
				((imdbid.length == 0 && title.length == 0 && year.length > 0) ? ('y=' + year) : ('&y=' + year) )
			 	+ '&apikey=' + appKey;

	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: url,
		success: (data) => {

			console.log(data);

			$("#result").empty();

			

			if(data.Response == 'True')
			{
				let row = `<div class="card bg-light" id="left">
						  <img class="card-img-top img-thumbnail" src="${data.Poster}" alt="https://static1.squarespace.com/static/589ca5099f7456ed1d21d7e8/589cd6da8419c25ff478d67a/589cd6dd579fb3ad6910fb2f/1486673635816/Poster-detail-02.jpg?format=750w">
						  <div class="card-body">
						    <h5 class="card-title">${data.Title} (${data.Year})</h5>
						    <small>${data.Rated!=null ? data.Rated+" |" : ""} ${data.Runtime != null ? data.Runtime + " |" : ""} ${data.Genre != null ? data.Genre+" |" : ""} ${data.Released}</small>
						    <hr>
						    <p class="card-text">${data.Plot}</p>
						    <p>Director: ${data.Director}</p>
						    <p>Writers: ${data.Writer}</p>
						    <p>Stars: ${data.Actors}</p>
						    <p>IMDB: ${data.imdbRating}/10 (${data.imdbVotes} votes)</p>
						    <a href="${data.Website}" target="_blank" class="btn btn-primary">Official Site</a>
						  </div>
						</div>`;

				$("#result").append(row);
			} else {
				$("#result").append('<h1 id="NotFound">No Movie found for the given search criteria</h1>');
			}

		},
		error: (data) => {
			alert('Error!!!!!!');
		},
		beforeSend: () => {

		},
		complete: () => {

		},
		timeout: 10000
	})
}
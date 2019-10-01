//initialising empty arrays to store data from hotelresponse
var basicInfoArr = [];
var rateArr = [];
var likeStatus = [];
var baseUrl;


//get request to fetch the json hosted over local server
$(document).ready(function() {

	console.log(data);
	//$.ajax({
	//	url: 'http://localhost:3000/hotel-search-response',
	//	dataType: 'jsonp',
	//	success: (response) => callSuccess(response),
    //error: (error) => callError(error)

	// });
})

function callError(error) {
  console.log(error);
}

var basicInfoObj = {};

//function populates the data arrays hotelArr, basicInfo, likeStatus
function callSuccess(response) {
  baseUrl = response["base-url"];
  let hotelArr = response.hotels.hotel;
  let count=0;
  let row;

  for(let i=0; i<hotelArr.length; i++){
    count++;
    let basicInfo = hotelArr[i]["basic-info"];
    basicInfoArr.push(basicInfo);
    likeStatus.push(false);
    loopPrices(hotelArr[i]["room-rates"]["room-rate"]);

  }

  //function to populate the data to html
  populatepage();

}


function filterLikes() {
  if(document.getElementsByClassName('filterLike')[0].classList.contains('active')) {
    console.log('active');

  }
  var rows = document.getElementsByClassName('row');
  var activerow = '';
  // console.log(rows);
  var filtered = $('.row').filter(function() {
    return !$(this).children('active').length;
  });
  // console.log(filtered);
  for(let i=0; i< filtered.length; i++) {
    // console.log(filtered[i].innerHTML);
    if(filtered[i].classList.contains('active')) {
      activerow += filtered[i].innerHTML;

    }

  }
  document.getElementById('add').innerHTML = activerow;
}

// room rates are in an array, function loops over it and populates rateArr
function loopPrices(arr) {
  let minprice = 0;
  for(let i=0; i< arr.length; i++) {
    let temp = arr[i]["rate-breakdown"]["common:rate"]["common:pricing-elements"]["common:pricing-element"];
    rateArr.push(temp);
  }
}

//populate the html
function populatepage() {
  let elt = document.getElementById('add');
  var start = "<div class='row filterFun'>";
  let innerHTML = elt.innerHTML;

  // creating rows and columns for each data set
  for(let i=0; i< 300; i++) {

    var hotelName = '<h3>';
    var localityName = "<div class='col-xs-6'>Locality - ";
    var rating = "<div class='col-xs-4 offset-1 text-center'> Rating - ";
    var rent = "<div class='col-xs-4'> minimum rate per night - ";
    var thumbnail = "<div class='col-xs-4 text-right'><a target='_blank' href='https://www.cleartrip.com'" + baseUrl + basicInfoArr[i]["thumb-nail-image"] + "'><img src='./images/web-img.png' alt='cleartrip image'></a></div>";
    hotelName += basicInfoArr[i]["hotel-info:hotel-name"] + "</h3>";
    localityName += basicInfoArr[i]["hotel-info:locality"] + "</div>";
    rating += basicInfoArr[i]["hotel-info:star-rating"] + "</div>";

    var like = "<div class='col-xs-6 text-right'><button type='button'class='btn btn-primary btn-sm likebtn'><span class='glyphicon glyphicon-thumbs-up'></span></button>";
    like += "</div>"
    let minprice = 0;
    rateArr[i].forEach(function (item) {
      minprice += item["common:amount"];
    });

    rent += minprice + "</div>"

    start += hotelName + localityName + like + rent + rating + thumbnail;

    if(i==9) {
      start += "</div></div>";
    }
    else {
      start += "</div></div><div class='row filterFun'>";
    }




    //rows are appended to html
    elt.innerHTML = start;

  }

  // button functionality to ensure that a liked hotel remains 'liked'
  $('.btn').click(function(e) {

      e.preventDefault();
      $(this).addClass('active');
      $(this).parent().parent().addClass('active');
  })


}



/*$(function() {
    $('span.stars').stars();
});
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}*/






/* 

 <!-- <div clas="row">
      <div class="col-xs-12">
        <h2>Check out these hotels !</h2>
      </div>
      <div class="col-xs-12 text-right">
        To see the liked hotels click
        <a href="#" class="btn btn-info btn-xs filterLike" onclick="filterLikes()">
          <span class="glyphicon glyphicon-thumbs-up"></span> Filter
        </a>
      </div>
    </div> -->
	
	<!-- <a target="_blank" href="https://www.cleartrip.com/places/hotels/1361/1361272/images/LRM_EXPORT_20160903_230653_tn.jpg"><img src="https://www.cleartrip.com/places/hotels/1361/1361272/images/LRM_EXPORT_20160903_230653_tn.jpg" alt="xyz"></a> -->

	<!--<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>name</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>pankti</td>
				</tr>
			</tbody>
		</table>
	</div>-->
	
	<!--<div class="row">
		<div class="col-md-12">
			Bangalore: 602 hotels found
		</div>
	</div>
	
	<div class="card">
	  <div class="row no-gutters">
		<div class="col-md-2">
			<img src="https://www.cleartrip.com/places/hotels/1361/1361272/images/LRM_EXPORT_20160903_230653_tn.jpg" alt="xyz">
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h3 class="card-title">Hotel1</h3>
				<div>rating</div>
				<div>locality</div>
				
			</div>
		</div>
		<div class="col-md-2 text-right">
			<div class="card-body">
				<br>
				<div>cost</div>
				<small>1 room/night</small>
				<div><button type='button'class='btn btn-primary btn-sm likebtn' onclick='hotelLiked(event)'><span class='glyphicon glyphicon-thumbs-up'></span></button></div>
			</div>
		</div>
	  </div>
	</div>-->
	
	<!-- <div class="card">
	
	<div> -->

	<!--
		
		var hotelNameHTML = "<h3 class='card-title'>" + hotelname + "</h3>";
		var starRating = "<div>" + rating + "</div>";
		var localityHTML = "<div>" + locality + "</div>";
		var costHTML = "<div>" + cost + "</div>";
		var likeButton = "<button type='button'class='btn btn-primary btn-sm likebtn' onclick='hotelLiked(event)'><span class='glyphicon glyphicon-thumbs-up'></span></button>"
		var thumbnailHTML = "<a target='_blank' href='https://www.cleartrip.com'" + baseurl + thumbnailurl "><img src=https://www.cleartrip.com'" + baseurl + thumbnailurl + "alt='hotelimg'></a>"
		
		var hotelcardHTML = "<div class='card'><div class='row no-gutters'><div class='col-md-2'>" + thumbnailHTML + "</div><div class='col-md-8'><div class='card-body'>" + hotelNameHTML + starRating + localityHTML + "</div></div><div class='col-md-2 text-right'><div class='card-body'><br>" + costHTML + "<small>1 room/night</small><div>" + likeButton + "</div></div></div></div></div>"
		
		-->
		
		//$("#example-table").tabulator({
  //columns:[
    //{title:"Name", field:"name", sortable:true, width:200},
    //{title:"Progress", field:"progress", sortable:true, sorter:"number"},
    //{title:"Gender", field:"gender", sortable:true},
    //{title:"Favourite Color", field:"col", sortable:false},
    //{title:"Date Of Birth", field:"dob"},
    //{title:"Cheese Preference", field:"cheese"},
  //],
//});
//$("#example-table").tabulator("setData", sampleData);

*/




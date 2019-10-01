var data = get the data;
var hotelsArr = data["hotel-search-response"]["hotels"]["hotel"];
var baseurl = data["hotel-search-response"]["base-url"];
var currency = data["hotel-search-response"]["currency"];

var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPages = 0;

var baseurl = data["hotel-search-response"]["base-url"];

//console.log(hotelsArr[0]["room-rates"]);
//console.log(hotelsArr[0]["room-rates"]["room-rate"]);
//console.log(hotelsArr[0]["room-rates"]["room-rate"][0]["rate-breakdown"]["common:rate"]["common:pricing-elements"]["common:pricing-element"]); //array of the actual prices for 1 this should added up for cost
//console.log(hotelsArr[0]["room-rates"]["room-rate"][1]);

function makeList() {
    for (x = 0; x < hotelsArr.length; x++)
        list.push(x);

    numberOfPages = getNumberOfPages();
	
}
   
function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = hotelsArr.slice(begin, end);
	getDetails();
    //drawList();
    check();
}

function getDetails() {
	hotelname = "yes";
	rating = 3;
	locality = "xyadasd";
	cost = 23543;

	baseurl = "/places/hotels";
	thumbnailurl = "/1361/1361272/images/LRM_EXPORT_20160903_230653_tn.jpg";
	var hotelName; var rating; var locality; var totalCost; var thumbnailUrl; 
	var hotelcardHTML = "";
	for(let i=0; i< pageList.length; i++) {
		hotelName = hotelsArr[i]["basic-info"]["hotel-info:hotel-name"];
		rating = hotelsArr[i]["basic-info"]["hotel-info:star-rating"];
		locality = hotelsArr[i]["basic-info"]["hotel-info:locality"];
		thumbnailUrl = hotelsArr[i]["basic-info"]["hotel-info:thumb-nail-image"];
		//console.log(hotelName, rating, locality, thumbnailUrl);
		
		let rateArrOne = hotelsArr[0]["room-rates"]["room-rate"][0]["rate-breakdown"]["common:rate"]["common:pricing-elements"]["common:pricing-element"];
		let rateArrTwo = hotelsArr[0]["room-rates"]["room-rate"][1]["rate-breakdown"]["common:rate"]["common:pricing-elements"]["common:pricing-element"];
		
		let rateArr = new Array();
		
		rateArrOne.forEach(function(item) {
			rateArr.push(item);
		});
		rateArrTwo.forEach(function(item) {
			rateArr.push(item);
		});
		//console.log(rateArr);
		let cost = 0;
		rateArr.forEach(function (item) {
			console.log(item["common:amount"]);
			cost += item["common:amount"];
		});
		console.log(cost);
		totalCost = cost;
		
		
		let hotelNameHTML = "<h3 class='card-title'>" + hotelName + "</h3>";
		let starRating = "<div>" + rating + "</div>";
		let localityHTML = "<div>" + locality + "</div>";
		let costHTML = "<div>" + totalCost + "</div>";
		let likeButton = "<button type='button'class='btn btn-primary btn-sm likebtn' onclick='hotelLiked(event)'><span class='glyphicon glyphicon-thumbs-up'></span></button>";
		let thumbnailHTML = "<a target='_blank' href='https://www.cleartrip.com'" + baseurl + thumbnailUrl + "><img src=https://www.cleartrip.com'" + baseurl + thumbnailurl + "alt='hotelimg'></a>";
		
		hotelcardHTML += "<div class='row no-gutters'><div class='col-xs-2'>" + thumbnailHTML + "</div><div class='col-xs-8'><div class='card-body'>" + hotelNameHTML + starRating + localityHTML + "</div></div><div class='col-xs-2 text-right'><div class='card-body'><br>" + costHTML + "<small>1 room/night</small><div>" + likeButton + "</div></div></div></div>"
		
		document.getElementsByClassName('card')[0].innerHTML = hotelcardHTML;
		
		
		
	}
}

    
function drawList() {
    document.getElementById("list").innerHTML = "";
    for (r = 0; r < pageList.length; r++) {
        document.getElementById("list").innerHTML += pageList[r]["basic-info"]["hotel-info:hotel-name"] + "<br/>";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

function load() {
    makeList();
    loadList();
}
    
window.onload = load;









//console.log(data);
console.log(data["hotel-search-response"]["hotels"]);
//console.log(data["hotel-search-response"]["base-url"]);
//console.log(data["hotel-search-response"]["currency"]);



function loadData(event) {
	console.log(event);
	console.log(event.target.innerHTML);
	console.log(currentPage);
	for(let i=0; i<10; i++) {
		console.log(hotelsArr[i]);
	}
}
/*function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
	console.log(pageList);
    drawList();
    check();
}*/

function hotelLiked(event) {
	console.log(event);
	console.log(event.target);
	//console.log(event.target.parentNode.parentNode.parentNode);
	//console.log(event.target.parentNode.parentNode.previousSibling);
	console.log(event.target.parentNode.parentNode);
	
	console.log(event.target.parentNode.parentNode.previousSibling.innerHTML);
	var hotelname = event.target.parentNode.parentNode.previousSibling.innerHTML;
	console.log(hotelname.split('|'));
	console.log(hotelname[0]);
}

/*
hotelname = "yes";
rating = 3;
locality = "xyadasd";
cost = 23543;

baseurl = "/places/hotels";
thumbnailurl = "/1361/1361272/images/LRM_EXPORT_20160903_230653_tn.jpg";*/

/*
var hotelNameHTML = "<h3 class='card-title'>" + hotelName + "</h3>";
var starRating = "<div>" + rating + "</div>";
var localityHTML = "<div>" + locality + "</div>";
var costHTML = "<div>" + totalCost + "</div>";
var likeButton = "<button type='button'class='btn btn-primary btn-sm likebtn' onclick='hotelLiked(event)'><span class='glyphicon glyphicon-thumbs-up'></span></button>"
var thumbnailHTML = "<a target='_blank' href='https://www.cleartrip.com'" + baseurl + thumbnailUrl + "><img src=https://www.cleartrip.com'" + baseurl + thumbnailurl + "alt='hotelimg'></a>"

var hotelcardHTML = "<div class='row no-gutters'><div class='col-md-2'>" + thumbnailHTML + "</div><div class='col-md-8'><div class='card-body'>" + hotelNameHTML + starRating + localityHTML + "</div></div><div class='col-md-2 text-right'><div class='card-body'><br>" + costHTML + "<small>1 room/night</small><div>" + likeButton + "</div></div></div></div>"

document.getElementsByClassName('card')[0].innerHTML = hotelcardHTML;

*/

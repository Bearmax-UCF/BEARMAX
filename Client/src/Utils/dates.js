export function getFormattedDate(date) {
	if (typeof date === "string") return date;

	const year = date.getFullYear();

	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : "0" + month;

	let day = date.getDate().toString();
	day = day.length > 1 ? day : "0" + day;

	let dateString = month + "/" + day + "/" + year;

	let hour = date.getHours();
	let formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	let minute = date.getMinutes();
	let suffix = hour >= 12 ? "PM" : "AM";

	let timeString =
		formattedHour +
		":" +
		(minute < 10 ? "0" + minute : minute) +
		" " +
		suffix;

	return dateString + ", " + timeString;
}

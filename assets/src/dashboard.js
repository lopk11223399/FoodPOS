const time = document.querySelector('.header__time')
const timeCalendar = document.querySelector('.calendar__current--date')

// Date
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

function renderTime() {
	let today = new Date()
	let year = today.getFullYear()
	let month = today.getMonth()
	month = months[month]
	let date = today.getDate()
	let weekday = weekdays[today.getDay()]
	let hours = today.getHours()
	let minutes = today.getMinutes()
	let seconds = today.getSeconds()
	let day = 'AM'

	if (hours > 12) {
		day = 'PM'
	}

	if (seconds < 10) {
		seconds = '0' + seconds
	}

	if (minutes < 10) {
		minutes = '0' + minutes
	}

	if (hours < 10) {
		hours = '0' + hours
	}

	time.textContent = `${weekday}, ${date} ${month} ${year} - ${hours}:${minutes}:${seconds} ${day}`
	timeCalendar.textContent = `${weekday}, ${date} ${month} ${year}`

	// get date add to bill
	return {
		day: `${date}/${month}/${year}`,
		time: `${hours}:${minutes}:${seconds}${day}`,
	}
}

setInterval(renderTime, 1000)

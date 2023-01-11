const $nowUnix = document.querySelector('#nowUnix')
const $nowDate = document.querySelector('#nowDate')
const $input = document.querySelector('#input')
const $output = document.querySelector('#output')
const $form1 = document.querySelector('#form1')
const $form2 = document.querySelector('#form2')
const $year = document.querySelector('#year')
const $month = document.querySelector('#month')
const $day = document.querySelector('#day')
const $hour = document.querySelector('#hour')
const $minute = document.querySelector('#minute')
const $second = document.querySelector('#second')

function printOutput (dt) {
  let output = '<ul>'
  output += `<li>Unix Timestamp Input: <code>${dt.toSeconds()}</code></li>`
  output += '</ul>'
  output += '<br>'
  output += '<ul>'
  output += `<li>UTC Unix Timestamp: <code>${dt.toSeconds()}</code></li>`
  output += `<li>UTC RFC-1123: <code>${dt.toUTC().toHTTP()}</code></li>`
  output += `<li>UTC RFC-2822: <code>${dt.toUTC().toRFC2822()}</code></li>`
  output += `<li>UTC ISO-8601: <code>${dt.toUTC().toISO()}</code></li>`
  output += `<li>UTC Relative: <code>${dt.toUTC().toRelative()}</code></li>`
  output += `<li>UTC Timezone: <code>${dt.toUTC().toFormat('ZZZZ')}</code></li>`
  output += '</ul>'
  output += '<ul>'
  output += `<li>UTC Unix Timestamp Start of Day: <code>${dt.toUTC().startOf('day').toSeconds() >>> 0}</code></li>`
  output += `<li>UTC RFC-1123 Start of Day: <code>${dt.toUTC().startOf('day').toHTTP()}</code></li>`
  output += `<li>UTC RFC-2822 Start of Day: <code>${dt.toUTC().startOf('day').toRFC2822()}</code></li>`
  output += `<li>UTC ISO-8601 Start of Day: <code>${dt.toUTC().startOf('day').toISO()}</code></li>`
  output += '</ul>'
  output += '<ul>'
  output += `<li>UTC Unix Timestamp End of Day: <code>${dt.toUTC().endOf('day').toSeconds() >>> 0}</code></li>`
  output += `<li>UTC RFC-1123 End of Day: <code>${dt.toUTC().endOf('day').toHTTP()}</code></li>`
  output += `<li>UTC RFC-2822 End of Day: <code>${dt.toUTC().endOf('day').toRFC2822()}</code></li>`
  output += `<li>UTC ISO-8601 End of Day: <code>${dt.toUTC().endOf('day').toISO()}</code></li>`
  output += '</ul>'
  output += '<ul>'
  output += '<br>'
  output += '</ul>'
  output += '<ul>'
  output += `<li>Local Unix Timestamp: <code>${dt.toLocal().toSeconds()}</code></li>`
  output += `<li>Local RFC-1123: <code>${dt.toLocal().toHTTP()}</code></li>`
  output += `<li>Local RFC-2822: <code>${dt.toLocal().toRFC2822()}</code></li>`
  output += `<li>Local ISO-8601: <code>${dt.toLocal().toISO()}</code></li>`
  output += `<li>Local Relative: <code>${dt.toLocal().toRelative()}</code></li>`
  output += `<li>Local Timezone: <code>${dt.toLocal().toFormat('ZZZZZ')} (${dt.toLocal().toFormat('ZZZZ')}) ${dt.toLocal().toFormat('ZZ')}</code></li>`
  output += '</ul>'
  output += '<ul>'
  output += `<li>Local Unix Timestamp Start of Day: <code>${dt.toLocal().startOf('day').toSeconds() >>> 0}</code></li>`
  output += `<li>Local Unix RFC-1123 Start of Day: <code>${dt.toLocal().startOf('day').toHTTP()}</code></li>`
  output += `<li>Local Unix RFC-2822 Start of Day: <code>${dt.toLocal().startOf('day').toRFC2822()}</code></li>`
  output += `<li>Local Unix ISO-8601 Start of Day: <code>${dt.toLocal().startOf('day').toISO()}</code></li>`
  output += '</ul>'
  output += '<ul>'
  output += `<li>Local Unix Timestamp End of Day: <code>${dt.toLocal().endOf('day').toSeconds() >>> 0}</code></li>`
  output += `<li>Local Unix RFC-1123 End of Day: <code>${dt.toLocal().endOf('day').toHTTP()}</code></li>`
  output += `<li>Local Unix RFC-2822 End of Day: <code>${dt.toLocal().endOf('day').toRFC2822()}</code></li>`
  output += `<li>Local Unix ISO-8601 End of Day: <code>${dt.toLocal().endOf('day').toISO()}</code></li>`
  output += '</ul>'
  $output.innerHTML = output
}

function normalizeNumber (value) {
  return (value || '').trim().replace(/[^0-9]/gi, '')
}

function optionToOutput () {
  try {
    $output.textContent = ''
    const value = $input.value
    const $option = document.querySelector('input[name=option]:checked')
    if (!$option) {
      return
    }
    const option = $option.value
    let dt
    if (option === 'UnixTimestampSeconds') {
      const timestamp = Math.floor(Number(normalizeNumber(value) || Date.now() / 1000))
      $input.value = timestamp.toString()
      dt = luxon.DateTime.fromSeconds(timestamp)
    } else if (option === 'UnixTimestampMillis') {
      const timestamp = Math.floor(Number(normalizeNumber(value) || Date.now()))
      $input.value = timestamp.toString()
      dt = luxon.DateTime.fromMillis(timestamp)
    } else if (option === 'RFC-1123') {
      dt = luxon.DateTime.fromHTTP(value.trim())
    } else if (option === 'RFC-2822') {
      dt = luxon.DateTime.fromRFC2822(value.trim())
    } else if (option === 'ISO-8601') {
      dt = luxon.DateTime.fromISO(value.trim())
    }
    printOutput(dt)
  } catch (err) {
    alert(err.message)
  }
}

function dateToOutput ({ year, month, day, hour, minute, second }) {
  try {
    $output.textContent = ''
    if (!year) {
      year = 0
    }
    if (!month) {
      month = 0
    }
    if (!day) {
      day = 0
    }
    if (!hour) {
      hour = 0
    }
    if (!minute) {
      minute = 0
    }
    if (!second) {
      second = 0
    }
    year = year.toString().padStart(4, '0')
    month = month.toString().padStart(2, '0')
    day = day.toString().padStart(2, '0')
    hour = hour.toString().padStart(2, '0')
    minute = minute.toString().padStart(2, '0')
    second = second.toString().padStart(2, '0')
    const dt = luxon.DateTime.fromISO(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
    printOutput(dt)
  } catch (err) {
    alert(err.message)
  }
}

$nowUnix.addEventListener('click', (event) => {
  event.preventDefault()
  $input.value = `${Math.floor(Date.now() / 1000)}`
  document.querySelector('input[name=option][value=UnixTimestampSeconds]').checked = true
})

$nowDate.addEventListener('click', (event) => {
  event.preventDefault()
  const dt = luxon.DateTime.now()
  $year.value = dt.get('year')
  $month.value = dt.get('month')
  $day.value = dt.get('day')
  $hour.value = dt.get('hour')
  $minute.value = dt.get('minute')
  $second.value = dt.get('second')
})

$form1.addEventListener('submit', (event) => {
  event.preventDefault()
  optionToOutput()
})

$form2.addEventListener('submit', (event) => {
  event.preventDefault()
  const year = $year.value
  const month = $month.value
  const day = $day.value
  const hour = $hour.value
  const minute = $minute.value
  const second = $second.value

  dateToOutput({
    year,
    month,
    day,
    hour,
    minute,
    second
  })
})

optionToOutput()

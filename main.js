const $input = document.querySelector('#input')
const $output = document.querySelector('#output')
const $form1 = document.querySelector('#form1')
const $form2 = document.querySelector('#form2')
const $year = document.querySelector('#year')
const $month = document.querySelector('#month')
const $day = document.querySelector('#day')

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
  output += `<li>Local Timezone: <code>${dt.toLocal().toFormat('ZZZZ')}</code></li>`
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

function optionToOutput () {
  try {
    $output.textContent = ''
    const value = $input.value
    const $option = document.querySelector('input[name=option]:checked')
    const option = $option.value
    let dt
    if (option === 'UnixTimestamp') {
      const timestamp = Math.floor(Number(value || Date.now() / 1000))
      dt = luxon.DateTime.fromSeconds(timestamp)
    } else if (option === 'RFC-1123') {
      console.log('hyo')
      dt = luxon.DateTime.fromHTTP(value)
    } else if (option === 'RFC-2822') {
      dt = luxon.DateTime.fromRFC2822(value)
    } else if (option === 'ISO-8601') {
      dt = luxon.DateTime.fromISO(value)
    }
    printOutput(dt)
  } catch (err) {
    alert(err.message)
  }
}

function dateToOutput ({ year, month, day }) {
  try {
    $output.textContent = ''
    const dt = luxon.DateTime.fromISO(`${year}-${month}-${day}`)
    printOutput(dt)
  } catch (err) {
    alert(err.message)
  }
}

$form1.addEventListener('submit', (event) => {
  event.preventDefault()
  optionToOutput()
})

$form2.addEventListener('submit', (event) => {
  event.preventDefault()
  const year = $year.value
  const month = $month.value
  const day = $day.value
  dateToOutput({
    year,
    month,
    day
  })
})

optionToOutput()

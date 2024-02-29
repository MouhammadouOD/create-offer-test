import dayjs from 'dayjs'
require('dayjs/locale/fr')
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)
dayjs().format('L LT')

dayjs.extend(duration)

dayjs.locale('fr')
dayjs.extend(relativeTime)

export default dayjs

export default {
  type: 'object',
  name: 'exhibitionDetails',
  title: 'Exhibition Details',
  fields: [
    {
      title: 'Exhibition: Start Date',
      name: 'dateStart',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      title: 'Exhibition: End Date',
      name: 'dateEnd',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      title: 'Exhibition Private View: Start Date',
      name: 'dateStartPrivate',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      title: 'Exhibition Private View: End Date',
      name: 'dateEndPrivate',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
  ],
}

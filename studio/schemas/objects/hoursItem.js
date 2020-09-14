export default {
  type: 'object',
  name: 'hoursItem',
  title: 'Hours',
  fields: [
    {
      type: 'string',
      name: 'day',
      title: 'Day',
    },
    {
      type: 'string',
      name: 'open',
      title: 'Open (MM:HH 24 hr)',
    },
    {
      type: 'string',
      name: 'closed',
      title: 'Closed (MM:HH 24 hr)',
    },
  ],
}

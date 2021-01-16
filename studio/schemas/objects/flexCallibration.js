export default {
  name: 'flexCallibration',
  type: 'object',
  title: 'Callibration Marks',
  options: {
    hotspot: true,
  },
  fields:[
            {name:'startRow',
              type: 'number',
              description: "starting row",
              title: 'starting Row',
              options: {
                isHighlighted: true,
              },
            },
  {name:'startRowMobile',
    type: 'number',
    description: "starting row for mobile",
    title: 'starting Row mobile',
    options: {
      isHighlighted: true,
    },
  },
  {name:'startRowTablet',
    type: 'number',
    description: "starting row for tablet",
    title: 'starting Row tablet',
    options: {
      isHighlighted: true,
    },
  },

            ]
}

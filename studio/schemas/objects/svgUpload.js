import SvgPreviewComponent from './svgPreviewComponent'

export default {
  type: 'object',
  name: 'svgUpload',
  title: 'SVG Image Upload',
  fields: [
    {
      type: 'svgUploadPreview',
      name: 'source',
      title: 'SVG Logo',
    },
  ],
  preview: {
    select: {
      svgHtml: 'source',
    },
    component: SvgPreviewComponent,
  },
}

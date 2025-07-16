export const fields = {
  queryId: {
    type: 'text',
    label: 'Query Id',
  },

  content: {
    type: 'textarea',
    label: 'Content',
    required: true,
  },
  createdAt: {
    type: 'date',
    label: 'Created At',
    showInForm: false,
    showInTable: true,
  },
};

export const fields = {
  name: {
    type: 'text',
    label: 'Customer Name',
    showInTable: true,
  },
  description: {
    type: 'textarea',
    label: 'Description',
    required: true,
  },
  createdAt: {
    type: 'date',
    label: 'Created At',
    showInForm: false,
    showInTable: true,
  },
  status: {
    type: 'select',
    label: 'Status',
    required: true,
    defaultValue: 'Open',
    options: [
      { label: 'Open', value: 'Open' },
      { label: 'InProgress', value: 'InProgress' },
      { label: 'Closed', value: 'Closed' },
    ],
  },
  resolution: {
    type: 'textarea',
    label: 'Resolution',
  },

  // updatedAt: {
  //   type: 'date',
  //   label: 'Updated At',
  //   showInForm: false, // Don't show in form
  //   showInTable: true, // Show in table only
  // },
};

export const fields = {
  _id: {
    type: 'id',
    label: 'ID',
    showInForm: true,
    disableForUpdate: true,
    showInTable: true,
  },
  description: {
    type: 'textarea',
    label: 'Description',
    required: true,
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
  // notes: {
  //   type: 'array',
  //   label: 'Notes',
  //   disableForForm: true, // Not shown in the form directly
  //   showInTable: false,
  // },
  // createdAt: {
  //   type: 'date',
  //   label: 'Created At',
  //   showInForm: false,
  //   showInTable: true,
  // },
  // updatedAt: {
  //   type: 'date',
  //   label: 'Updated At',
  //   showInForm: false, // Don't show in form
  //   showInTable: true, // Show in table only
  // },
};

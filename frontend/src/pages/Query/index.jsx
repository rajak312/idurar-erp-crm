import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Query() {
  const translate = useLanguage();
  const navigate = useNavigate();
  const entity = 'query';

  const searchConfig = {
    displayLabels: ['description'],
    searchFields: 'description',
  };

  const deleteModalLabels = ['description'];

  const Labels = {
    PANEL_TITLE: translate('query'),
    DATATABLE_TITLE: translate('query_list'),
    ADD_NEW_ENTITY: translate('add_new_query'),
    ENTITY_NAME: translate('query'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };

  const { _id, name, createdAt, ...createFields } = fields;

  return (
    <CrudModule
      createForm={<DynamicForm fields={createFields} />}
      updateForm={<DynamicForm fields={fields} isUpdateForm />}
      config={config}
      extra={[
        {
          label: translate('Notes'),
          key: 'queryDetail',
          icon: <FileSearchOutlined />,
          onClick: (record) => {
            navigate(`/query/${record._id}/notes`);
          },
        },
      ]}
    />
  );
}

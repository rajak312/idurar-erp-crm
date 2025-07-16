import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';
import { useNavigate, useParams } from 'react-router-dom';

export default function Notes() {
  const translate = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log('params', id);

  const entity = `query/${id}/notes`;

  const searchConfig = {
    displayLabels: ['content'],
    searchFields: 'content',
  };

  const deleteModalLabels = ['content'];

  const Labels = {
    PANEL_TITLE: translate('query'),
    DATATABLE_TITLE: translate('notes_list'),
    ADD_NEW_ENTITY: translate('add_note'),
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

  const { queryId, createdAt, ...createFields } = fields;

  return <CrudModule createForm={<DynamicForm fields={createFields} />} config={config} />;
}

import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMoney } from '@/settings';
import calculate from '@/utils/calculate';

export default function ItemRow({ field, remove, current = null }) {
  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const money = useMoney();

  const updateQt = (value) => setQuantity(value);
  const updatePrice = (value) => setPrice(value);

  useEffect(() => {
    if (current) {
      const { items, invoice } = current;
      const item = invoice ? invoice[field.fieldKey] : items?.[field.fieldKey];

      if (item) {
        setQuantity(item.quantity);
        setPrice(item.price);
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);
    setTotal(currentTotal);
  }, [price, quantity]);

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col span={4}>
        <Form.Item
          name={[field.name, 'itemName']}
          rules={[
            { required: true, message: 'Missing item name' },
            {
              pattern: /^(?!\s*$)[\s\S]+$/,
              message: 'Item Name must contain valid characters',
            },
          ]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Form.Item name={[field.name, 'description']}>
          <Input placeholder="Description" />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Form.Item name={[field.name, 'note']}>
          <Input placeholder="Note" />
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item name={[field.name, 'quantity']} rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Form.Item name={[field.name, 'price']} rules={[{ required: true }]}>
          <InputNumber
            className="moneyInput"
            onChange={updatePrice}
            min={0}
            controls={false}
            addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
            addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
          />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Form.Item name={[field.name, 'total']}>
          <InputNumber
            readOnly
            className="moneyInput"
            value={totalState}
            min={0}
            controls={false}
            addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
            addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
            formatter={(value) =>
              money.amountFormatter({ amount: value, currency_code: money.currency_code })
            }
          />
        </Form.Item>
      </Col>

      <div style={{ position: 'absolute', right: '-20px', top: '5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}

import { Card, Table, Col, Placeholder } from 'react-bootstrap';

export function SidebarSkeleton() {
  return (
    <Col md={4} lg={3}>
      <div className="d-flex flex-column align-items-center align-items-md-start gap-3">
        <div 
          className="bg-secondary opacity-25 rounded-circle" 
          style={{ width: '200px', height: '200px' }}
        />
        <div className="w-100">
          <Placeholder as="div" animation="glow">
            <Placeholder xs={8} className="mb-2" />
            <Placeholder xs={12} size="sm" className="mb-1" />
            <Placeholder xs={10} size="sm" className="mb-3" />
            <div className="d-flex gap-2">
              <Placeholder xs={3} size="xs" />
              <Placeholder xs={3} size="xs" />
            </div>
          </Placeholder>
        </div>
      </div>
    </Col>
  );
}

export function TableSkeleton() {
  return (
    <Col md={8} lg={9}>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Placeholder as="div" animation="glow" className="mb-4">
            <Placeholder xs={4} size="lg" />
          </Placeholder>
          
          <Table className="mb-0">
            <thead>
              <tr>
                <th className="border-top-0">Repositório</th>
                <th className="border-top-0" style={{ width: '120px' }}>Estrelas</th>
                <th className="border-top-0" style={{ width: '120px' }}>Linguagem</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="py-3">
                    <Placeholder as="p" animation="glow" className="mb-1">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="mb-0">
                      <Placeholder xs={10} size="xs" />
                    </Placeholder>
                  </td>
                  <td className="py-3 align-middle">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                  </td>
                  <td className="py-3 align-middle">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={8} />
                    </Placeholder>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}

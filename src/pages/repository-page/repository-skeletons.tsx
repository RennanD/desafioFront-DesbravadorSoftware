import { Card, Placeholder } from 'react-bootstrap';

export function RepositoryInfoSkeleton() {
  return (
    <div role="status">
      {/* Breadcrumb Skeleton */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <div 
          className="bg-secondary opacity-25 rounded-circle" 
          style={{ width: '32px', height: '32px' }}
        />
        <Placeholder as="div" animation="glow">
          <Placeholder xs={4} size="sm" />
        </Placeholder>
        <span className="text-secondary">/</span>
        <Placeholder as="div" animation="glow" className="flex-grow-1">
          <Placeholder xs={3} size="sm" />
        </Placeholder>
      </div>

      {/* Info Card Skeleton */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Placeholder as="p" animation="glow" className="mb-4">
            <Placeholder xs={12} size="lg" className="mb-2" />
            <Placeholder xs={8} size="lg" />
          </Placeholder>
          
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-4">
              <Placeholder as="div" animation="glow" style={{ width: '80px' }}>
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="div" animation="glow" style={{ width: '100px' }}>
                <Placeholder xs={12} />
              </Placeholder>
            </div>
            <Placeholder.Button variant="primary" xs={3} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export function ReadmeSkeleton() {
  return (
    <Card className="border shadow-sm" role="status">
      <Card.Header className="bg-white border-bottom py-3 px-4">
        <Placeholder as="div" animation="glow">
          <Placeholder xs={2} />
        </Placeholder>
      </Card.Header>
      <Card.Body className="p-4 p-md-5">
        <Placeholder as="div" animation="glow">
          <Placeholder xs={12} className="mb-2" />
          <Placeholder xs={10} className="mb-2" />
          <Placeholder xs={11} className="mb-4" />
          
          <Placeholder xs={6} size="lg" className="mb-3" />
          <Placeholder xs={12} className="mb-2" />
          <Placeholder xs={9} className="mb-2" />
          <Placeholder xs={10} className="mb-2" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

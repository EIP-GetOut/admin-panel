import React from 'react';
import { BackendStatusInterface } from '../conf/backendStatus'

type Props = {
	backendStatus: BackendStatusInterface
}
const BackendStatus: React.FC<Props> = ({backendStatus}) => {
  return (
    <div>
      {backendStatus ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5), transparent 70%)',
                backgroundColor: backendStatus.status === 'Running' ? 'green' : 'red',
                marginRight: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            }}
          />
          <span style={{
            color: backendStatus.status === 'Running' ? 'green' : 'red',
            fontSize: '1.6em'
          }}>
            {backendStatus.status} {backendStatus.version && `${backendStatus.version}`}
          </span>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BackendStatus;

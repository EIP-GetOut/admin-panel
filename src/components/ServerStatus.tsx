import React, { useState, useEffect } from 'react';

const apiRootPath = 'https://api.eip-getout.me'

interface BackendStatusInterface {
  status: 'Running' | 'Down';
  version?: string;
}

const BackendStatus: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<BackendStatusInterface | null>(null);

  useEffect(() => {
    const fetchBackendStatus = async () => {
      try {
        const response = await fetch(apiRootPath);
        if (response.ok) {
          const data = await response.json();
          setBackendStatus({ status: 'Running', version: data.tag });
        } else {
          setBackendStatus({ status: 'Down' });
        }
      } catch (error) {
        console.error('Error fetching backend status:', error);
        setBackendStatus({ status: 'Down' });
      }
    };

    fetchBackendStatus();
  }, []);

  return (
    <div>
      {backendStatus ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.5), transparent 70%)`,
                backgroundColor: backendStatus.status === 'Running' ? 'green' : 'red',
                marginRight: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)', // Shadow below the circle
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

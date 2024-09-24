/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Alexandre Chetrit <chetrit.pro@hotmail.com>
*/

import { apiRootPath } from '../conf/backendStatus'

function computeLogout (): Promise<void>  {
  return fetch(`${apiRootPath}/account/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then((res) => {
    if (!res.ok) {
      alert('Failed logging out')
      throw Error('Failed logging out.')
    }
  })
}

export default computeLogout
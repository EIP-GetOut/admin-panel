/*
** Copyright GETOUT SAS - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Wrote by Alexandre Chetrit <chetrit.pro@hotmail.com>
*/

export const apiRootPath = 'https://api.eipgetout.live'

export interface BackendStatusInterface {
  status: 'Running' | 'Down';
  version?: string;
}

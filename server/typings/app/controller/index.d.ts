// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    home: ExportHome;
  }
}

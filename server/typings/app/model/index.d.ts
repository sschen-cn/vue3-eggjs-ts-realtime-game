// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportPlayer from '../../../app/model/player';

declare module 'egg' {
  interface IModel {
    Player: ReturnType<typeof ExportPlayer>;
  }
}

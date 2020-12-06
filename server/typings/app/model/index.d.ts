// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPlayer from '../../../app/model/player';

declare module 'egg' {
  interface IModel {
    Player: ReturnType<typeof ExportPlayer>;
  }
}

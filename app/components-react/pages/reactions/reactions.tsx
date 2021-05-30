import React from 'react';
import { ReactionsService } from '../../../services/reactions/reactions'
import { Services } from '../../service-provider';

export default function Reactions() {

  const { ReactionsService } = Services;

  function init() {
      ReactionsService.init;
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

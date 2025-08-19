import * as React from 'jsx-dom';
import './grid-system.scss'

export const GridSystem = () => {
  const cardItem = (label: string) => {
    return <div className='grid-system__card'><p>{label}</p></div>
  }
  return (
    <div className='grid-system'>
      <div class="bimco-container">
        <div class="row">
          <div class="col">{cardItem('col')}</div>
          <div class="col">{cardItem('col')}</div>
          <div class="col">{cardItem('col')}</div>
          <div class="col">{cardItem('col')}</div>
        </div>
        <div class="row">
          <div class="col-6">{cardItem('col-6')}</div>
          <div class="col-6">{cardItem('col-6')}</div>
        </div>
        <div class="row">
          <div class="col-4">{cardItem('col-4')}</div>
          <div class="col-8">{cardItem('col-8')}</div>
        </div>
        <div class="row">
          <div class="col-9">{cardItem('col-9')}</div>
          <div class="col-3">{cardItem('col-3')}</div>
        </div>
      </div>
    </div>
  );
};

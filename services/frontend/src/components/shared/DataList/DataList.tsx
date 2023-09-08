'use client';

import React from 'react';

interface DataListProps {
  data: any[];
  img: string;
  heading: string;
  subtitle: string;
  dataKey: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DataList: React.FC<DataListProps> = ({
  data,
  img,
  heading,
  subtitle,
  dataKey,
  handleClick,
}) => (
  <div
    className="list pa3 ml0 center mw12 ba b--light-silver br3"
    style={{
      height: '300px',
      width: '400px',
      overflow: 'hidden',
      overflowY: 'scroll',
      border: 'solid 1px #ccc',
    }}
  >
    {data.map((item, index) => (
      <article className="dt w-100 bb b--black-05 pb2 mt2" key={index}>
        <div className="dtc w2 w3-ns v-mid">
          <img
            alt=""
            className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
            src={item[img]}
          />
        </div>
        <div className="dtc v-mid pl3">
          <h3 className="f6 f5-ns fw6 lh-title black mv0">{item[heading]} </h3>
          <h4 className="f6 fw4 mt0 mb0 black-60">{item[subtitle]}</h4>
        </div>
        <div className="dtc v-mid">
          <form className="w-100 tr">
            <button
              className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
              data-key={item[dataKey]}
              onClick={handleClick}
            >
              + Add
            </button>
          </form>
        </div>
      </article>
    ))}
  </div>
);

export default DataList;

"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  datas: {
    prefCode: number;
    prefName: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
};

const PrefGraphRenderer: React.FC<Props> = ({ datas }) => {
  let series: HighCharts.SeriesOptionsType[] = [];
  let categories = [];

  for (let records of datas) {
    let _result = [];
    for (let record of records.data) {
      _result.push(record.value);
      categories.push(String(record.year));
    }
    series.push({
      type: "line",
      name: records.prefName,
      code: records.prefCode,
      data: _result,
    });
  }

  const options: Highcharts.Options = {
    title: {
      text: "",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口",
      },
    },
    series: series,
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PrefGraphRenderer;

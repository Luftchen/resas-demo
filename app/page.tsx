"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Constants from "./components/constants";
import axios from "axios";
import PrefGraphRenderer from "./pref_graph_renderer";

export default function Home() {
  const RESAS_API_KEY = "uJLFbr0kQoUwiWOmhRDxsUdGSKgPzuDGqVf5S30b";

  // 都道府県のstate
  const [prefectures, setPrefectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);

  // 都道府県別のグラフデータのstate
  const [graphDatas, setGraphDatas] = useState<
    {
      prefCode: number;
      prefName: string;
      data: {
        year: number;
        value: number;
      }[];
    }[]
  >([]);

  // 都道府県のoncheck処理
  const onPrefectureCheck = (
    prefCode: number,
    prefName: string,
    check: boolean
  ) => {
    let _graphDatas = graphDatas.slice();
    if (check) {
      axios
        .get(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
            String(prefCode),
          {
            headers: { "X-API-KEY": RESAS_API_KEY },
          }
        )
        .then((results) => {
          _graphDatas.push({
            prefCode: prefCode,
            prefName: prefName,
            data: results.data.result.data[0].data,
          });
          setGraphDatas(_graphDatas);
        })
        .catch((error) => {
          console.log(
            "couldn't get population data from resas: " +
              prefCode +
              ", " +
              prefName
          );
        });
    } else {
      const _index = _graphDatas.findIndex(
        (value) => value.prefCode === prefCode
      );
      if (_index !== -1) {
        _graphDatas.splice(_index, 1);
        setGraphDatas(_graphDatas);
      }
    }
  };

  // Resasから都道府県の一覧を取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": RESAS_API_KEY },
      })
      .then((results) => {
        setPrefectures(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="pref_box">
        <div>
          <strong>都道府県</strong>
        </div>
        {prefectures !== null ? (
          <ul className="ul_list">
            {prefectures.result?.map((pref, index) => {
              return (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={pref.prefCode}
                      onChange={(event) =>
                        onPrefectureCheck(
                          pref.prefCode,
                          pref.prefName,
                          event.target.checked
                        )
                      }
                    />
                    {pref.prefName}
                  </label>
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
      </div>
      <div>
        <strong>人口推移グラフ</strong>
      </div>
      <PrefGraphRenderer datas={graphDatas} />
    </>
  );
}

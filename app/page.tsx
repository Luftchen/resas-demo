import Image from "next/image";
import Constants from "./components/constants";

export default function Home() {
  return (
    <>
      <div className="pref_box">
        <div><strong>都道府県</strong></div>
        <ul className="ul_list">
        {Constants.PREFECTURES.map(option => { return (
            <li>
              <label>
                <input type="checkbox" value={option} />{option}
              </label>
            </li>
        )})}
        </ul>
      </div>
      <div>グラフが入ります。</div>
    </>
  );
}
